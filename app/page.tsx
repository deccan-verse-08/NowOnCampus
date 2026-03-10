import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import AnimatedHome from "@/components/AnimatedHome";

async function getFeaturedEvents() {
  try {
    return await prisma.event.findMany({
      where: { isFeatured: true, status: { not: "CANCELLED" } },
      orderBy: { date: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [session, featuredEvents, upcomingEvents] = await Promise.all([
    auth(),
    getFeaturedEvents(),
    getUpcomingEvents(),
  ]);

  const displayEvents = featuredEvents.length > 0 ? featuredEvents : upcomingEvents;

  return (
    <AnimatedHome session={session} displayEvents={displayEvents} />
  );
}
