"use client";

import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* --- Background color blocks (Aesthetic Blobs) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left green blob */}
        <div
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #84cc16 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom-right brown/amber blob */}
        <div
          className="absolute -bottom-20 -right-20 w-[480px] h-[480px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #b45309 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Center orange accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #f97316 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* --- Decorative scattered tags (Floating UI elements) --- */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -6 }}
        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-12 left-6 sm:left-16 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
        style={{
          background: "#ecfccb",
          color: "#3f6212",
          border: "1px solid #bef264",
        }}
      >
        🎤 Hackathons
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-10 right-6 sm:right-16 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
        style={{
          background: "#fef3c7",
          color: "#92400e",
          border: "1px solid #fcd34d",
        }}
      >
        🏆 Competitions
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20, rotate: 4 }}
        whileInView={{ opacity: 1, x: 0, rotate: 4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-10 left-6 sm:left-24 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
        style={{
          background: "#fff7ed",
          color: "#c2410c",
          border: "1px solid #fdba74",
        }}
      >
        🎭 Cultural Fests
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, rotate: -4 }}
        whileInView={{ opacity: 1, x: 0, rotate: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="absolute bottom-12 right-6 sm:right-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
        style={{
          background: "#f0fdf4",
          color: "#166534",
          border: "1px solid #86efac",
        }}
      >
        🤝 Networking
      </motion.div>

      {/* --- Main content --- */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
          style={{ background: "#0f172a", color: "#fff" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#84cc16" }}
          />
          Why NowOnCampus
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] uppercase tracking-tighter mb-8"
        >
          Don't just attend <br />
          college.{" "}
          <span
            className="relative inline-block"
            style={{
              WebkitTextStroke: "1.5px #0f172a",
              color: "transparent",
              background: "linear-gradient(135deg, #84cc16, #f97316, #b45309)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Experience it.
          </span>
        </motion.h2>

        {/* Body Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium mb-12"
        >
          Every day on campus is an opportunity to learn something new, meet
          your future co-founder, or win big. We bring all these opportunities
          directly to your feed.
        </motion.p>

<<<<<<< HEAD
=======
        {/* --- 3 stat pills --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            {
              value: "25+",
              label: "Active Clubs",
              bg: "#ecfccb",
              text: "#3f6212",
              border: "#bef264",
            },
            {
              value: "120+",
              label: "Annual Events",
              bg: "#fef3c7",
              text: "#92400e",
              border: "#fcd34d",
            },
            {
              value: "2500+",
              label: "Active Students",
              bg: "#fff7ed",
              text: "#c2410c",
              border: "#fdba74",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.38 + i * 0.08 }}
              className="px-8 py-5 rounded-[2rem] transition-all duration-300"
              style={{
                background: stat.bg,
                border: `1px solid ${stat.border}`,
              }}
            >
              <div
                className="text-4xl font-black leading-none"
                style={{ color: stat.text, letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2"
                style={{ color: stat.text, opacity: 0.8 }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
>>>>>>> dc45fee61544b30486ba386821b5f7e225abe47f
      </div>
    </section>
  );
}
