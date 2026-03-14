"use client";

import { motion } from "framer-motion";
import { EventCard } from "./EventCard";

export function AnimatedEventCard({ event, index }: any) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.08,
      }}
    >
      <EventCard
        id={event.id}
        title={event.title}
        description={event.shortDescription || event.description}
        category={event.category}
        date={event.date}
        venue={event.venue}
        maxParticipants={event.maxParticipants}
        currentParticipants={event.currentParticipants}
        image={event.image}
        prizeMoney={event.prizeMoney}
        status={event.status}
        registrationDeadline={event.registrationDeadline}
      />
    </motion.div>
  );
}
