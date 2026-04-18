import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEventReminderEmail } from "@/lib/mail";

const ONE_HOUR_MS = 60 * 60 * 1000;
const TWENTY_FOUR_HOURS_MS = 24 * ONE_HOUR_MS;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured." },
      { status: 500 },
    );
  }

  const authorizationHeader = request.headers.get("authorization");
  if (authorizationHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const reminderWindowStart = new Date(now.getTime() + TWENTY_FOUR_HOURS_MS);
    const reminderWindowEnd = new Date(reminderWindowStart.getTime() + ONE_HOUR_MS);

    const registrations = await prisma.registration.findMany({
      where: {
        status: "CONFIRMED",
        reminderSentAt: null,
        event: {
          status: "UPCOMING",
          date: {
            gte: reminderWindowStart,
            lt: reminderWindowEnd,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        event: {
          select: {
            title: true,
            category: true,
            date: true,
            endDate: true,
            venue: true,
            registrationDeadline: true,
            maxParticipants: true,
            prizeMoney: true,
            teamSize: true,
          },
        },
      },
    });

    let sentCount = 0;
    let failedCount = 0;
    let skippedCount = 0;

    for (const registration of registrations) {
      if (!registration.user.email) {
        skippedCount += 1;
        continue;
      }

      try {
        await sendEventReminderEmail(
          registration.user.email,
          registration.user.name || "Student",
          registration.event,
        );

        await prisma.registration.update({
          where: { id: registration.id },
          data: { reminderSentAt: new Date() },
        });

        sentCount += 1;
      } catch (error) {
        failedCount += 1;
        console.error(
          `Failed to send event reminder for registration ${registration.id}:`,
          error,
        );
      }
    }

    return NextResponse.json({
      message: "Event reminder job completed.",
      scanned: registrations.length,
      sent: sentCount,
      failed: failedCount,
      skipped: skippedCount,
      reminderWindowStart: reminderWindowStart.toISOString(),
      reminderWindowEnd: reminderWindowEnd.toISOString(),
    });
  } catch (error) {
    console.error("Event reminder cron job failed:", error);
    return NextResponse.json(
      { error: "Failed to run event reminders job." },
      { status: 500 },
    );
  }
}
