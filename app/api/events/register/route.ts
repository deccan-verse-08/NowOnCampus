import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendEventConfirmationEmail } from "@/lib/mail";
import type { RegistrationStatus } from "@prisma/client";

interface TeamParticipantInput {
    name?: string;
    rollNumber?: string;
    course?: string;
    phoneNumber?: string;
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Please sign in to register" }, { status: 401 });
    }

    try {
        const { eventId, teamName, teamParticipants } = await request.json() as {
            eventId?: string;
            teamName?: string;
            teamParticipants?: TeamParticipantInput[];
        };

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

        const existing = await prisma.registration.findUnique({
            where: { userId_eventId: { userId: session.user.id, eventId } },
            select: { id: true, status: true },
        });

        if (existing && existing.status !== "CANCELLED") {
            return NextResponse.json({ error: "You are already registered for this event" }, { status: 409 });
        }

        const isHackathon = event.category === "HACKATHON";
        const isEventFull = Boolean(
            event.maxParticipants && event.currentParticipants >= event.maxParticipants,
        );
        const registrationStatus: RegistrationStatus = isEventFull ? "WAITLISTED" : "CONFIRMED";
        const cleanTeamName = typeof teamName === "string" ? teamName.trim() : "";
        const normalizedParticipants = Array.isArray(teamParticipants)
            ? teamParticipants.map((member) => ({
                name: member.name?.trim() || "",
                rollNumber: member.rollNumber?.trim() || "",
                course: member.course?.trim() || "",
                phoneNumber: member.phoneNumber?.trim() || "",
            }))
            : [];

        if (isHackathon) {
            if (normalizedParticipants.length === 0) {
                return NextResponse.json(
                    { error: "Please add all required details for at least one teammate." },
                    { status: 400 },
                );
            }

            const hasIncompleteMember = normalizedParticipants.some(
                (member) =>
                    !member.name ||
                    !member.rollNumber ||
                    !member.course ||
                    !member.phoneNumber,
            );

            if (hasIncompleteMember) {
                return NextResponse.json(
                    {
                        error:
                            "Please fill teammate name, roll number, class/course, and phone number for all members.",
                    },
                    { status: 400 },
                );
            }
        }

        await prisma.$transaction(async (tx) => {
            if (existing?.status === "CANCELLED") {
                await tx.registration.update({
                    where: { id: existing.id },
                    data: {
                        status: registrationStatus,
                        teamName: cleanTeamName || null,
                        teamParticipants: isHackathon
                            ? { deleteMany: {}, create: normalizedParticipants }
                            : { deleteMany: {} },
                    },
                });
            } else {
                await tx.registration.create({
                    data: {
                        userId: session.user.id,
                        eventId,
                        status: registrationStatus,
                        teamName: cleanTeamName || null,
                        teamParticipants: isHackathon
                            ? {
                                create: normalizedParticipants,
                            }
                            : undefined,
                    },
                });
            }

            if (registrationStatus === "CONFIRMED") {
                await tx.event.update({
                    where: { id: eventId },
                    data: { currentParticipants: { increment: 1 } },
                });
            }
        });

        // Send confirmation email (don't block response if it fails)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { email: true, name: true },
        });

        if (registrationStatus === "CONFIRMED" && user?.email) {
            sendEventConfirmationEmail(user.email, user.name || "Student", event).catch((err) =>
                console.error("Failed to send confirmation email:", err)
            );
        }

        return NextResponse.json(
            {
                message:
                    registrationStatus === "WAITLISTED"
                        ? "Event is full. You have been added to the waitlist."
                        : "Successfully registered for the event!",
                status: registrationStatus,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
