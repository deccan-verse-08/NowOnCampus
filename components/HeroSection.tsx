// // // // // import { useState, useEffect } from "react";
// // // // // import { motion } from "framer-motion";
// // // // // import { Zap, ArrowRight } from "lucide-react"; // Assuming lucide-react
// // // // // import Link from "next/link"; // or 'react-router-dom'

// // // // // const videos = ["/College_Event_Website_Hero_Video_Creation.mp4", "/hero.mp4"];

// // // // // const stats = [
// // // // //   { label: "Active Events", value: "50+", icon: Zap },
// // // // //   { label: "Students", value: "5,000+", icon: Zap }, // Replace icons as needed
// // // // //   { label: "Organizers", value: "20+", icon: Zap },
// // // // // ];

// // // // // export function HeroSection({ session }: { session: any }) {
// // // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // // //   // Auto-slide every 8 seconds
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       setCurrentIndex((prev) => (prev + 1) % videos.length);
// // // // //     }, 8000);
// // // // //     return () => clearInterval(interval);
// // // // //   }, []);

// // // // //   return (
// // // // //     <section className="relative w-full overflow-hidden">
// // // // //       {/* Video Container */}
// // // // //       <div className="relative w-full h-[100svh] sm:h-[85vh] min-h-[580px]">
// // // // //         {videos.map((src, index) => (
// // // // //           <video
// // // // //             key={src}
// // // // //             src={src}
// // // // //             autoPlay
// // // // //             muted
// // // // //             loop
// // // // //             playsInline
// // // // //             className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
// // // // //               index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
// // // // //             }`}
// // // // //           />
// // // // //         ))}

// // // // //         {/* Dark overlay - Always on top of video (z-10) */}
// // // // //         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 z-10" />

// // // // //         {/* Hero Content - Always on top (z-20) */}
// // // // //         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20">
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: -20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.8, delay: 0.2 }}
// // // // //             className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"
// // // // //           >
// // // // //             <Zap className="w-3.5 h-3.5 text-yellow-400" />
// // // // //             Campus Events, All in One Place
// // // // //           </motion.div>

// // // // //           <motion.h1
// // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             transition={{
// // // // //               duration: 1,
// // // // //               delay: 0.4,
// // // // //               type: "spring",
// // // // //               stiffness: 100,
// // // // //             }}
// // // // //             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-5xl mb-6 drop-shadow-2xl"
// // // // //           >
// // // // //             Discover Every{" "}
// // // // //             <motion.span
// // // // //               animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
// // // // //               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
// // // // //               className="bg-[length:200%_auto] bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block"
// // // // //             >
// // // // //               Campus Event
// // // // //             </motion.span>{" "}
// // // // //             in One Click
// // // // //           </motion.h1>

// // // // //           <motion.p
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.8, delay: 0.6 }}
// // // // //             className="text-slate-200 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-light"
// // // // //           >
// // // // //             From hackathons to cultural fests, formal seminars to sports
// // // // //             tournaments — your next great memory starts here.
// // // // //           </motion.p>

