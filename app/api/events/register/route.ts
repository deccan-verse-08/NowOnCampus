import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendEventConfirmationEmail } from "@/lib/mail";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Please sign in to register" }, { status: 401 });
    }

    try {
        const { eventId } = await request.json();

        if (!eventId) {
            return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
        }

        const event = await prisma.event.findUnique({ where: { id: eventId } });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        if (event.status !== "UPCOMING") {
            return NextResponse.json({ error: "Registrations are closed for this event" }, { status: 400 });
        }

        if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
            return NextResponse.json({ error: "Registration deadline has passed" }, { status: 400 });
        }

        if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
            return NextResponse.json({ error: "Event is fully booked" }, { status: 400 });
        }

        const existing = await prisma.registration.findUnique({
            where: { userId_eventId: { userId: session.user.id, eventId } },
        });

        if (existing) {
            return NextResponse.json({ error: "You are already registered for this event" }, { status: 409 });
        }

        await prisma.$transaction([
            prisma.registration.create({
                data: { userId: session.user.id, eventId, status: "CONFIRMED" },
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { currentParticipants: { increment: 1 } },
            }),
        ]);

        // Send confirmation email (don't block response if it fails)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { email: true, name: true },
        });

        if (user?.email) {
            sendEventConfirmationEmail(user.email, user.name || "Student", event).catch((err) =>
                console.error("Failed to send confirmation email:", err)
            );
        }

        return NextResponse.json({ message: "Successfully registered for the event!" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
