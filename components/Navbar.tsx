// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useRef, useEffect } from "react";
// import {
//   Menu,
//   X,
//   GraduationCap,
//   ChevronDown,
//   LogOut,
//   User,
//   LayoutDashboard,
//   Home,
//   Calendar,
//   Zap,
//   Music,
//   Dumbbell,
// } from "lucide-react";

// export function Navbar() {
//   const { data: session, status } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const navLinks = [
//     { href: "/", label: "Home", icon: Home },
//     { href: "/events", label: "Events", icon: Calendar },
//     { href: "/calendar", lable: "Calendar", icon: Calendar },
//     { href: "/create", label: "Create", icon: Calendar },
//     { href: "/about", label: "About", icon: Calendar },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 group flex-shrink-0"
//           >
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow duration-300">
//               <GraduationCap className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
//               NowOnCampus
//             </span>
//           </Link>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Auth */}
//           <div className="hidden md:flex items-center gap-3">
//             {status === "loading" ? (
//               <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
//             ) : session ? (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
//                 >
//                   {session.user?.image ? (
//                     <img
//                       src={session.user.image}
//                       alt="avatar"
//                       className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
//                       {session.user?.name?.charAt(0).toUpperCase() || "U"}
//                     </div>
//                   )}
//                   <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
//                     {session.user?.name?.split(" ")[0]}
//                   </span>
//                   <ChevronDown
//                     className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
//                     <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
//                       <p className="text-xs text-slate-500">Signed in as</p>
//                       <p className="text-sm font-semibold text-slate-800 truncate">
//                         {session.user?.email}
//                       </p>
//                     </div>
//                     <div className="py-1">
//                       <Link
//                         href="/profile"
//                         onClick={() => setDropdownOpen(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
//                       >
//                         <User className="w-4 h-4" /> My Profile
//                       </Link>
//                       {isAdmin && (
//                         <Link
//                           href="/admin"
//                           onClick={() => setDropdownOpen(false)}
//                           className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
//                         >
//                           <LayoutDashboard className="w-4 h-4" /> Admin Panel
//                         </Link>
//                       )}
//                       <button
//                         onClick={() => {
//                           signOut();
//                           setDropdownOpen(false);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                       >
//                         <LogOut className="w-4 h-4" /> Sign Out
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-blue-200 transition-all duration-200"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile: show avatar or hamburger */}
//           <div className="md:hidden flex items-center gap-2">
//             {status !== "loading" && session && (
//               <div className="flex items-center gap-2">
//                 {session.user?.image ? (
//                   <img
//                     src={session.user.image}
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
//                   />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
//                     {session.user?.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                 )}
//               </div>
//             )}
//             <button
//               className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Drawer */}
//       {menuOpen && (
//         <div className="md:hidden border-t border-slate-200 bg-white">
//           {/* User info banner (if logged in) */}
//           {session && (
//             <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
//               <p className="text-xs text-slate-500">Signed in as</p>
//               <p className="text-sm font-semibold text-slate-800 truncate">
//                 {session.user?.email}
//               </p>
//             </div>
//           )}

