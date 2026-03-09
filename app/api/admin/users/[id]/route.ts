import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;

    if (id === session.user.id) {
        return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    // Get all registrations for this user to know which events to decrement
    const registrations = await prisma.registration.findMany({
        where: { userId: id },
        select: { eventId: true },
    });

    // Run everything in a transaction:
    // 1. Decrement currentParticipants for each event the user was registered in
    // 2. Delete the user (cascade handles registrations, accounts, sessions)
    await prisma.$transaction([
        ...registrations.map((reg) =>
            prisma.event.update({
                where: { id: reg.eventId },
                data: { currentParticipants: { decrement: 1 } },
            })
        ),
        prisma.user.delete({ where: { id } }),
    ]);

    return NextResponse.json({ message: "User deleted successfully." });
}
