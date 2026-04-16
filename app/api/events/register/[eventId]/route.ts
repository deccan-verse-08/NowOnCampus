import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

interface Context {
    params: Promise<{ eventId: string }>;
}

interface TeamParticipantInput {
    name?: string;
    rollNumber?: string;
    course?: string;
    phoneNumber?: string;
}

export async function PATCH(request: Request, { params }: Context) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const { eventId } = await params;

    try {
        const { teamName, teamParticipants } = await request.json() as {
            teamName?: string;
            teamParticipants?: TeamParticipantInput[];
        };

        const registration = await prisma.registration.findUnique({
            where: { userId_eventId: { userId: session.user.id, eventId } },
            include: {
                event: {
                    select: {
                        category: true,
                        registrationDeadline: true,
                    },
                },
            },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found." }, { status: 404 });
        }

        if (registration.status === "CANCELLED") {
            return NextResponse.json(
                { error: "Cancelled registrations cannot be edited." },
                { status: 400 },
            );
        }

        if (registration.event.category !== "HACKATHON") {
            return NextResponse.json(
                { error: "Team details are only editable for hackathons." },
                { status: 400 },
            );
        }

        if (
            registration.event.registrationDeadline &&
            new Date(registration.event.registrationDeadline) < new Date()
        ) {
            return NextResponse.json(
                { error: "Team details cannot be edited after the registration deadline." },
                { status: 400 },
            );
        }

        const cleanTeamName = typeof teamName === "string" ? teamName.trim() : "";
        const normalizedParticipants = Array.isArray(teamParticipants)
            ? teamParticipants.map((member) => ({
                name: member.name?.trim() || "",
                rollNumber: member.rollNumber?.trim() || "",
                course: member.course?.trim() || "",
                phoneNumber: member.phoneNumber?.trim() || "",
            }))
            : [];

        if (normalizedParticipants.length === 0) {
            return NextResponse.json(
                { error: "Please add details for at least one teammate." },
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

        await prisma.registration.update({
            where: { id: registration.id },
            data: {
                teamName: cleanTeamName || null,
                teamParticipants: {
                    deleteMany: {},
                    create: normalizedParticipants,
                },
            },
        });

        return NextResponse.json({ message: "Team details updated successfully." });
    } catch (error) {
        console.error("Update team details error:", error);
        return NextResponse.json({ error: "Failed to update team details." }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Context) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const { eventId } = await params;

    try {
        const registration = await prisma.registration.findUnique({
            where: { userId_eventId: { userId: session.user.id, eventId } },
            include: {
                event: {
                    select: {
                        currentParticipants: true,
                    },
                },
            },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found." }, { status: 404 });
        }

        if (registration.status === "CANCELLED") {
            return NextResponse.json(
                { error: "This registration is already cancelled." },
                { status: 400 },
            );
        }

        await prisma.$transaction(async (tx) => {
            if (registration.status === "WAITLISTED") {
                await tx.registration.update({
                    where: { id: registration.id },
                    data: { status: "CANCELLED" },
                });
                return;
            }

            const nextWaitlisted = await tx.registration.findFirst({
                where: {
                    eventId,
                    status: "WAITLISTED",
                    id: { not: registration.id },
                },
                orderBy: { registeredAt: "asc" },
                select: { id: true },
            });

            await tx.registration.update({
                where: { id: registration.id },
                data: { status: "CANCELLED" },
            });

            if (nextWaitlisted) {
                await tx.registration.update({
                    where: { id: nextWaitlisted.id },
                    data: { status: "CONFIRMED" },
                });
            } else if (registration.event.currentParticipants > 0) {
                await tx.event.update({
                    where: { id: eventId },
                    data: { currentParticipants: { decrement: 1 } },
                });
            }
        });

        return NextResponse.json({ message: "Registration cancelled successfully." });
    } catch (error) {
        console.error("Cancel registration error:", error);
        return NextResponse.json({ error: "Failed to cancel registration." }, { status: 500 });
    }
}
