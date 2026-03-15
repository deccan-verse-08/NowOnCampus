import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendEventRequestApprovedEmail } from "@/lib/mail";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (admin?.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const eventRequest = await prisma.eventRequest.findUnique({
    where: { id },
    include: {
      requester: { select: { email: true, name: true, id: true } },
    },
  });

  if (!eventRequest)
    return NextResponse.json({ error: "Request not found" }, { status: 404 });

  if (eventRequest.status !== "PENDING")
    return NextResponse.json(
      { error: "Request is no longer pending" },
      { status: 400 }
    );

  // 1. Create live Event
  const event = await prisma.event.create({
    data: {
      title: eventRequest.title,
      shortDescription: eventRequest.shortDescription,
      description: eventRequest.description,
      category: eventRequest.category,
      date: eventRequest.date,
      endDate: eventRequest.endDate,
      venue: eventRequest.venue,
      registrationDeadline: eventRequest.registrationDeadline,
      maxParticipants: eventRequest.maxParticipants,
      prizeMoney: eventRequest.prizeMoney,
      teamSize: eventRequest.teamSize,
      image: eventRequest.image,
      tags: eventRequest.tags,
      isFeatured: false,
      status: "UPCOMING",
      organizerId: eventRequest.requesterId,
    },
  });

  // 2. Mark request as APPROVED
  await prisma.eventRequest.update({
    where: { id },
    data: {
      status: "APPROVED",
      reviewedById: session.user.id,
    },
  });

  // 3. Notify the student
  try {
    await sendEventRequestApprovedEmail(
      eventRequest.requester.email,
      eventRequest.requester.name || "Student",
      eventRequest.title
    );
  } catch (e) {
    console.error("Failed to send approval email:", e);
  }

  return NextResponse.json({ success: true, event });
}