// // // // //           {/* CTA Buttons */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.8, delay: 0.8 }}
// // // // //             className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4"
// // // // //           >
// // // // //             <Link
// // // // //               href="/events"
// // // // //               className="group relative inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:bg-blue-500 transition-all duration-300 text-sm sm:text-base"
// // // // //             >
// // // // //               Explore Events
// // // // //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
// // // // //             </Link>
// // // // //             {!session?.user && (
// // // // //               <Link
// // // // //                 href="/register"
// // // // //                 className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-sm sm:text-base"
// // // // //               >
// // // // //                 Create Account
// // // // //               </Link>
// // // // //             )}
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Stats Bar - Sits outside the video div but relative to section */}
// // // // //       <div className="relative z-30 max-w-5xl mx-auto -mt-24 sm:-mt-16 px-4">
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 40 }}
// // // // //           whileInView={{ opacity: 1, y: 0 }}
// // // // //           viewport={{ once: true, margin: "-100px" }}
// // // // //           transition={{ duration: 0.8, ease: "easeOut" }}
// // // // //           className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/50 overflow-hidden"
// // // // //         >
// // // // //           {stats.map(({ label, value, icon: Icon }, i) => (
// // // // //             <motion.div
// // // // //               key={label}
// // // // //               initial={{ opacity: 0, scale: 0.8 }}
// // // // //               whileInView={{ opacity: 1, scale: 1 }}
// // // // //               viewport={{ once: true }}
// // // // //               transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
// // // // //               className="px-6 py-5 sm:py-8 flex items-center justify-start sm:flex-col sm:justify-center gap-5 sm:gap-3 hover:bg-slate-50/50 transition-colors"
// // // // //             >
// // // // //               <div className="flex-shrink-0 p-3 sm:p-4 bg-blue-100/50 rounded-2xl">
// // // // //                 <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
// // // // //               </div>
// // // // //               <div className="text-left sm:text-center">
// // // // //                 <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5 sm:mb-1">
// // // // //                   {value}
// // // // //                 </p>
// // // // //                 <p className="text-[11px] sm:text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">
// // // // //                   {label}
// // // // //                 </p>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           ))}
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { Zap, ArrowRight, Users, Calendar, Trophy } from "lucide-react";
// // // // import Link from "next/link";

// // // // const videos = ["/heroone.mp4", "/hero.mp4"];

// // // // const stats = [
// // // //   {
// // // //     label: "Active Events",
// // // //     value: "50+",
// // // //     icon: Calendar,
// // // //     color: "text-blue-500",
// // // //     bg: "bg-blue-50",
// // // //   },
// // // //   {
// // // //     label: "Students",
// // // //     value: "5,000+",
// // // //     icon: Users,
// // // //     color: "text-purple-500",
// // // //     bg: "bg-purple-50",
// // // //   },
// // // //   {
// // // //     label: "Organizers",
// // // //     value: "20+",
// // // //     icon: Trophy,
// // // //     color: "text-amber-500",
// // // //     bg: "bg-amber-50",
// // // //   },
// // // // ];

// // // // export function HeroSection({ session }: { session: any }) {
// // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // //   useEffect(() => {
// // // //     const interval = setInterval(() => {
// // // //       setCurrentIndex((prev) => (prev + 1) % videos.length);
// // // //     }, 8000);
// // // //     return () => clearInterval(interval);
// // // //   }, []);

// // // //   return (
// // // //     <section className="relative w-full overflow-hidden bg-slate-950">
// // // //       {/* --- Cinematic Video Carousel --- */}
// // // //       <div className="relative w-full h-[100svh] sm:h-[85vh] min-h-[600px] overflow-hidden">
// // // //         <AnimatePresence mode="wait">
// // // //           <motion.div
// // // //             key={currentIndex}
// // // //             initial={{ opacity: 0, scale: 1.1 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             exit={{ opacity: 0 }}
// // // //             transition={{ duration: 1.5, ease: "easeOut" }}
// // // //             className="absolute inset-0 w-full h-full"
// // // //           >
// // // //             <video
// // // //               src={videos[currentIndex]}
// // // //               autoPlay
// // // //               muted
// // // //               loop
// // // //               playsInline
// // // //               className="absolute inset-0 w-full h-full object-cover"
// // // //             />
// // // //           </motion.div>
// // // //         </AnimatePresence>

// // // //         {/* Improved Overlay Gradient */}
// // // //         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950 z-10" />

// // // //         {/* --- Hero Content --- */}
// // // //         <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20">
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: -20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-8 shadow-xl"
// // // //           >
// // // //             <span className="relative flex h-2 w-2">
// // // //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
// // // //               <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
// // // //             </span>
// // // //             Campus Events, All in One Place
// // // //           </motion.div>

// // // //           <motion.h1
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.2 }}
// // // //             className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6"
// // // //           >
// // // //             Discover Every <br />
// // // //             <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
// // // //               Campus Event
// // // //             </span>
// // // //           </motion.h1>

