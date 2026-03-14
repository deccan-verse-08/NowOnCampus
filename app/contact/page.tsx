// import { Footer } from "@/components/Footer";
// import { Navbar } from "@/components/Navbar";
// import React from "react";

// export default function ContactPage() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
//         <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
//           <p className="text-lg text-slate-600 mb-10">
//             Have questions, feedback, or want to partner with us? We'd love to
//             hear from you! Reach out to us using the information below.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
//             <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
//               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
//                 @
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
//                   Email
//                 </h3>
//                 <a
//                   href="mailto:support@nowoncampus.com"
//                   className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors break-all"
//                 >
//                   support@nowoncampus.com
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
//               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
//                 📍
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
//                   Office
//                 </h3>
//                 <p className="text-lg font-medium text-slate-900">
//                   Campus Hub, Block A<br />
//                   University Road
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100/50">
//             <h2 className="text-2xl font-bold text-blue-950 mb-6">
//               Send us a message
//             </h2>
//             <form className="space-y-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-semibold text-blue-900 mb-2"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm"
//                     placeholder="Your Name"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-semibold text-blue-900 mb-2"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm"
//                     placeholder="you@example.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-semibold text-blue-900 mb-2"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={5}
//                   className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm resize-none"
//                   placeholder="How can we help you?"
//                 ></textarea>
//               </div>
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-[0.98] w-full sm:w-auto"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, Zap } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");
        .contact-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.01em;
        }
        .contact-body {
          font-family: "DM Sans", sans-serif;
        }
        .contact-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #0f172a;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }
        .contact-input::placeholder {
          color: #94a3b8;
        }
        .contact-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
        }
        .send-btn {
          position: relative;
          overflow: hidden;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }
        .send-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #ea580c;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .send-btn:hover::before {
          transform: translateY(0);
        }
        .send-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(249, 115, 22, 0.4);
        }
        .send-btn span,
        .send-btn svg {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <Navbar />

      <div className="contact-body min-h-screen bg-slate-50 pt-24">
        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden bg-[#f97316] px-4 py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div
              style={{
                position: "absolute",
                top: "-100px",
                left: "-100px",
                width: "480px",
                height: "480px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                filter: "blur(80px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-80px",
                right: "-60px",
                width: "380px",
                height: "380px",
                borderRadius: "50%",
                background: "rgba(132,204,22,0.14)",
                filter: "blur(80px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              Get In Touch
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="contact-heading text-white uppercase leading-[0.85] mb-6"
              style={{ fontSize: "clamp(64px, 10vw, 120px)" }}
            >
              Let's <br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  color: "transparent",
                }}
              >
                Talk
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/80 text-lg font-medium max-w-xl mx-auto leading-relaxed"
            >
              Questions, feedback, or want to partner with us? We'd love to hear
              from you.
            </motion.p>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-10 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "support@nowoncampus.com",
                href: "mailto:support@nowoncampus.com",
                color: "#fbbf24",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "Campus Hub, Block A, University Road",
                href: null,
                color: "#34d399",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 98765 43210",
                href: "tel:+919876543210",
                color: "#60a5fa",
              },
            ].map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[1.5rem] p-7 shadow-xl border border-slate-100 flex items-start gap-5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: color + "22" }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-bold text-slate-900 text-sm leading-snug hover:text-[#f97316] transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-bold text-slate-900 text-sm leading-snug">
                      {value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FORM SECTION ── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden rounded-[2rem]">
            {/* Left — dark panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 relative overflow-hidden bg-slate-900 p-10 flex flex-col justify-between rounded-[2rem]"
              style={{
                minHeight: "460px",
                boxShadow: "0 24px 60px rgba(15,23,42,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background: "rgba(249,115,22,0.14)",
                  filter: "blur(60px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "-40px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "rgba(132,204,22,0.08)",
                  filter: "blur(50px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "2rem",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#f97316] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-8">
                  <Zap className="w-3 h-3 fill-white" />
                  Contact
                </div>
                <h2
                  className="contact-heading text-white uppercase leading-none mb-5"
                  style={{ fontSize: "clamp(40px, 4vw, 60px)" }}
                >
                  We Reply
                  <br />
                  Within
                  <br />
                  24 Hours
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed text-sm">
                  Whether you're a student, organizer, or institution — we're
                  here to help you make the most of campus life.
                </p>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#fbbf24", "#34d399", "#60a5fa", "#f472b6"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: c }}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs font-semibold">
                  <span className="text-white font-black">10K+</span> students
                  helped
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8 bg-white p-10 rounded-[2rem] border border-slate-100"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-[#f97316] flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="contact-heading text-slate-900 text-5xl uppercase mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 font-medium">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f97316] mb-3">
                    Send a Message
                  </p>
                  <h2
                    className="contact-heading text-slate-900 uppercase leading-none mb-8"
                    style={{ fontSize: "clamp(36px, 4vw, 54px)" }}
                  >
                    Drop Us
                    <br />A Line
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="contact-input"
                          placeholder="Arjun Mehta"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="contact-input"
                          placeholder="you@college.edu"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="contact-input"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="contact-input resize-none"
                        placeholder="Tell us everything..."
                        style={{ minHeight: "130px" }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="send-btn flex items-center gap-2 font-black uppercase text-sm tracking-widest"
                      style={{
                        background: "#f97316",
                        color: "#fff",
                        padding: "14px 36px",
                        borderRadius: "14px",
                        boxShadow: "0 8px 28px rgba(249,115,22,0.3)",
                      }}
                    >
                      <span>Send Message</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
