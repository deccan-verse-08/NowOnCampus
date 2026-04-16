import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });

    return user?.role === "ADMIN" ? session : null;
}

export async function GET() {
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const posts = await prisma.hackathonResultPost.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            event: { select: { id: true, title: true, date: true } },
            createdBy: { select: { id: true, name: true } },
        },
    });

    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const session = await checkAdmin();
    if (!session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    try {
        const body = await request.json() as {
            eventId?: string;
            winningTeamName?: string;
            announcement?: string;
        };

        const eventId = body.eventId?.trim() || "";
        const winningTeamName = body.winningTeamName?.trim() || "";
        const announcement = body.announcement?.trim() || "";

        if (!eventId || !winningTeamName || !announcement) {
            return NextResponse.json(
                { error: "Hackathon, winning team name, and announcement are required." },
                { status: 400 },
            );
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
            select: { id: true, category: true },
        });

        if (!event || event.category !== "HACKATHON") {
            return NextResponse.json(
                { error: "Selected event is not a valid hackathon." },
                { status: 400 },
            );
        }

        const post = await prisma.hackathonResultPost.create({
            data: {
                eventId,
                winningTeamName,
                announcement,
                createdById: session.user.id,
            },
            include: {
                event: { select: { id: true, title: true, date: true } },
                createdBy: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Create hackathon result post error:", error);
        return NextResponse.json({ error: "Failed to create winner post." }, { status: 500 });
    }
}