//           {/* Nav Links */}
//           <div className="px-4 py-3 space-y-0.5">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
//               >
//                 <link.icon className="w-4 h-4 text-slate-400" />
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Section */}
//           <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-1.5">
//             {session ? (
//               <>
//                 <Link
//                   href="/profile"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
//                 >
//                   <User className="w-4 h-4" /> My Profile
//                 </Link>
//                 {isAdmin && (
//                   <Link
//                     href="/admin"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
//                   >
//                     <LayoutDashboard className="w-4 h-4" /> Admin Panel
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     signOut();
//                     setMenuOpen(false);
//                   }}
//                   className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" /> Sign Out
//                 </button>
//               </>
//             ) : (
//               <div className="flex flex-col gap-2 pt-1">
//                 <Link
//                   href="/login"
//                   onClick={() => setMenuOpen(false)}
//                   className="px-4 py-2.5 text-center text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/register"
//                   onClick={() => setMenuOpen(false)}
//                   className="px-4 py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Home,
  Calendar,
  Plus,
  Info,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/create", label: "Create", icon: Plus },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .nav-root {
          font-family: 'Rajdhani', sans-serif;
        }

        .logo-font {
          font-family: 'Orbitron', monospace;
        }

        /* Scanline overlay */
        .nav-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 200, 0.015) 2px,
            rgba(0, 255, 200, 0.015) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Animated top border beam */
        .nav-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #00ffc8 20%, #00aaff 50%, #00ffc8 80%, transparent 100%);
          background-size: 200% 100%;
          animation: beamSweep 4s linear infinite;
        }

        @keyframes beamSweep {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }

        /* Bottom border glow */
        .nav-bottom-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.3), rgba(0,170,255,0.3), transparent);
        }

        /* Logo glow pulse */
        .logo-icon {
          position: relative;
          animation: logoPulse 3s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(0,255,200,0.4), 0 0 20px rgba(0,170,255,0.2); }
          50% { box-shadow: 0 0 16px rgba(0,255,200,0.7), 0 0 40px rgba(0,170,255,0.4); }
        }

        /* Nav link hover effect */
        .nav-link {
          position: relative;
          letter-spacing: 0.08em;
          font-weight: 500;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: rgba(180, 220, 255, 0.6);
          padding: 6px 14px;
          transition: color 0.2s ease;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #00ffc8, #00aaff);
          transition: width 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          background: radial-gradient(ellipse, rgba(0,255,200,0.6), transparent 70%);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #00ffc8;
        }

        .nav-link:hover::before {
          width: 80%;
        }

        .nav-link:hover::after {
          width: 60%;
        }

        .nav-link.active {
          color: #00ffc8;
        }

        .nav-link.active::before {
          width: 80%;
        }

        /* Corner brackets on active */
        .nav-link.active .bracket-left,
        .nav-link.active .bracket-right {
          opacity: 1;
        }

        .bracket-left, .bracket-right {
          opacity: 0;
          transition: opacity 0.2s;
          color: rgba(0, 255, 200, 0.5);
          font-size: 0.65rem;
          margin: 0 2px;
        }

        /* Avatar ring */
        .avatar-ring {
          position: relative;
        }

        .avatar-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffc8, #00aaff, #00ffc8);
          z-index: -1;
          animation: avatarSpin 4s linear infinite;
        }

        @keyframes avatarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Dropdown */
        .dropdown-panel {
          background: rgba(5, 12, 28, 0.97);
          border: 1px solid rgba(0, 255, 200, 0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 0 40px rgba(0, 170, 255, 0.15), 0 20px 60px rgba(0,0,0,0.6);
          border-radius: 4px;
        }

        .dropdown-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffc8, #00aaff, transparent);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(180, 220, 255, 0.7);
          transition: all 0.2s;
          position: relative;
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: linear-gradient(90deg, rgba(0,255,200,0.1), transparent);
          transition: width 0.2s;
        }

        .dropdown-item:hover {
          color: #00ffc8;
        }

        .dropdown-item:hover::before {
          width: 100%;
        }

        .dropdown-item-danger {
          color: rgba(255, 80, 80, 0.7);
        }

        .dropdown-item-danger:hover {
          color: #ff5050;
        }

        .dropdown-item-danger::before {
          background: linear-gradient(90deg, rgba(255,80,80,0.1), transparent);
        }

        /* Sign in / Register buttons */
        .btn-signin {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0, 255, 200, 0.8);
          padding: 6px 14px;
          border: 1px solid rgba(0, 255, 200, 0.25);
          background: transparent;
          transition: all 0.2s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .btn-signin:hover {
          color: #00ffc8;
          border-color: rgba(0,255,200,0.6);
          background: rgba(0,255,200,0.06);
          box-shadow: 0 0 15px rgba(0,255,200,0.15);
        }

        .btn-register {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #050c1c;
          padding: 6px 16px;
          background: linear-gradient(135deg, #00ffc8, #00aaff);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .btn-register::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00aaff, #00ffc8);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .btn-register:hover::before {
          opacity: 1;
        }

        .btn-register span {
          position: relative;
          z-index: 1;
        }

        .btn-register:hover {
          box-shadow: 0 0 20px rgba(0,255,200,0.4);
        }

        /* Hamburger */
        .hamburger-btn {
          padding: 6px;
          border: 1px solid rgba(0,255,200,0.2);
          background: rgba(0,255,200,0.04);
          transition: all 0.2s;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        .hamburger-btn:hover {
          border-color: rgba(0,255,200,0.5);
          background: rgba(0,255,200,0.08);
        }

        /* Mobile drawer */
        .mobile-drawer {
          background: rgba(4, 10, 24, 0.98);
          border-top: 1px solid rgba(0, 255, 200, 0.15);
          backdrop-filter: blur(20px);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(180, 220, 255, 0.6);
          border-left: 2px solid transparent;
          transition: all 0.2s;
        }

        .mobile-link:hover {
          color: #00ffc8;
          border-left-color: #00ffc8;
          background: rgba(0, 255, 200, 0.04);
          padding-left: 20px;
        }

        /* Status dot */
        .status-online {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 8px;
          height: 8px;
          background: #00ffc8;
          border-radius: 50%;
          border: 1.5px solid #050c1c;
          box-shadow: 0 0 6px #00ffc8;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 4px #00ffc8; }
          50% { box-shadow: 0 0 10px #00ffc8, 0 0 20px rgba(0,255,200,0.3); }
        }

        /* Corner decorations */
        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position: absolute;
          width: 6px;
          height: 6px;
          border-color: rgba(0,255,200,0.4);
          border-style: solid;
        }
        .corner-tl { top: 2px; left: 2px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 2px; right: 2px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 2px; left: 2px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 2px; right: 2px; border-width: 0 1px 1px 0; }

        /* Dropdown user header */
        .dropdown-user-header {
          padding: 12px 16px;
          background: rgba(0, 255, 200, 0.04);
          border-bottom: 1px solid rgba(0, 255, 200, 0.1);
        }

        /* Loading skeleton */
        .skeleton-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(90deg, rgba(0,255,200,0.1), rgba(0,170,255,0.1), rgba(0,255,200,0.1));
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>

      <nav
        className="nav-root sticky top-0 z-50 relative"
        style={{
          background: "rgba(4, 10, 24, 0.92)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="nav-beam" />
        <div className="nav-bottom-line" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div
                className="logo-icon w-9 h-9 rounded-sm flex items-center justify-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,200,0.15), rgba(0,170,255,0.15))",
                  border: "1px solid rgba(0,255,200,0.4)",
                }}
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <GraduationCap
                  className="w-5 h-5"
                  style={{ color: "#00ffc8" }}
                />
              </div>
              <div
                className="logo-font text-sm font-bold tracking-wider"
                style={{
                  background: "linear-gradient(90deg, #00ffc8, #00aaff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.12em",
                }}
              >
                NOW
                <span
                  style={{
                    color: "rgba(0,170,255,0.6)",
                    WebkitTextFillColor: "rgba(0,170,255,0.8)",
                  }}
                >
                  ON
                </span>
                CAMPUS
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`nav-link ${activeLink === link.href ? "active" : ""}`}
                >
                  <span className="bracket-left">[</span>
                  {link.label}
                  <span className="bracket-right">]</span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {status === "loading" ? (
                <div className="skeleton-avatar" />
              ) : session ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 transition-all duration-200"
                    style={{
                      border: "1px solid rgba(0,255,200,0.2)",
                      background: dropdownOpen
                        ? "rgba(0,255,200,0.06)"
                        : "transparent",
                      clipPath:
                        "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    <div className="relative avatar-ring">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="avatar"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, #00ffc8, #00aaff)",
                            color: "#050c1c",
                          }}
                        >
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="status-online" />
                    </div>
                    <span
                      className="text-xs font-medium max-w-[90px] truncate"
                      style={{
                        color: "rgba(180,220,255,0.8)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {session.user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      style={{ color: "rgba(0,255,200,0.6)" }}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="dropdown-panel absolute right-0 mt-2 w-56 overflow-hidden"
                      style={{ zIndex: 50 }}
                    >
                      <div className="dropdown-user-header">
                        <p
                          className="text-xs mb-0.5"
                          style={{
                            color: "rgba(0,255,200,0.5)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Authenticated
                        </p>
                        <p
                          className="text-xs truncate"
                          style={{
                            color: "rgba(180,220,255,0.7)",
                            fontFamily: "monospace",
                          }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="dropdown-item"
                        >
                          <User className="w-3.5 h-3.5" /> My Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className="dropdown-item"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5" /> Admin
                            Panel
                          </Link>
                        )}
                        <div
                          style={{
                            height: "1px",
                            background: "rgba(0,255,200,0.1)",
                            margin: "4px 0",
                          }}
                        />
                        <button
                          onClick={() => {
                            signOut();
                            setDropdownOpen(false);
                          }}
                          className="dropdown-item dropdown-item-danger w-full text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="btn-signin">
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-register">
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              {status !== "loading" && session && (
                <div className="relative avatar-ring">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="avatar"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, #00ffc8, #00aaff)",
                        color: "#050c1c",
                      }}
                    >
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="status-online" />
                </div>
              )}
              <button
                className="hamburger-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-4 h-4" style={{ color: "#00ffc8" }} />
                ) : (
                  <Menu className="w-4 h-4" style={{ color: "#00ffc8" }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="mobile-drawer md:hidden">
            {session && (
              <div
                className="px-4 py-3"
                style={{
                  borderBottom: "1px solid rgba(0,255,200,0.1)",
                  background: "rgba(0,255,200,0.03)",
                }}
              >
                <p
                  className="text-xs mb-0.5"
                  style={{
                    color: "rgba(0,255,200,0.5)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Authenticated
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(180,220,255,0.6)",
                    fontFamily: "monospace",
                  }}
                >
                  {session.user?.email}
                </p>
              </div>
            )}

            <div className="py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveLink(link.href);
                  }}
                  className="mobile-link"
                  style={
                    activeLink === link.href
                      ? { color: "#00ffc8", borderLeftColor: "#00ffc8" }
                      : {}
                  }
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              className="py-2"
              style={{ borderTop: "1px solid rgba(0,255,200,0.1)" }}
            >
              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="mobile-link"
                  >
                    <User className="w-3.5 h-3.5" /> My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="mobile-link"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="mobile-link w-full text-left"
                    style={{ color: "rgba(255,80,80,0.7)" }}
                  >
                    <LogOut className="w-3.5 h-3.5" /> Disconnect
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-4 py-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="btn-signin text-center block"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="btn-register text-center block"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}