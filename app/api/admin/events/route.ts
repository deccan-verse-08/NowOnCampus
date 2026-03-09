import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const events = await prisma.event.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { registrations: true } } },
    });

    return NextResponse.json(events);
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    try {
        const body = await request.json();
        const {
            title, shortDescription, description, category, date, endDate,
            venue, registrationDeadline, maxParticipants, prizeMoney,
            teamSize, image, tags, isFeatured,
        } = body;

        if (!title || !description || !category || !date || !venue) {
            return NextResponse.json({ error: "Title, description, category, date, and venue are required" }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                title: title.trim(),
                shortDescription: shortDescription?.trim() || null,
                description: description.trim(),
                category,
                date: new Date(date),
                endDate: endDate ? new Date(endDate) : null,
                venue: venue.trim(),
                registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
                maxParticipants: maxParticipants ? Number(maxParticipants) : null,
                prizeMoney: prizeMoney?.trim() || null,
                teamSize: teamSize?.trim() || null,
                image: image?.trim() || null,
                tags: tags?.trim() || null,
                isFeatured: Boolean(isFeatured),
                status: "UPCOMING",
                organizerId: session.user.id,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Create event error:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
