import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

interface Context {
    params: Promise<{ id: string }>;
}

async function checkAdmin() {
    const session = await auth();
    if (!session?.user?.id) return null;
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    return user?.role === "ADMIN" ? session : null;
}

export async function PATCH(request: Request, { params }: Context) {
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    try {
        const body = await request.json();
        const {
            title, shortDescription, description, category, date, endDate,
            venue, registrationDeadline, maxParticipants, prizeMoney,
            teamSize, image, tags, isFeatured, status,
        } = body;

        const event = await prisma.event.update({
            where: { id },
            data: {
                title: title?.trim(),
                shortDescription: shortDescription?.trim() || null,
                description: description?.trim(),
                category,
                date: date ? new Date(date) : undefined,
                endDate: endDate ? new Date(endDate) : null,
                venue: venue?.trim(),
                registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
                maxParticipants: maxParticipants != null ? Number(maxParticipants) : null,
                prizeMoney: prizeMoney?.trim() || null,
                teamSize: teamSize?.trim() || null,
                image: image?.trim() || null,
                tags: tags?.trim() || null,
                isFeatured: Boolean(isFeatured),
                status,
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Update event error:", error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Context) {
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    try {
        await prisma.registration.deleteMany({ where: { eventId: id } });
        await prisma.event.delete({ where: { id } });
        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Delete event error:", error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
    }
}