// // // //           <motion.p
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ delay: 0.4 }}
// // // //             className="text-slate-300 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed"
// // // //           >
// // // //             From hackathons to cultural fests — your next great memory starts
// // // //             here.
// // // //           </motion.p>

// // // //           {/* CTA Group */}
// // // //           <div className="flex flex-col sm:flex-row gap-4 items-center">
// // // //             <Link
// // // //               href="/events"
// // // //               className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
// // // //             >
// // // //               Explore Events
// // // //               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// // // //             </Link>
// // // //             {!session?.user && (
// // // //               <Link
// // // //                 href="/register"
// // // //                 className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold backdrop-blur-md border border-white/20 transition-all"
// // // //               >
// // // //                 Join Community
// // // //               </Link>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* --- Enhanced Stats Bar --- */}
// // // //       <div className="relative z-30 max-w-6xl mx-auto -mt-16 px-4 mb-20">
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //           {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
// // // //             <motion.div
// // // //               key={label}
// // // //               initial={{ opacity: 0, y: 30 }}
// // // //               whileInView={{ opacity: 1, y: 0 }}
// // // //               whileHover={{ y: -10 }}
// // // //               viewport={{ once: true }}
// // // //               transition={{ delay: i * 0.1 }}
// // // //               className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-2xl flex items-center gap-6 overflow-hidden"
// // // //             >
// // // //               {/* Decorative Background Glow */}
// // // //               <div
// // // //                 className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${bg}`}
// // // //               />

// // // //               <div
// // // //                 className={`p-4 rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110 duration-300`}
// // // //               >
// // // //                 <Icon size={32} strokeWidth={2.5} />
// // // //               </div>

// // // //               <div>
// // // //                 <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
// // // //                   {value}
// // // //                 </h3>
// // // //                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
// // // //                   {label}
// // // //                 </p>
// // // //               </div>
// // // //             </motion.div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Zap, ArrowRight, Users, Calendar, Trophy } from "lucide-react";
// // // import Link from "next/link";

// // // // Counter Component remains the same as your code
// // // function Counter({ value }: { value: string }) {
// // //   // ... (aapka current counter logic)
// // //   return <span>{value}</span>; // Placeholder for brevity
// // // }

// // // const videos = ["/heroone.mp4", "/hero.mp4"];

// // // export function HeroSection({ session }: { session: any }) {
// // //   const [currentIndex, setCurrentIndex] = useState(0);

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setCurrentIndex((prev) => (prev + 1) % videos.length);
// // //     }, 8000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   return (
// // //     <section className="relative w-full bg-slate-950 pt-24 pb-12 px-4 md:px-8">
// // //       {/* --- Main Grid Layout (SXSW Style) --- */}
// // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2rem] bg-[#f5a67b]">
// // //         {/* Left Side: Text Content (Occupies 5 columns) */}
// // //         <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between min-h-[400px] lg:min-h-[600px]">
// // //           <div>
// // //             <motion.div
// // //               initial={{ opacity: 0, x: -20 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               className="flex items-center gap-2 mb-8"
// // //             >
// // //               <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs">
// // //                 !
// // //               </div>
// // //               <span className="font-bold uppercase tracking-widest text-slate-900 text-sm">
// // //                 Innovation
// // //               </span>
// // //             </motion.div>

// // //             <motion.h1
// // //               initial={{ opacity: 0, y: 30 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 0.2 }}
// // //               className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] uppercase mb-4"
// // //             >
// // //               Campus <br />
// // //               Conference <br />
// // //               <span className="text-slate-800/80 text-4xl md:text-5xl">
// // //                 March 12-18, 2026
// // //               </span>
// // //             </motion.h1>

// // //             <p className="font-bold text-slate-800 uppercase tracking-wide mb-8">
// // //               PUNE, MAHARASHTRA
// // //             </p>
// // //           </div>

