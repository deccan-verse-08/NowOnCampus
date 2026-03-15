import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendEventRequestRejectedEmail } from "@/lib/mail";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (admin?.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { reviewNote } = await req.json().catch(() => ({ reviewNote: "" }));

  const eventRequest = await prisma.eventRequest.findUnique({
    where: { id },
    include: {
      requester: { select: { email: true, name: true } },
    },
  });

  if (!eventRequest)
    return NextResponse.json({ error: "Request not found" }, { status: 404 });

  if (eventRequest.status !== "PENDING")
    return NextResponse.json(
      { error: "Request is no longer pending" },
      { status: 400 }
    );

  // 1. Mark request as REJECTED
  await prisma.eventRequest.update({
    where: { id },
    data: {
      status: "REJECTED",
      reviewedById: session.user.id,
      reviewNote: reviewNote?.trim() || null,
    },
  });

  // 2. Notify the student
  try {
    await sendEventRequestRejectedEmail(
      eventRequest.requester.email,
      eventRequest.requester.name || "Student",
      eventRequest.title,
      reviewNote?.trim() || null
    );
  } catch (e) {
    console.error("Failed to send rejection email:", e);
  }

  return NextResponse.json({ success: true });
}
