import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await prisma.event.findMany({
    include: {
      registrations: {
        where: {
          userId: session.user.id,
        },
      },
    },
  });

  const calendarEvents = events.map((event) => {
    const userRegistration = event.registrations[0];

    return {
      id: event.id,
      title: event.title,
      date: event.date,
      status: event.status,
      userStatus: userRegistration ? userRegistration.status : null,
    };
  });

  return NextResponse.json(calendarEvents);
}