// // //           {/* Bottom Action Buttons */}
// // //           <div className="flex flex-wrap gap-4">
// // //             <Link
// // //               href="/schedule"
// // //               className="px-8 py-4 bg-white text-slate-900 rounded-full font-black uppercase flex items-center gap-2 hover:bg-slate-100 transition-all border-2 border-transparent"
// // //             >
// // //               2026 Schedule <ArrowRight size={18} className="rotate-[-45deg]" />
// // //             </Link>
// // //             <Link
// // //               href="/register"
// // //               className="px-8 py-4 bg-[#ffcc00] text-slate-900 rounded-full font-black uppercase flex items-center gap-2 hover:shadow-lg transition-all border-2 border-transparent"
// // //             >
// // //               Register Now <ArrowRight size={18} className="rotate-[-45deg]" />
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Right Side: Video/Image Carousel (Occupies 7 columns) */}
// // //         <div className="lg:col-span-7 relative bg-slate-900 min-h-[400px] lg:min-h-[600px] overflow-hidden">
// // //           <AnimatePresence mode="wait">
// // //             <motion.div
// // //               key={currentIndex}
// // //               initial={{ opacity: 0, scale: 1.05 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               exit={{ opacity: 0 }}
// // //               transition={{ duration: 1 }}
// // //               className="absolute inset-0 w-full h-full p-4 md:p-8"
// // //             >
// // //               {/* Card Container for Video */}
// // //               <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl">
// // //                 <video
// // //                   src={videos[currentIndex]}
// // //                   autoPlay
// // //                   muted
// // //                   loop
// // //                   playsInline
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //                 {/* Image-Style Overlay Text (SXSW Signature) */}
// // //                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// // //                   <h2 className="text-white text-7xl md:text-9xl font-black opacity-20 uppercase select-none leading-none">
// // //                     Mentors
// // //                   </h2>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           </AnimatePresence>
// // //         </div>
// // //       </div>

// // //       {/* --- Stats Bar (Placed below the main card) --- */}
// // //       <div className="max-w-7xl mx-auto mt-12">
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           {[
// // //             {
// // //               label: "Active Events",
// // //               value: "50+",
// // //               icon: Calendar,
// // //               bg: "bg-blue-500",
// // //             },
// // //             {
// // //               label: "Students",
// // //               value: "5000+",
// // //               icon: Users,
// // //               bg: "bg-purple-500",
// // //             },
// // //             {
// // //               label: "Organizers",
// // //               value: "20+",
// // //               icon: Trophy,
// // //               bg: "bg-yellow-500",
// // //             },
// // //           ].map((stat, i) => (
// // //             <motion.div
// // //               key={stat.label}
// // //               whileHover={{ y: -5 }}
// // //               className="bg-slate-900 border border-white/10 p-6 rounded-3xl flex items-center justify-between"
// // //             >
// // //               <div>
// // //                 <p className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-1">
// // //                   {stat.label}
// // //                 </p>
// // //                 <h3 className="text-3xl font-black text-white">{stat.value}</h3>
// // //               </div>
// // //               <div className={`${stat.bg} p-3 rounded-2xl text-white`}>
// // //                 <stat.icon size={24} />
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { ArrowRight } from "lucide-react";
// // import Link from "next/link";

// // const videos = ["/heroone.mp4", "/hero.mp4"];

// // export function HeroSection() {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prev) => (prev + 1) % videos.length);
// //     }, 8000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <section className="relative w-full bg-white pt-28 pb-20 px-4 md:px-8">
// //       {/* --- Main Grid Layout --- */}
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] bg-[#f5a67b] shadow-sm">
// //         {/* Left Side: Content */}
// //         <div className="lg:col-span-5 p-10 md:p-14 flex flex-col justify-between min-h-[450px] lg:min-h-[650px]">
// //           <div>
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               className="flex items-center gap-2 mb-10"
// //             >
// //               <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
// //                 !
// //               </div>
// //               <span className="font-bold uppercase tracking-[0.2em] text-slate-900 text-xs">
// //                 Innovation
// //               </span>
// //             </motion.div>

// //             <motion.h1
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.2 }}
// //               className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.85] uppercase mb-6"
// //             >
// //               Campus <br />
// //               Conference <br />
// //               <span className="text-slate-800/60 text-3xl md:text-5xl block mt-4">
// //                 March 12-18, 2026
// //               </span>
// //             </motion.h1>

