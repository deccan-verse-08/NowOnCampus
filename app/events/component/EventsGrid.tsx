"use client";

import { motion } from "framer-motion";
import { EventCard } from "@/components/EventCard";

interface EventItem {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  date: string;
  venue: string;
  maxParticipants?: number | null;
  currentParticipants?: number;
  image?: string | null;
  prizeMoney?: string | null;
  status: string;
  registrationDeadline?: string | null;
}

interface Props {
  events: EventItem[];
}

export function EventsGrid({ events }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: (i % 4) * 0.07, // stagger per row, not globally
          }}
        >
          <EventCard
            id={event.id}
            title={event.title}
            description={event.description}
            category={event.category}
            date={event.date}
            venue={event.venue}
            maxParticipants={event.maxParticipants}
            currentParticipants={event.currentParticipants}
            image={event.image}
            prizeMoney={event.prizeMoney}
            status={event.status as any}
            registrationDeadline={event.registrationDeadline}
          />
        </motion.div>
      ))}
    </div>
  );
}
