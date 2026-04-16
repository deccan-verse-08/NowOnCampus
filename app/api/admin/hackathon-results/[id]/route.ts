import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

interface Context {
    params: Promise<{ id: string }>;
}

async function checkAdmin() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });

    return user?.role === "ADMIN" ? session : null;
}

export async function PATCH(request: Request, { params }: Context) {
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    try {
        const body = await request.json() as {
            winningTeamName?: string;
            announcement?: string;
        };

        const winningTeamName = body.winningTeamName?.trim() || "";
        const announcement = body.announcement?.trim() || "";

        if (!winningTeamName || !announcement) {
            return NextResponse.json(
                { error: "Winning team name and announcement are required." },
                { status: 400 },
            );
        }

        const existing = await prisma.hackathonResultPost.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!existing) {
            return NextResponse.json({ error: "Winner post not found." }, { status: 404 });
        }

        const updated = await prisma.hackathonResultPost.update({
            where: { id },
            data: { winningTeamName, announcement },
            include: {
                event: { select: { id: true, title: true, date: true } },
                createdBy: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update hackathon result post error:", error);
        return NextResponse.json({ error: "Failed to update winner post." }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Context) {
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    try {
        const existing = await prisma.hackathonResultPost.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!existing) {
            return NextResponse.json({ error: "Winner post not found." }, { status: 404 });
        }

        await prisma.hackathonResultPost.delete({ where: { id } });
        return NextResponse.json({ message: "Winner post deleted successfully." });
    } catch (error) {
        console.error("Delete hackathon result post error:", error);
        return NextResponse.json({ error: "Failed to delete winner post." }, { status: 500 });
    }
}