// //             <p className="font-bold text-slate-900/80 uppercase tracking-widest text-sm">
// //               Pune • Maharashtra • India
// //             </p>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-wrap gap-4 mt-12">
// //             <Link
// //               href="/schedule"
// //               className="group px-8 py-4 bg-white text-slate-900 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-md"
// //             >
// //               2026 Schedule
// //               <ArrowRight
// //                 size={18}
// //                 className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
// //               />
// //             </Link>
// //             <Link
// //               href="/register"
// //               className="group px-8 py-4 bg-[#ffcc00] text-slate-900 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:bg-[#e6b800] transition-all duration-300 shadow-md"
// //             >
// //               Buy A Badge
// //               <ArrowRight
// //                 size={18}
// //                 className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
// //               />
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Right Side: Video Carousel */}
// //         <div className="lg:col-span-7 relative bg-slate-100 min-h-[400px] lg:min-h-[650px] overflow-hidden">
// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={currentIndex}
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               transition={{ duration: 1 }}
// //               className="absolute inset-0 w-full h-full p-6 md:p-10"
// //             >
// //               {/* Floating Video Card */}
// //               <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
// //                 <video
// //                   src={videos[currentIndex]}
// //                   autoPlay
// //                   muted
// //                   loop
// //                   playsInline
// //                   className="w-full h-full object-cover"
// //                 />

// //                 {/* SXSW Style Background Text Overlay */}
// //                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
// //                   <motion.h2
// //                     initial={{ y: 50, opacity: 0 }}
// //                     animate={{ y: 0, opacity: 0.15 }}
// //                     className="text-white text-[10rem] md:text-[15rem] font-black uppercase leading-none select-none"
// //                   >
// //                     Events
// //                   </motion.h2>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </AnimatePresence>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Zap } from "lucide-react";
// import Link from "next/link";

// const videos = ["/heroone.mp4", "/hero.mp4"];

// export function HeroSection({ session }: { session: any }) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % videos.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full bg-white pt-32 pb-10">
//       {/* Main SXSW Wrapper - Added 'mx-4' and changed to 'max-w-[1600px]' for better spread */}
//       <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[3rem] bg-[#f5a67b] shadow-2xl min-h-[750px]">
//         {/* LEFT SIDE: Content (5 Columns) */}
//         <div className="lg:col-span-5 p-12 md:p-20 flex flex-col justify-between">
//           <div>
//             {/* Original Badge Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full mb-12 uppercase tracking-widest"
//             >
//               <Zap className="w-3.5 h-3.5 text-yellow-400" />
//               Campus Events, All in One Place
//             </motion.div>

//             {/* Original Heading with SXSW Style */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-6xl md:text-7xl lg:text-[100px] font-black text-slate-900 leading-[0.8] uppercase mb-8 tracking-tighter"
//             >
//               Discover <br />
//               Every <br />
//               <span className="text-white">Campus</span> <br />
//               Event
//             </motion.h1>

//             {/* Original Subtext */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="text-slate-800 text-xl max-w-md font-bold uppercase leading-tight mb-8"
//             >
//               From hackathons to cultural fests — your next great memory starts
//               here.
//             </motion.p>
//           </div>

//           {/* Original Action Buttons with SXSW Arrow Style */}
//           <div className="flex flex-wrap gap-4">
//             <Link
//               href="/events"
//               className="group px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-sm flex items-center gap-2 transition-all hover:bg-slate-800 shadow-xl"
//             >
//               Explore Events
//               <ArrowRight
//                 size={20}
//                 className="rotate-[-45deg] group-hover:translate-x-1 transition-transform"
//               />
//             </Link>
//             {!session?.user && (
//               <Link
//                 href="/register"
//                 className="group px-10 py-5 bg-white text-slate-900 rounded-full font-black uppercase text-sm flex items-center gap-2 transition-all hover:bg-slate-100 shadow-xl border-2 border-transparent"
//               >
//                 Join Community
//                 <ArrowRight
//                   size={20}
//                   className="rotate-[-45deg] group-hover:translate-x-1 transition-transform"
//                 />
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE: Video (7 Columns) */}
//         <div className="lg:col-span-7 relative bg-white/20 min-h-[500px] flex items-center justify-center p-6 md:p-12">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.05 }}
//               transition={{ duration: 0.8 }}
//               className="relative w-full h-full"
//             >
//               {/* Floating Video Card with High Shadow */}
//               <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-[8px] border-white/30">
//                 <video
//                   src={videos[currentIndex]}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-full object-cover"
//                 />

//                 {/* Visual SXSW Element */}
//                 <div className="absolute top-8 right-8">
//                   <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center font-black text-slate-900 -rotate-12 shadow-lg">
//                     NOW
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

const videos = ["/heroone.mp4", "/hero.mp4"];

export function HeroSection({ session }: { session: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");

        .hero-section {
          font-family: "DM Sans", sans-serif;
        }
        .hero-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.02em;
        }

        .explore-btn {
          position: relative;
          overflow: hidden;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }
        .explore-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #1e293b;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .explore-btn:hover::before {
          transform: translateY(0);
        }
        .explore-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
        .explore-btn span,
        .explore-btn svg {
          position: relative;
          z-index: 1;
        }

        .join-btn {
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }
        .join-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        .dot {
          transition: all 0.3s ease;
        }
        .dot.active {
          width: 20px;
          background: #0f172a;
        }
      `}</style>

      <section
        className="hero-section relative w-full bg-white"
        style={{ height: "100dvh", paddingTop: "80px" }}
      >
        <div className="h-full max-w-[1600px] mx-auto px-4 pb-4 flex flex-col">
          {/* Main Card — fills remaining height */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[2rem] bg-[#f97316] shadow-[0_30px_80px_rgba(0,0,0,0.18)] min-h-0">
            {/* LEFT: Content */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-12 lg:p-14">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 self-start bg-slate-900 text-white text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest"
              >
                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                Campus Events, All in One Place
              </motion.div>

              {/* Heading */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.55 }}
                  className="hero-heading text-[clamp(64px,8vw,108px)] text-slate-900 leading-[0.85] uppercase mb-5"
                >
                  Discover
                  <br />
                  Every
                  <br />
                  <span className="text-white">Campus</span>
                  <br />
                  Event
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-slate-800 text-[15px] font-medium max-w-xs leading-relaxed"
                >
                  From hackathons to cultural fests — your next great memory
                  starts here.
                </motion.p>
              </div>

              {/* Buttons + Dots */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/events"
                    className="explore-btn px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-2"
                  >
                    <span>Explore Events</span>
                    <ArrowUpRight size={16} />
                  </Link>

                  {!session?.user && (
                    <Link
                      href="/register"
                      className="join-btn px-7 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm"
                    >
                      Join Community
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>

                {/* Video Indicator Dots */}
                <div className="flex items-center gap-1.5">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`dot h-2 rounded-full ${i === currentIndex ? "active w-5 bg-slate-900" : "w-2 bg-slate-900/30"}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Video */}
            <div className="lg:col-span-7 relative p-4 md:p-6 lg:p-8 flex items-stretch">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)] border-[6px] border-white/25 relative min-h-[300px]"
                >
                  <video
                    src={videos[currentIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* NOW badge */}
                  <motion.div
                    initial={{ rotate: -18, scale: 0 }}
                    animate={{ rotate: -12, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="absolute top-5 right-5 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg"
                  >
                    <span className="font-black text-slate-900 text-[11px] tracking-widest uppercase">
                      NOW
                    </span>
                  </motion.div>

                  {/* Bottom overlay info strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                      Live on campus
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
