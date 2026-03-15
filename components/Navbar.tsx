// // // // // // // // "use client";

// // // // // // // // import Link from "next/link";
// // // // // // // // import { useSession, signOut } from "next-auth/react";
// // // // // // // // import { useState, useRef, useEffect } from "react";
// // // // // // // // import {
// // // // // // // //     Menu, X, GraduationCap, ChevronDown,
// // // // // // // //     LogOut, User, LayoutDashboard, Home, Calendar, Info, Mail,
// // // // // // // // } from "lucide-react";

// // // // // // // // export function Navbar() {
// // // // // // // //     const { data: session, status } = useSession();
// // // // // // // //     const [menuOpen, setMenuOpen] = useState(false);
// // // // // // // //     const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // // // // //     const dropdownRef = useRef<HTMLDivElement>(null);

// // // // // // // //     const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // // // // // // //     // Close dropdown when clicking outside
// // // // // // // //     useEffect(() => {
// // // // // // // //         function handleClickOutside(e: MouseEvent) {
// // // // // // // //             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
// // // // // // // //                 setDropdownOpen(false);
// // // // // // // //             }
// // // // // // // //         }
// // // // // // // //         document.addEventListener("mousedown", handleClickOutside);
// // // // // // // //         return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // // // //     }, []);

// // // // // // // //     const navLinks = [
// // // // // // // //         { href: "/", label: "Home", icon: Home },
// // // // // // // //         { href: "/events", label: "Events", icon: Calendar },
// // // // // // // //         { href: "/about", label: "About Us", icon: Info },
// // // // // // // //         { href: "/contact", label: "Contact Us", icon: Mail },
// // // // // // // //     ];

// // // // // // // //     return (
// // // // // // // //         <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
// // // // // // // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // // // // //                 <div className="flex items-center justify-between h-16">
// // // // // // // //                     {/* Logo */}
// // // // // // // //                     <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
// // // // // // // //                         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow duration-300">
// // // // // // // //                             <GraduationCap className="w-5 h-5 text-white" />
// // // // // // // //                         </div>
// // // // // // // //                         <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
// // // // // // // //                             NowOnCampus
// // // // // // // //                         </span>
// // // // // // // //                     </Link>

// // // // // // // //                     {/* Desktop Nav Links */}
// // // // // // // //                     <div className="hidden md:flex items-center gap-1">
// // // // // // // //                         {navLinks.map((link) => (
// // // // // // // //                             <Link
// // // // // // // //                                 key={link.href}
// // // // // // // //                                 href={link.href}
// // // // // // // //                                 className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
// // // // // // // //                             >
// // // // // // // //                                 {link.label}
// // // // // // // //                             </Link>
// // // // // // // //                         ))}
// // // // // // // //                     </div>

// // // // // // // //                     {/* Desktop Auth */}
// // // // // // // //                     <div className="hidden md:flex items-center gap-3">
// // // // // // // //                         {status === "loading" ? (
// // // // // // // //                             <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
// // // // // // // //                         ) : session ? (
// // // // // // // //                             <div className="relative" ref={dropdownRef}>
// // // // // // // //                                 <button
// // // // // // // //                                     onClick={() => setDropdownOpen(!dropdownOpen)}
// // // // // // // //                                     className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
// // // // // // // //                                 >
// // // // // // // //                                     {session.user?.image ? (
// // // // // // // //                                         <img
// // // // // // // //                                             src={session.user.image}
// // // // // // // //                                             alt="avatar"
// // // // // // // //                                             className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
// // // // // // // //                                         />
// // // // // // // //                                     ) : (
// // // // // // // //                                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
// // // // // // // //                                             {session.user?.name?.charAt(0).toUpperCase() || "U"}
// // // // // // // //                                         </div>
// // // // // // // //                                     )}
// // // // // // // //                                     <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
// // // // // // // //                                         {session.user?.name?.split(" ")[0]}
// // // // // // // //                                     </span>
// // // // // // // //                                     <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
// // // // // // // //                                 </button>

// // // // // // // //                                 {dropdownOpen && (
// // // // // // // //                                     <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
// // // // // // // //                                         <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
// // // // // // // //                                             <p className="text-xs text-slate-500">Signed in as</p>
// // // // // // // //                                             <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.email}</p>
// // // // // // // //                                         </div>
// // // // // // // //                                         <div className="py-1">
// // // // // // // //                                             <Link
// // // // // // // //                                                 href="/profile"
// // // // // // // //                                                 onClick={() => setDropdownOpen(false)}
// // // // // // // //                                                 className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
// // // // // // // //                                             >
// // // // // // // //                                                 <User className="w-4 h-4" /> My Profile
// // // // // // // //                                             </Link>
// // // // // // // //                                             {isAdmin && (
// // // // // // // //                                                 <Link
// // // // // // // //                                                     href="/admin"
// // // // // // // //                                                     onClick={() => setDropdownOpen(false)}
// // // // // // // //                                                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
// // // // // // // //                                                 >
// // // // // // // //                                                     <LayoutDashboard className="w-4 h-4" /> Admin Panel
// // // // // // // //                                                 </Link>
// // // // // // // //                                             )}
// // // // // // // //                                             <button
// // // // // // // //                                                 onClick={() => { signOut(); setDropdownOpen(false); }}
// // // // // // // //                                                 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
// // // // // // // //                                             >
// // // // // // // //                                                 <LogOut className="w-4 h-4" /> Sign Out
// // // // // // // //                                             </button>
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         ) : (
// // // // // // // //                             <>
// // // // // // // //                                 <Link
// // // // // // // //                                     href="/login"
// // // // // // // //                                     className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
// // // // // // // //                                 >
// // // // // // // //                                     Sign In
// // // // // // // //                                 </Link>
// // // // // // // //                                 <Link
// // // // // // // //                                     href="/register"
// // // // // // // //                                     className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-blue-200 transition-all duration-200"
// // // // // // // //                                 >
// // // // // // // //                                     Register
// // // // // // // //                                 </Link>
// // // // // // // //                             </>
// // // // // // // //                         )}
// // // // // // // //                     </div>

// // // // // // // //                     {/* Mobile: show avatar or hamburger */}
// // // // // // // //                     <div className="md:hidden flex items-center gap-2">
// // // // // // // //                         {status !== "loading" && session && (
// // // // // // // //                             <div className="flex items-center gap-2">
// // // // // // // //                                 {session.user?.image ? (
// // // // // // // //                                     <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200" />
// // // // // // // //                                 ) : (
// // // // // // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
// // // // // // // //                                         {session.user?.name?.charAt(0).toUpperCase() || "U"}
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                         <button
// // // // // // // //                             className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
// // // // // // // //                             onClick={() => setMenuOpen(!menuOpen)}
// // // // // // // //                             aria-label="Toggle menu"
// // // // // // // //                         >
// // // // // // // //                             {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
// // // // // // // //                         </button>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* Mobile Menu Drawer */}
// // // // // // // //             {menuOpen && (
// // // // // // // //                 <div className="md:hidden border-t border-slate-200 bg-white">
// // // // // // // //                     {/* User info banner (if logged in) */}
// // // // // // // //                     {session && (
// // // // // // // //                         <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
// // // // // // // //                             <p className="text-xs text-slate-500">Signed in as</p>
// // // // // // // //                             <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.email}</p>
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     {/* Nav Links */}
// // // // // // // //                     <div className="px-4 py-3 space-y-0.5">
// // // // // // // //                         {navLinks.map((link) => (
// // // // // // // //                             <Link
// // // // // // // //                                 key={link.href}
// // // // // // // //                                 href={link.href}
// // // // // // // //                                 onClick={() => setMenuOpen(false)}
// // // // // // // //                                 className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
// // // // // // // //                             >
// // // // // // // //                                 <link.icon className="w-4 h-4 text-slate-400" />
// // // // // // // //                                 {link.label}
// // // // // // // //                             </Link>
// // // // // // // //                         ))}
// // // // // // // //                     </div>

// // // // // // // //                     {/* Auth Section */}
// // // // // // // //                     <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-1.5">
// // // // // // // //                         {session ? (
// // // // // // // //                             <>
// // // // // // // //                                 <Link
// // // // // // // //                                     href="/profile"
// // // // // // // //                                     onClick={() => setMenuOpen(false)}
// // // // // // // //                                     className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
// // // // // // // //                                 >
// // // // // // // //                                     <User className="w-4 h-4" /> My Profile
// // // // // // // //                                 </Link>
// // // // // // // //                                 {isAdmin && (
// // // // // // // //                                     <Link
// // // // // // // //                                         href="/admin"
// // // // // // // //                                         onClick={() => setMenuOpen(false)}
// // // // // // // //                                         className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
// // // // // // // //                                     >
// // // // // // // //                                         <LayoutDashboard className="w-4 h-4" /> Admin Panel
// // // // // // // //                                     </Link>
// // // // // // // //                                 )}
// // // // // // // //                                 <button
// // // // // // // //                                     onClick={() => { signOut(); setMenuOpen(false); }}
// // // // // // // //                                     className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
// // // // // // // //                                 >
// // // // // // // //                                     <LogOut className="w-4 h-4" /> Sign Out
// // // // // // // //                                 </button>
// // // // // // // //                             </>
// // // // // // // //                         ) : (
// // // // // // // //                             <div className="flex flex-col gap-2 pt-1">
// // // // // // // //                                 <Link
// // // // // // // //                                     href="/login"
// // // // // // // //                                     onClick={() => setMenuOpen(false)}
// // // // // // // //                                     className="px-4 py-2.5 text-center text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
// // // // // // // //                                 >
// // // // // // // //                                     Sign In
// // // // // // // //                                 </Link>
// // // // // // // //                                 <Link
// // // // // // // //                                     href="/register"
// // // // // // // //                                     onClick={() => setMenuOpen(false)}
// // // // // // // //                                     className="px-4 py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
// // // // // // // //                                 >
// // // // // // // //                                     Register
// // // // // // // //                                 </Link>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}
// // // // // // // //         </nav>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import Link from "next/link";
// // // // // // // import { useSession, signOut } from "next-auth/react";
// // // // // // // import { useState, useRef, useEffect } from "react";
// // // // // // // import {
// // // // // // //   Menu,
// // // // // // //   X,
// // // // // // //   GraduationCap,
// // // // // // //   ChevronDown,
// // // // // // //   LogOut,
// // // // // // //   User,
// // // // // // //   LayoutDashboard,
// // // // // // //   Home,
// // // // // // //   Calendar,
// // // // // // //   Info,
// // // // // // //   Mail,
// // // // // // // } from "lucide-react";

// // // // // // // export function Navbar() {
// // // // // // //   const { data: session, status } = useSession();
// // // // // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // // // // //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // // // // // //   useEffect(() => {
// // // // // // //     function handleClickOutside(e: MouseEvent) {
// // // // // // //       if (
// // // // // // //         dropdownRef.current &&
// // // // // // //         !dropdownRef.current.contains(e.target as Node)
// // // // // // //       ) {
// // // // // // //         setDropdownOpen(false);
// // // // // // //       }
// // // // // // //     }
// // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // // //   }, []);

// // // // // // //   const navLinks = [
// // // // // // //     { href: "/", label: "Home", icon: Home },
// // // // // // //     { href: "/events", label: "Events", icon: Calendar },
// // // // // // //     { href: "/about", label: "About", icon: Info },
// // // // // // //     { href: "/contact", label: "Contact", icon: Mail },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     // Floating Container
// // // // // // //     <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
// // // // // // //       <nav className="pointer-events-auto w-full max-w-6xl bg-slate-900/60 backdrop-blur-lg border border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] rounded-full px-6 py-2 transition-all duration-300">
// // // // // // //         <div className="flex items-center justify-between h-12">
// // // // // // //           {/* Logo Section */}
// // // // // // //           <Link
// // // // // // //             href="/"
// // // // // // //             className="flex items-center gap-2 group flex-shrink-0"
// // // // // // //           >
// // // // // // //             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg">
// // // // // // //               <GraduationCap className="w-4 h-4 text-white" />
// // // // // // //             </div>
// // // // // // //             <span className="text-lg font-bold text-white tracking-tight hidden sm:block">
// // // // // // //               NowOnCampus
// // // // // // //             </span>
// // // // // // //           </Link>

// // // // // // //           {/* Desktop Center Links */}
// // // // // // //           <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
// // // // // // //             {navLinks.map((link) => (
// // // // // // //               <Link
// // // // // // //                 key={link.href}
// // // // // // //                 href={link.href}
// // // // // // //                 className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200"
// // // // // // //               >
// // // // // // //                 {link.label}
// // // // // // //               </Link>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           {/* Desktop Right (Auth) */}
// // // // // // //           <div className="hidden md:flex items-center gap-4">
// // // // // // //             {status === "loading" ? (
// // // // // // //               <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
// // // // // // //             ) : session ? (
// // // // // // //               <div className="relative" ref={dropdownRef}>
// // // // // // //                 <button
// // // // // // //                   onClick={() => setDropdownOpen(!dropdownOpen)}
// // // // // // //                   className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
// // // // // // //                 >
// // // // // // //                   {session.user?.image ? (
// // // // // // //                     <img
// // // // // // //                       src={session.user.image}
// // // // // // //                       alt="avatar"
// // // // // // //                       className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
// // // // // // //                     />
// // // // // // //                   ) : (
// // // // // // //                     <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
// // // // // // //                       {session.user?.name?.charAt(0).toUpperCase()}
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                   <ChevronDown
// // // // // // //                     className={`w-3.5 h-3.5 text-slate-300 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
// // // // // // //                   />
// // // // // // //                 </button>

// // // // // // //                 {dropdownOpen && (
// // // // // // //                   <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1">
// // // // // // //                     <Link
// // // // // // //                       href="/profile"
// // // // // // //                       className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
// // // // // // //                     >
// // // // // // //                       <User className="w-4 h-4" /> Profile
// // // // // // //                     </Link>
// // // // // // //                     {isAdmin && (
// // // // // // //                       <Link
// // // // // // //                         href="/admin"
// // // // // // //                         className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
// // // // // // //                       >
// // // // // // //                         <LayoutDashboard className="w-4 h-4" /> Admin
// // // // // // //                       </Link>
// // // // // // //                     )}
// // // // // // //                     <button
// // // // // // //                       onClick={() => signOut()}
// // // // // // //                       className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
// // // // // // //                     >
// // // // // // //                       <LogOut className="w-4 h-4" /> Sign Out
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <Link
// // // // // // //                 href="/login"
// // // // // // //                 className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full transition-all"
// // // // // // //               >
// // // // // // //                 Login
// // // // // // //               </Link>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           {/* Mobile Menu Toggle */}
// // // // // // //           <button
// // // // // // //             className="md:hidden p-2 text-white"
// // // // // // //             onClick={() => setMenuOpen(!menuOpen)}
// // // // // // //           >
// // // // // // //             {menuOpen ? <X size={24} /> : <Menu size={24} />}
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Mobile Menu Drawer */}
// // // // // // //         {menuOpen && (
// // // // // // //           <div className="md:hidden mt-2 pb-4 bg-slate-900/90 rounded-3xl border border-white/10 overflow-hidden">
// // // // // // //             <div className="flex flex-col p-2">
// // // // // // //               {navLinks.map((link) => (
// // // // // // //                 <Link
// // // // // // //                   key={link.href}
// // // // // // //                   href={link.href}
// // // // // // //                   onClick={() => setMenuOpen(false)}
// // // // // // //                   className="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-white/5 rounded-2xl"
// // // // // // //                 >
// // // // // // //                   <link.icon className="w-4 h-4" /> {link.label}
// // // // // // //                 </Link>
// // // // // // //               ))}
// // // // // // //               <div className="h-[1px] bg-white/10 my-2 mx-4" />
// // // // // // //               {session ? (
// // // // // // //                 <button
// // // // // // //                   onClick={() => signOut()}
// // // // // // //                   className="flex items-center gap-3 px-4 py-3 text-red-400"
// // // // // // //                 >
// // // // // // //                   <LogOut className="w-4 h-4" /> Logout
// // // // // // //                 </button>
// // // // // // //               ) : (
// // // // // // //                 <Link
// // // // // // //                   href="/login"
// // // // // // //                   className="mx-4 py-3 text-center bg-blue-600 text-white rounded-2xl font-bold"
// // // // // // //                 >
// // // // // // //                   Login
// // // // // // //                 </Link>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </nav>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // "use client";

// // // // // // import Link from "next/link";
// // // // // // import { useSession, signOut } from "next-auth/react";
// // // // // // import { useState, useRef, useEffect } from "react";
// // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // import {
// // // // // //   Menu,
// // // // // //   X,
// // // // // //   GraduationCap,
// // // // // //   ChevronDown,
// // // // // //   LogOut,
// // // // // //   User,
// // // // // //   LayoutDashboard,
// // // // // //   Home,
// // // // // //   Calendar,
// // // // // //   Info,
// // // // // //   Mail,
// // // // // //   Sparkles,
// // // // // // } from "lucide-react";

// // // // // // export function Navbar() {
// // // // // //   const { data: session, status } = useSession();
// // // // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // // // //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // // // // //   // Close dropdown when clicking outside
// // // // // //   useEffect(() => {
// // // // // //     function handleClickOutside(e: MouseEvent) {
// // // // // //       if (
// // // // // //         dropdownRef.current &&
// // // // // //         !dropdownRef.current.contains(e.target as Node)
// // // // // //       ) {
// // // // // //         setDropdownOpen(false);
// // // // // //       }
// // // // // //     }
// // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // //   }, []);

// // // // // //   const navLinks = [
// // // // // //     { href: "/", label: "Home", icon: Home },
// // // // // //     { href: "/events", label: "Events", icon: Calendar },
// // // // // //     { href: "/about", label: "About", icon: Info },
// // // // // //     { href: "/contact", label: "Contact", icon: Mail },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
// // // // // //       <nav className="pointer-events-auto w-full max-w-6xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-full px-6 py-2.5 transition-all duration-300">
// // // // // //         <div className="flex items-center justify-between h-12">
// // // // // //           {/* --- Brand Logo --- */}
// // // // // //           <Link
// // // // // //             href="/"
// // // // // //             className="flex items-center gap-2 group flex-shrink-0"
// // // // // //           >
// // // // // //             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
// // // // // //               <GraduationCap className="w-5 h-5 text-white" />
// // // // // //             </div>
// // // // // //             <span className="text-xl font-black text-white tracking-tighter hidden sm:block">
// // // // // //               NowOnCampus
// // // // // //             </span>
// // // // // //           </Link>

// // // // // //           {/* --- Desktop Center Links --- */}
// // // // // //           <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/5 px-2 py-1 rounded-full border border-white/5">
// // // // // //             {navLinks.map((link) => (
// // // // // //               <Link
// // // // // //                 key={link.href}
// // // // // //                 href={link.href}
// // // // // //                 className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
// // // // // //               >
// // // // // //                 {link.label}
// // // // // //               </Link>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           {/* --- Desktop Right (Auth Section) --- */}
// // // // // //           <div className="hidden md:flex items-center gap-3">
// // // // // //             {status === "loading" ? (
// // // // // //               <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
// // // // // //             ) : session ? (
// // // // // //               /* User Logged In State */
// // // // // //               <div className="relative" ref={dropdownRef}>
// // // // // //                 <button
// // // // // //                   onClick={() => setDropdownOpen(!dropdownOpen)}
// // // // // //                   className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all"
// // // // // //                 >
// // // // // //                   {session.user?.image ? (
// // // // // //                     <img
// // // // // //                       src={session.user.image}
// // // // // //                       alt="avatar"
// // // // // //                       className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
// // // // // //                     />
// // // // // //                   ) : (
// // // // // //                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
// // // // // //                       {session.user?.name?.charAt(0).toUpperCase()}
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                   <span className="text-sm font-medium text-slate-200">
// // // // // //                     {session.user?.name?.split(" ")[0]}
// // // // // //                   </span>
// // // // // //                   <ChevronDown
// // // // // //                     className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
// // // // // //                   />
// // // // // //                 </button>

// // // // // //                 <AnimatePresence>
// // // // // //                   {dropdownOpen && (
// // // // // //                     <motion.div
// // // // // //                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
// // // // // //                       animate={{ opacity: 1, y: 0, scale: 1 }}
// // // // // //                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
// // // // // //                       className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
// // // // // //                     >
// // // // // //                       <Link
// // // // // //                         href="/profile"
// // // // // //                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
// // // // // //                       >
// // // // // //                         <User className="w-4 h-4" /> My Profile
// // // // // //                       </Link>
// // // // // //                       {isAdmin && (
// // // // // //                         <Link
// // // // // //                           href="/admin"
// // // // // //                           className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
// // // // // //                         >
// // // // // //                           <LayoutDashboard className="w-4 h-4" /> Admin
// // // // // //                           Dashboard
// // // // // //                         </Link>
// // // // // //                       )}
// // // // // //                       <div className="h-px bg-white/10 my-1 mx-2" />
// // // // // //                       <button
// // // // // //                         onClick={() => signOut()}
// // // // // //                         className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
// // // // // //                       >
// // // // // //                         <LogOut className="w-4 h-4" /> Sign Out
// // // // // //                       </button>
// // // // // //                     </motion.div>
// // // // // //                   )}
// // // // // //                 </AnimatePresence>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               /* Auth Buttons (Login & Register) */
// // // // // //               <div className="flex items-center gap-3">
// // // // // //                 <Link
// // // // // //                   href="/login"
// // // // // //                   className="px-5 py-2 text-sm font-bold text-slate-200 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/10 transition-all"
// // // // // //                 >
// // // // // //                   Login
// // // // // //                 </Link>
// // // // // //                 <Link
// // // // // //                   href="/register"
// // // // // //                   className="group relative px-6 py-2.5 text-sm font-black text-white overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
// // // // // //                 >
// // // // // //                   {/* Register Button Background Gradient */}
// // // // // //                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 transition-all group-hover:scale-110" />
// // // // // //                   {/* Subtle Shine Animation */}
// // // // // //                   <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shine_3s_infinite]" />

// // // // // //                   <span className="relative flex items-center gap-2">
// // // // // //                     Register <Sparkles className="w-3.5 h-3.5" />
// // // // // //                   </span>
// // // // // //                 </Link>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* --- Mobile Menu Button --- */}
// // // // // //           <button
// // // // // //             className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
// // // // // //             onClick={() => setMenuOpen(!menuOpen)}
// // // // // //           >
// // // // // //             {menuOpen ? <X size={24} /> : <Menu size={24} />}
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* --- Mobile Menu Drawer --- */}
// // // // // //         <AnimatePresence>
// // // // // //           {menuOpen && (
// // // // // //             <motion.div
// // // // // //               initial={{ height: 0, opacity: 0 }}
// // // // // //               animate={{ height: "auto", opacity: 1 }}
// // // // // //               exit={{ height: 0, opacity: 0 }}
// // // // // //               className="md:hidden mt-4 overflow-hidden"
// // // // // //             >
// // // // // //               <div className="flex flex-col gap-1 p-2 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-2xl">
// // // // // //                 {navLinks.map((link) => (
// // // // // //                   <Link
// // // // // //                     key={link.href}
// // // // // //                     href={link.href}
// // // // // //                     onClick={() => setMenuOpen(false)}
// // // // // //                     className="flex items-center gap-4 px-5 py-4 text-slate-200 hover:bg-white/10 rounded-2xl transition-all"
// // // // // //                   >
// // // // // //                     <link.icon className="w-5 h-5 text-blue-400" />
// // // // // //                     <span className="font-semibold">{link.label}</span>
// // // // // //                   </Link>
// // // // // //                 ))}

// // // // // //                 {!session && (
// // // // // //                   <div className="grid grid-cols-2 gap-3 p-3 mt-2">
// // // // // //                     <Link
// // // // // //                       href="/login"
// // // // // //                       onClick={() => setMenuOpen(false)}
// // // // // //                       className="py-3 text-center text-slate-300 border border-white/10 rounded-2xl font-bold"
// // // // // //                     >
// // // // // //                       Login
// // // // // //                     </Link>
// // // // // //                     <Link
// // // // // //                       href="/register"
// // // // // //                       onClick={() => setMenuOpen(false)}
// // // // // //                       className="py-3 text-center bg-blue-600 text-white rounded-2xl font-bold"
// // // // // //                     >
// // // // // //                       Sign Up
// // // // // //                     </Link>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </motion.div>
// // // // // //           )}
// // // // // //         </AnimatePresence>
// // // // // //       </nav>

// // // // // //       {/* Tailwind Custom Keyframes (Aap apne globals.css mein bhi daal sakte hain) */}
// // // // // //       <style jsx global>{`
// // // // // //         @keyframes shine {
// // // // // //           0% {
// // // // // //             background-position: -200% 0;
// // // // // //           }
// // // // // //           100% {
// // // // // //             background-position: 200% 0;
// // // // // //           }
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import Link from "next/link";
// // // // // import { useSession, signOut } from "next-auth/react";
// // // // // import { useState, useRef, useEffect } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import {
// // // // //   Menu,
// // // // //   X,
// // // // //   GraduationCap,
// // // // //   ChevronDown,
// // // // //   LogOut,
// // // // //   User,
// // // // //   LayoutDashboard,
// // // // //   Home,
// // // // //   Calendar,
// // // // //   Info,
// // // // //   Mail,
// // // // //   Sparkles,
// // // // // } from "lucide-react";

// // // // // export function Navbar() {
// // // // //   const { data: session, status } = useSession();
// // // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // // //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // // // //   useEffect(() => {
// // // // //     function handleClickOutside(e: MouseEvent) {
// // // // //       if (
// // // // //         dropdownRef.current &&
// // // // //         !dropdownRef.current.contains(e.target as Node)
// // // // //       ) {
// // // // //         setDropdownOpen(false);
// // // // //       }
// // // // //     }
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   const navLinks = [
// // // // //     { href: "/", label: "Home", icon: Home },
// // // // //     { href: "/events", label: "Events", icon: Calendar },
// // // // //     { href: "/about", label: "About", icon: Info },
// // // // //     { href: "/contact", label: "Contact", icon: Mail },
// // // // //   ];

// // // // //   return (
// // // // //     <>
// // // // //       <style jsx global>{`
// // // // //         @keyframes shimmer {
// // // // //           0% {
// // // // //             background-position: -200% center;
// // // // //           }
// // // // //           100% {
// // // // //             background-position: 200% center;
// // // // //           }
// // // // //         }

// // // // //         .nav-link {
// // // // //           position: relative;
// // // // //           overflow: hidden;
// // // // //         }
// // // // //         .nav-link::after {
// // // // //           content: "";
// // // // //           position: absolute;
// // // // //           bottom: 4px;
// // // // //           left: 50%;
// // // // //           transform: translateX(-50%);
// // // // //           width: 0;
// // // // //           height: 1.5px;
// // // // //           background: linear-gradient(90deg, #3b82f6, #818cf8);
// // // // //           border-radius: 99px;
// // // // //           transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// // // // //         }
// // // // //         .nav-link:hover::after {
// // // // //           width: 60%;
// // // // //         }

// // // // //         .register-btn {
// // // // //           background: linear-gradient(
// // // // //             135deg,
// // // // //             #1d4ed8 0%,
// // // // //             #4f46e5 50%,
// // // // //             #1d4ed8 100%
// // // // //           );
// // // // //           background-size: 200% auto;
// // // // //           transition:
// // // // //             background-position 0.5s ease,
// // // // //             transform 0.2s ease,
// // // // //             box-shadow 0.3s ease;
// // // // //         }
// // // // //         .register-btn:hover {
// // // // //           background-position: right center;
// // // // //           transform: translateY(-1px);
// // // // //           box-shadow: 0 8px 25px rgba(79, 70, 229, 0.45);
// // // // //         }
// // // // //         .register-btn:active {
// // // // //           transform: translateY(0px);
// // // // //         }

// // // // //         .login-btn {
// // // // //           position: relative;
// // // // //           transition: color 0.25s ease;
// // // // //         }
// // // // //         .login-btn::before {
// // // // //           content: "";
// // // // //           position: absolute;
// // // // //           inset: 0;
// // // // //           border-radius: 8px;
// // // // //           background: rgba(255, 255, 255, 0.05);
// // // // //           opacity: 0;
// // // // //           transition: opacity 0.25s ease;
// // // // //         }
// // // // //         .login-btn:hover::before {
// // // // //           opacity: 1;
// // // // //         }
// // // // //         .login-btn:hover {
// // // // //           color: #fff;
// // // // //         }

// // // // //         .dropdown-item {
// // // // //           position: relative;
// // // // //           transition:
// // // // //             background 0.2s ease,
// // // // //             color 0.2s ease,
// // // // //             padding-left 0.2s ease;
// // // // //         }
// // // // //         .dropdown-item:hover {
// // // // //           padding-left: 22px;
// // // // //         }

// // // // //         .user-avatar-btn {
// // // // //           transition:
// // // // //             border-color 0.25s ease,
// // // // //             box-shadow 0.25s ease;
// // // // //         }
// // // // //         .user-avatar-btn:hover {
// // // // //           border-color: rgba(99, 102, 241, 0.5);
// // // // //           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
// // // // //         }

// // // // //         .mobile-nav-link {
// // // // //           position: relative;
// // // // //           transition:
// // // // //             background 0.2s ease,
// // // // //             color 0.2s ease,
// // // // //             border-color 0.2s ease;
// // // // //           border-left: 2px solid transparent;
// // // // //         }
// // // // //         .mobile-nav-link:hover {
// // // // //           border-left-color: #3b82f6;
// // // // //           background: rgba(255, 255, 255, 0.05);
// // // // //           color: #fff;
// // // // //         }
// // // // //         .mobile-nav-link:hover .mobile-icon {
// // // // //           color: #60a5fa;
// // // // //           transform: translateX(2px);
// // // // //         }
// // // // //         .mobile-icon {
// // // // //           transition:
// // // // //             color 0.2s ease,
// // // // //             transform 0.2s ease;
// // // // //         }
// // // // //       `}</style>

// // // // //       <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
// // // // //         <nav className="pointer-events-auto w-full max-w-6xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-2xl px-6 py-2.5 transition-all duration-300">
// // // // //           <div className="flex items-center justify-between h-12">
// // // // //             {/* Brand */}
// // // // //             <Link
// // // // //               href="/"
// // // // //               className="flex items-center gap-2.5 group flex-shrink-0"
// // // // //             >
// // // // //               <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.35)] group-hover:shadow-[0_0_22px_rgba(37,99,235,0.55)] transition-shadow duration-300">
// // // // //                 <GraduationCap className="w-5 h-5 text-white" />
// // // // //               </div>
// // // // //               <span className="text-xl font-black text-white tracking-tighter hidden sm:block">
// // // // //                 NowOnCampus
// // // // //               </span>
// // // // //             </Link>

// // // // //             {/* Desktop Center Links */}
// // // // //             <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
// // // // //               {navLinks.map((link) => (
// // // // //                 <Link
// // // // //                   key={link.href}
// // // // //                   href={link.href}
// // // // //                   className="nav-link px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200"
// // // // //                 >
// // // // //                   {link.label}
// // // // //                 </Link>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* Desktop Right */}
// // // // //             <div className="hidden md:flex items-center gap-2">
// // // // //               {status === "loading" ? (
// // // // //                 <div className="w-8 h-8 rounded-lg bg-white/10 animate-pulse" />
// // // // //               ) : session ? (
// // // // //                 <div className="relative" ref={dropdownRef}>
// // // // //                   <button
// // // // //                     onClick={() => setDropdownOpen(!dropdownOpen)}
// // // // //                     className="user-avatar-btn flex items-center gap-2.5 p-1 pr-3.5 rounded-xl bg-white/5 border border-white/10"
// // // // //                   >
// // // // //                     {session.user?.image ? (
// // // // //                       <img
// // // // //                         src={session.user.image}
// // // // //                         alt="avatar"
// // // // //                         className="w-8 h-8 rounded-lg object-cover"
// // // // //                       />
// // // // //                     ) : (
// // // // //                       <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
// // // // //                         {session.user?.name?.charAt(0).toUpperCase()}
// // // // //                       </div>
// // // // //                     )}
// // // // //                     <span className="text-sm font-medium text-slate-200">
// // // // //                       {session.user?.name?.split(" ")[0]}
// // // // //                     </span>
// // // // //                     <ChevronDown
// // // // //                       className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
// // // // //                     />
// // // // //                   </button>

// // // // //                   <AnimatePresence>
// // // // //                     {dropdownOpen && (
// // // // //                       <motion.div
// // // // //                         initial={{ opacity: 0, y: 8, scale: 0.97 }}
// // // // //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // // //                         exit={{ opacity: 0, y: 8, scale: 0.97 }}
// // // // //                         transition={{ duration: 0.18, ease: "easeOut" }}
// // // // //                         className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1.5"
// // // // //                       >
// // // // //                         <Link
// // // // //                           href="/profile"
// // // // //                           className="dropdown-item flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white"
// // // // //                         >
// // // // //                           <User className="w-4 h-4 text-slate-500" /> My Profile
// // // // //                         </Link>
// // // // //                         {isAdmin && (
// // // // //                           <Link
// // // // //                             href="/admin"
// // // // //                             className="dropdown-item flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white"
// // // // //                           >
// // // // //                             <LayoutDashboard className="w-4 h-4 text-slate-500" />{" "}
// // // // //                             Admin Dashboard
// // // // //                           </Link>
// // // // //                         )}
// // // // //                         <div className="h-px bg-white/8 my-1 mx-3" />
// // // // //                         <button
// // // // //                           onClick={() => signOut()}
// // // // //                           className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
// // // // //                         >
// // // // //                           <LogOut className="w-4 h-4" /> Sign Out
// // // // //                         </button>
// // // // //                       </motion.div>
// // // // //                     )}
// // // // //                   </AnimatePresence>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <Link
// // // // //                     href="/login"
// // // // //                     className="login-btn px-5 py-2 text-sm font-semibold text-slate-300 rounded-lg"
// // // // //                   >
// // // // //                     Login
// // // // //                   </Link>
// // // // //                   <Link
// // // // //                     href="/register"
// // // // //                     className="register-btn px-5 py-2.5 text-sm font-bold text-white rounded-lg flex items-center gap-2"
// // // // //                   >
// // // // //                     Register <Sparkles className="w-3.5 h-3.5" />
// // // // //                   </Link>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Mobile Menu Button */}
// // // // //             <button
// // // // //               className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
// // // // //               onClick={() => setMenuOpen(!menuOpen)}
// // // // //             >
// // // // //               <motion.div
// // // // //                 animate={{ rotate: menuOpen ? 90 : 0 }}
// // // // //                 transition={{ duration: 0.2 }}
// // // // //               >
// // // // //                 {menuOpen ? <X size={22} /> : <Menu size={22} />}
// // // // //               </motion.div>
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Mobile Menu */}
// // // // //           <AnimatePresence>
// // // // //             {menuOpen && (
// // // // //               <motion.div
// // // // //                 initial={{ height: 0, opacity: 0 }}
// // // // //                 animate={{ height: "auto", opacity: 1 }}
// // // // //                 exit={{ height: 0, opacity: 0 }}
// // // // //                 transition={{ duration: 0.25, ease: "easeInOut" }}
// // // // //                 className="md:hidden overflow-hidden"
// // // // //               >
// // // // //                 <div className="pt-3 pb-2 flex flex-col border-t border-white/8 mt-3">
// // // // //                   {navLinks.map((link, i) => (
// // // // //                     <motion.div
// // // // //                       key={link.href}
// // // // //                       initial={{ opacity: 0, x: -10 }}
// // // // //                       animate={{ opacity: 1, x: 0 }}
// // // // //                       transition={{ delay: i * 0.05, duration: 0.2 }}
// // // // //                     >
// // // // //                       <Link
// // // // //                         href={link.href}
// // // // //                         onClick={() => setMenuOpen(false)}
// // // // //                         className="mobile-nav-link flex items-center gap-4 px-4 py-3.5 text-slate-300"
// // // // //                       >
// // // // //                         <link.icon className="mobile-icon w-4 h-4 text-slate-500" />
// // // // //                         <span className="text-sm font-semibold">
// // // // //                           {link.label}
// // // // //                         </span>
// // // // //                       </Link>
// // // // //                     </motion.div>
// // // // //                   ))}

// // // // //                   {!session && (
// // // // //                     <motion.div
// // // // //                       initial={{ opacity: 0, y: 6 }}
// // // // //                       animate={{ opacity: 1, y: 0 }}
// // // // //                       transition={{ delay: 0.22, duration: 0.2 }}
// // // // //                       className="flex gap-3 px-4 pt-3 mt-1 border-t border-white/8"
// // // // //                     >
// // // // //                       <Link
// // // // //                         href="/login"
// // // // //                         onClick={() => setMenuOpen(false)}
// // // // //                         className="flex-1 py-2.5 text-center text-sm text-slate-300 border border-white/15 rounded-lg font-semibold hover:bg-white/5 hover:text-white transition-all"
// // // // //                       >
// // // // //                         Login
// // // // //                       </Link>
// // // // //                       <Link
// // // // //                         href="/register"
// // // // //                         onClick={() => setMenuOpen(false)}
// // // // //                         className="register-btn flex-1 py-2.5 text-center text-sm text-white rounded-lg font-bold"
// // // // //                       >
// // // // //                         Sign Up
// // // // //                       </Link>
// // // // //                     </motion.div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </motion.div>
// // // // //             )}
// // // // //           </AnimatePresence>
// // // // //         </nav>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import Link from "next/link";
// // // // import { useSession, signOut } from "next-auth/react";
// // // // import { useState, useRef, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import {
// // // //   Menu,
// // // //   X,
// // // //   GraduationCap,
// // // //   ChevronDown,
// // // //   LogOut,
// // // //   User,
// // // //   LayoutDashboard,
// // // //   Home,
// // // //   Calendar,
// // // //   Info,
// // // //   Mail,
// // // //   Sparkles,
// // // // } from "lucide-react";

// // // // export function Navbar() {
// // // //   const { data: session, status } = useSession();
// // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // // //   useEffect(() => {
// // // //     function handleClickOutside(e: MouseEvent) {
// // // //       if (
// // // //         dropdownRef.current &&
// // // //         !dropdownRef.current.contains(e.target as Node)
// // // //       ) {
// // // //         setDropdownOpen(false);
// // // //       }
// // // //     }
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     function handleScroll() {
// // // //       setScrolled(window.scrollY > 10);
// // // //     }
// // // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   const navLinks = [
// // // //     { href: "/", label: "Home", icon: Home },
// // // //     { href: "/events", label: "Events", icon: Calendar },
// // // //     { href: "/about", label: "About", icon: Info },
// // // //     { href: "/contact", label: "Contact", icon: Mail },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       <style jsx global>{`
// // // //         .nav-link-light {
// // // //           position: relative;
// // // //         }
// // // //         .nav-link-light::after {
// // // //           content: "";
// // // //           position: absolute;
// // // //           bottom: 2px;
// // // //           left: 50%;
// // // //           transform: translateX(-50%);
// // // //           width: 0;
// // // //           height: 1.5px;
// // // //           background: #0f172a;
// // // //           border-radius: 99px;
// // // //           transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// // // //         }
// // // //         .nav-link-light:hover::after {
// // // //           width: 55%;
// // // //         }

// // // //         .register-btn-light {
// // // //           background: #0f172a;
// // // //           transition:
// // // //             transform 0.2s ease,
// // // //             box-shadow 0.25s ease,
// // // //             background 0.2s ease;
// // // //         }
// // // //         .register-btn-light:hover {
// // // //           background: #1e293b;
// // // //           transform: translateY(-1px);
// // // //           box-shadow: 0 8px 24px rgba(15, 23, 42, 0.22);
// // // //         }
// // // //         .register-btn-light:active {
// // // //           transform: translateY(0);
// // // //         }

// // // //         .login-btn-light {
// // // //           transition:
// // // //             color 0.2s ease,
// // // //             background 0.2s ease;
// // // //           color: #475569;
// // // //         }
// // // //         .login-btn-light:hover {
// // // //           color: #0f172a;
// // // //           background: #f1f5f9;
// // // //         }

// // // //         .user-btn-light {
// // // //           transition:
// // // //             border-color 0.25s ease,
// // // //             box-shadow 0.25s ease,
// // // //             background 0.25s ease;
// // // //         }
// // // //         .user-btn-light:hover {
// // // //           border-color: #cbd5e1;
// // // //           background: #f8fafc;
// // // //           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
// // // //         }

// // // //         .dropdown-item-light {
// // // //           transition:
// // // //             background 0.18s ease,
// // // //             color 0.18s ease,
// // // //             padding-left 0.2s ease;
// // // //         }
// // // //         .dropdown-item-light:hover {
// // // //           background: #f8fafc;
// // // //           color: #0f172a;
// // // //           padding-left: 22px;
// // // //         }

// // // //         .mobile-link-light {
// // // //           border-left: 2px solid transparent;
// // // //           transition:
// // // //             border-color 0.2s ease,
// // // //             background 0.2s ease,
// // // //             color 0.2s ease;
// // // //           color: #475569;
// // // //         }
// // // //         .mobile-link-light:hover {
// // // //           border-left-color: #0f172a;
// // // //           background: #f8fafc;
// // // //           color: #0f172a;
// // // //         }
// // // //         .mobile-link-light:hover .mob-icon {
// // // //           color: #0f172a;
// // // //           transform: translateX(2px);
// // // //         }
// // // //         .mob-icon {
// // // //           transition:
// // // //             color 0.2s ease,
// // // //             transform 0.2s ease;
// // // //           color: #94a3b8;
// // // //         }
// // // //       `}</style>

// // // //       <div
// // // //         className="fixed top-0 left-0 right-0 z-[100]"
// // // //         style={{
// // // //           background: scrolled
// // // //             ? "rgba(255,255,255,0.92)"
// // // //             : "rgba(255,255,255,1)",
// // // //           backdropFilter: scrolled ? "blur(16px)" : "none",
// // // //           borderBottom: scrolled
// // // //             ? "1px solid #e2e8f0"
// // // //             : "1px solid transparent",
// // // //           boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
// // // //           transition:
// // // //             "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
// // // //         }}
// // // //       >
// // // //         <div className="max-w-6xl mx-auto px-5">
// // // //           <div className="flex items-center justify-between h-[72px]">
// // // //             {/* Brand */}
// // // //             <Link
// // // //               href="/"
// // // //               className="flex items-center gap-2.5 group flex-shrink-0"
// // // //             >
// // // //               <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-200">
// // // //                 <GraduationCap className="w-5 h-5 text-white" />
// // // //               </div>
// // // //               <span className="text-lg font-black text-slate-900 tracking-tighter hidden sm:block">
// // // //                 NowOnCampus
// // // //               </span>
// // // //             </Link>

// // // //             {/* Desktop Center Links */}
// // // //             <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
// // // //               {navLinks.map((link) => (
// // // //                 <Link
// // // //                   key={link.href}
// // // //                   href={link.href}
// // // //                   className="nav-link-light px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200"
// // // //                 >
// // // //                   {link.label}
// // // //                 </Link>
// // // //               ))}
// // // //             </div>

// // // //             {/* Desktop Right */}
// // // //             <div className="hidden md:flex items-center gap-2">
// // // //               {status === "loading" ? (
// // // //                 <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
// // // //               ) : session ? (
// // // //                 <div className="relative" ref={dropdownRef}>
// // // //                   <button
// // // //                     onClick={() => setDropdownOpen(!dropdownOpen)}
// // // //                     className="user-btn-light flex items-center gap-2.5 p-1 pr-3.5 rounded-xl bg-white border border-slate-200"
// // // //                   >
// // // //                     {session.user?.image ? (
// // // //                       <img
// // // //                         src={session.user.image}
// // // //                         alt="avatar"
// // // //                         className="w-8 h-8 rounded-lg object-cover"
// // // //                       />
// // // //                     ) : (
// // // //                       <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
// // // //                         {session.user?.name?.charAt(0).toUpperCase()}
// // // //                       </div>
// // // //                     )}
// // // //                     <span className="text-sm font-semibold text-slate-700">
// // // //                       {session.user?.name?.split(" ")[0]}
// // // //                     </span>
// // // //                     <ChevronDown
// // // //                       className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
// // // //                     />
// // // //                   </button>

// // // //                   <AnimatePresence>
// // // //                     {dropdownOpen && (
// // // //                       <motion.div
// // // //                         initial={{ opacity: 0, y: 8, scale: 0.97 }}
// // // //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // //                         exit={{ opacity: 0, y: 8, scale: 0.97 }}
// // // //                         transition={{ duration: 0.16, ease: "easeOut" }}
// // // //                         className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden py-1.5"
// // // //                       >
// // // //                         <Link
// // // //                           href="/profile"
// // // //                           className="dropdown-item-light flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600"
// // // //                         >
// // // //                           <User className="w-4 h-4 text-slate-400" /> My Profile
// // // //                         </Link>
// // // //                         {isAdmin && (
// // // //                           <Link
// // // //                             href="/admin"
// // // //                             className="dropdown-item-light flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600"
// // // //                           >
// // // //                             <LayoutDashboard className="w-4 h-4 text-slate-400" />{" "}
// // // //                             Admin Dashboard
// // // //                           </Link>
// // // //                         )}
// // // //                         <div className="h-px bg-slate-100 my-1 mx-3" />
// // // //                         <button
// // // //                           onClick={() => signOut()}
// // // //                           className="dropdown-item-light w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
// // // //                         >
// // // //                           <LogOut className="w-4 h-4" /> Sign Out
// // // //                         </button>
// // // //                       </motion.div>
// // // //                     )}
// // // //                   </AnimatePresence>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div className="flex items-center gap-2">
// // // //                   <Link
// // // //                     href="/login"
// // // //                     className="login-btn-light px-5 py-2 text-sm font-semibold rounded-lg"
// // // //                   >
// // // //                     Login
// // // //                   </Link>
// // // //                   <Link
// // // //                     href="/register"
// // // //                     className="register-btn-light px-5 py-2.5 text-sm font-bold text-white rounded-lg flex items-center gap-2"
// // // //                   >
// // // //                     Register <Sparkles className="w-3.5 h-3.5" />
// // // //                   </Link>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Mobile Menu Button */}
// // // //             <button
// // // //               className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
// // // //               onClick={() => setMenuOpen(!menuOpen)}
// // // //             >
// // // //               <motion.div
// // // //                 animate={{ rotate: menuOpen ? 90 : 0 }}
// // // //                 transition={{ duration: 0.2 }}
// // // //               >
// // // //                 {menuOpen ? <X size={22} /> : <Menu size={22} />}
// // // //               </motion.div>
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Mobile Menu */}
// // // //         <AnimatePresence>
// // // //           {menuOpen && (
// // // //             <motion.div
// // // //               initial={{ height: 0, opacity: 0 }}
// // // //               animate={{ height: "auto", opacity: 1 }}
// // // //               exit={{ height: 0, opacity: 0 }}
// // // //               transition={{ duration: 0.22, ease: "easeInOut" }}
// // // //               className="md:hidden overflow-hidden border-t border-slate-100"
// // // //             >
// // // //               <div className="flex flex-col px-4 py-2 bg-white">
// // // //                 {navLinks.map((link, i) => (
// // // //                   <motion.div
// // // //                     key={link.href}
// // // //                     initial={{ opacity: 0, x: -8 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     transition={{ delay: i * 0.05, duration: 0.18 }}
// // // //                   >
// // // //                     <Link
// // // //                       href={link.href}
// // // //                       onClick={() => setMenuOpen(false)}
// // // //                       className="mobile-link-light flex items-center gap-4 px-4 py-3.5"
// // // //                     >
// // // //                       <link.icon className="mob-icon w-4 h-4" />
// // // //                       <span className="text-sm font-semibold">
// // // //                         {link.label}
// // // //                       </span>
// // // //                     </Link>
// // // //                   </motion.div>
// // // //                 ))}

// // // //                 {!session && (
// // // //                   <motion.div
// // // //                     initial={{ opacity: 0, y: 6 }}
// // // //                     animate={{ opacity: 1, y: 0 }}
// // // //                     transition={{ delay: 0.2, duration: 0.18 }}
// // // //                     className="flex gap-3 px-4 py-3 border-t border-slate-100 mt-1"
// // // //                   >
// // // //                     <Link
// // // //                       href="/login"
// // // //                       onClick={() => setMenuOpen(false)}
// // // //                       className="flex-1 py-2.5 text-center text-sm text-slate-600 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
// // // //                     >
// // // //                       Login
// // // //                     </Link>
// // // //                     <Link
// // // //                       href="/register"
// // // //                       onClick={() => setMenuOpen(false)}
// // // //                       className="register-btn-light flex-1 py-2.5 text-center text-sm text-white rounded-lg font-bold"
// // // //                     >
// // // //                       Sign Up
// // // //                     </Link>
// // // //                   </motion.div>
// // // //                 )}
// // // //               </div>
// // // //             </motion.div>
// // // //           )}
// // // //         </AnimatePresence>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }
// // // "use client";

// // // import Link from "next/link";
// // // import { useSession, signOut } from "next-auth/react";
// // // import { useState, useRef, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import {
// // //   Menu,
// // //   X,
// // //   GraduationCap,
// // //   ChevronDown,
// // //   LogOut,
// // //   User,
// // //   LayoutDashboard,
// // //   Home,
// // //   Calendar,
// // //   Info,
// // //   Mail,
// // //   Sparkles,
// // // } from "lucide-react";

// // // export function Navbar() {
// // //   const { data: session, status } = useSession();
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// // //   useEffect(() => {
// // //     function handleClickOutside(e: MouseEvent) {
// // //       if (
// // //         dropdownRef.current &&
// // //         !dropdownRef.current.contains(e.target as Node)
// // //       ) {
// // //         setDropdownOpen(false);
// // //       }
// // //     }
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     function handleScroll() {
// // //       setScrolled(window.scrollY > 10);
// // //     }
// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   const navLinks = [
// // //     { href: "/", label: "Home", icon: Home },
// // //     { href: "/events", label: "Events", icon: Calendar },
// // //     { href: "/about", label: "About", icon: Info },
// // //     { href: "/contact", label: "Contact", icon: Mail },
// // //   ];

// // //   return (
// // //     <>
// // //       <style jsx global>{`
// // //         .nav-link-pill {
// // //           position: relative;
// // //           transition:
// // //             color 0.2s ease,
// // //             background 0.2s ease;
// // //         }
// // //         .nav-link-pill:hover {
// // //           color: #fff;
// // //           background: rgba(255, 255, 255, 0.1);
// // //         }

// // //         .register-btn-dark {
// // //           background: #fff;
// // //           color: #0f172a;
// // //           transition:
// // //             transform 0.2s ease,
// // //             box-shadow 0.25s ease,
// // //             background 0.2s ease;
// // //         }
// // //         .register-btn-dark:hover {
// // //           background: #f1f5f9;
// // //           transform: translateY(-1px);
// // //           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
// // //         }
// // //         .register-btn-dark:active {
// // //           transform: translateY(0);
// // //         }

// // //         .login-btn-dark {
// // //           transition:
// // //             color 0.2s ease,
// // //             background 0.2s ease;
// // //           color: #94a3b8;
// // //         }
// // //         .login-btn-dark:hover {
// // //           color: #fff;
// // //           background: rgba(255, 255, 255, 0.08);
// // //         }

// // //         .user-btn-dark {
// // //           transition:
// // //             border-color 0.25s ease,
// // //             background 0.25s ease;
// // //         }
// // //         .user-btn-dark:hover {
// // //           border-color: rgba(255, 255, 255, 0.25);
// // //           background: rgba(255, 255, 255, 0.08);
// // //         }

// // //         .dropdown-item-dark {
// // //           transition:
// // //             background 0.18s ease,
// // //             color 0.18s ease,
// // //             padding-left 0.2s ease;
// // //         }
// // //         .dropdown-item-dark:hover {
// // //           background: rgba(255, 255, 255, 0.07);
// // //           color: #fff;
// // //           padding-left: 22px;
// // //         }

// // //         .mobile-link-dark {
// // //           border-left: 2px solid transparent;
// // //           transition:
// // //             border-color 0.2s ease,
// // //             background 0.2s ease,
// // //             color 0.2s ease;
// // //           color: #94a3b8;
// // //         }
// // //         .mobile-link-dark:hover {
// // //           border-left-color: #fff;
// // //           background: rgba(255, 255, 255, 0.05);
// // //           color: #fff;
// // //         }
// // //         .mobile-link-dark:hover .mob-icon-dark {
// // //           color: #fff;
// // //           transform: translateX(2px);
// // //         }
// // //         .mob-icon-dark {
// // //           transition:
// // //             color 0.2s ease,
// // //             transform 0.2s ease;
// // //           color: #475569;
// // //         }
// // //       `}</style>

// // //       {/* Floating pill wrapper */}
// // //       <div className="fixed top-5 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
// // //         <motion.nav
// // //           initial={{ y: -20, opacity: 0 }}
// // //           animate={{ y: 0, opacity: 1 }}
// // //           transition={{ duration: 0.4, ease: "easeOut" }}
// // //           className="pointer-events-auto w-full max-w-3xl"
// // //           style={{
// // //             background: scrolled
// // //               ? "rgba(10,12,18,0.92)"
// // //               : "rgba(10,12,18,0.85)",
// // //             backdropFilter: "blur(20px)",
// // //             border: "1px solid rgba(255,255,255,0.08)",
// // //             borderRadius: "9999px",
// // //             boxShadow: scrolled
// // //               ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
// // //               : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
// // //             transition: "box-shadow 0.3s ease, background 0.3s ease",
// // //             padding: "6px 8px",
// // //           }}
// // //         >
// // //           <div className="flex items-center justify-between gap-2 h-10">
// // //             {/* Brand */}
// // //             <Link
// // //               href="/"
// // //               className="flex items-center gap-2 group flex-shrink-0 pl-2"
// // //             >
// // //               <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-200">
// // //                 <GraduationCap className="w-4 h-4 text-slate-900" />
// // //               </div>
// // //               <span className="text-sm font-black text-white tracking-tight hidden sm:block pr-1">
// // //                 NowOnCampus
// // //               </span>
// // //             </Link>

// // //             {/* Center Links */}
// // //             <div className="hidden md:flex items-center gap-0.5">
// // //               {navLinks.map((link) => (
// // //                 <Link
// // //                   key={link.href}
// // //                   href={link.href}
// // //                   className="nav-link-pill px-4 py-1.5 text-sm font-semibold text-slate-400 rounded-full"
// // //                 >
// // //                   {link.label}
// // //                 </Link>
// // //               ))}
// // //             </div>

// // //             {/* Right */}
// // //             <div className="hidden md:flex items-center gap-1.5 pr-1">
// // //               {status === "loading" ? (
// // //                 <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />
// // //               ) : session ? (
// // //                 <div className="relative" ref={dropdownRef}>
// // //                   <button
// // //                     onClick={() => setDropdownOpen(!dropdownOpen)}
// // //                     className="user-btn-dark flex items-center gap-2 px-2 py-1 rounded-full border border-white/10"
// // //                   >
// // //                     {session.user?.image ? (
// // //                       <img
// // //                         src={session.user.image}
// // //                         alt="avatar"
// // //                         className="w-6 h-6 rounded-full object-cover"
// // //                       />
// // //                     ) : (
// // //                       <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-900 text-[10px] font-black">
// // //                         {session.user?.name?.charAt(0).toUpperCase()}
// // //                       </div>
// // //                     )}
// // //                     <span className="text-sm font-semibold text-slate-200">
// // //                       {session.user?.name?.split(" ")[0]}
// // //                     </span>
// // //                     <ChevronDown
// // //                       className={`w-3 h-3 text-slate-500 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
// // //                     />
// // //                   </button>

// // //                   <AnimatePresence>
// // //                     {dropdownOpen && (
// // //                       <motion.div
// // //                         initial={{ opacity: 0, y: 8, scale: 0.97 }}
// // //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// // //                         exit={{ opacity: 0, y: 8, scale: 0.97 }}
// // //                         transition={{ duration: 0.16, ease: "easeOut" }}
// // //                         className="absolute right-0 mt-3 w-52 rounded-2xl overflow-hidden py-1.5"
// // //                         style={{
// // //                           background: "rgba(10,12,18,0.97)",
// // //                           border: "1px solid rgba(255,255,255,0.09)",
// // //                           boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
// // //                           backdropFilter: "blur(20px)",
// // //                         }}
// // //                       >
// // //                         <Link
// // //                           href="/profile"
// // //                           className="dropdown-item-dark flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400"
// // //                         >
// // //                           <User className="w-4 h-4 text-slate-600" /> My Profile
// // //                         </Link>
// // //                         {isAdmin && (
// // //                           <Link
// // //                             href="/admin"
// // //                             className="dropdown-item-dark flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400"
// // //                           >
// // //                             <LayoutDashboard className="w-4 h-4 text-slate-600" />{" "}
// // //                             Admin Dashboard
// // //                           </Link>
// // //                         )}
// // //                         <div className="h-px bg-white/8 my-1 mx-3" />
// // //                         <button
// // //                           onClick={() => signOut()}
// // //                           className="dropdown-item-dark w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
// // //                         >
// // //                           <LogOut className="w-4 h-4" /> Sign Out
// // //                         </button>
// // //                       </motion.div>
// // //                     )}
// // //                   </AnimatePresence>
// // //                 </div>
// // //               ) : (
// // //                 <div className="flex items-center gap-1.5">
// // //                   <Link
// // //                     href="/login"
// // //                     className="login-btn-dark px-4 py-1.5 text-sm font-semibold rounded-full"
// // //                   >
// // //                     Login
// // //                   </Link>
// // //                   <Link
// // //                     href="/register"
// // //                     className="register-btn-dark px-4 py-1.5 text-sm font-bold rounded-full flex items-center gap-1.5"
// // //                   >
// // //                     Register <Sparkles className="w-3 h-3" />
// // //                   </Link>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Mobile toggle */}
// // //             <button
// // //               className="md:hidden mr-2 p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //             >
// // //               <motion.div
// // //                 animate={{ rotate: menuOpen ? 90 : 0 }}
// // //                 transition={{ duration: 0.2 }}
// // //               >
// // //                 {menuOpen ? <X size={18} /> : <Menu size={18} />}
// // //               </motion.div>
// // //             </button>
// // //           </div>

// // //           {/* Mobile Menu */}
// // //           <AnimatePresence>
// // //             {menuOpen && (
// // //               <motion.div
// // //                 initial={{ height: 0, opacity: 0 }}
// // //                 animate={{ height: "auto", opacity: 1 }}
// // //                 exit={{ height: 0, opacity: 0 }}
// // //                 transition={{ duration: 0.22, ease: "easeInOut" }}
// // //                 className="md:hidden overflow-hidden"
// // //               >
// // //                 <div
// // //                   className="flex flex-col mt-2 pt-2 pb-2"
// // //                   style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
// // //                 >
// // //                   {navLinks.map((link, i) => (
// // //                     <motion.div
// // //                       key={link.href}
// // //                       initial={{ opacity: 0, x: -8 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ delay: i * 0.05, duration: 0.18 }}
// // //                     >
// // //                       <Link
// // //                         href={link.href}
// // //                         onClick={() => setMenuOpen(false)}
// // //                         className="mobile-link-dark flex items-center gap-4 px-5 py-3"
// // //                       >
// // //                         <link.icon className="mob-icon-dark w-4 h-4" />
// // //                         <span className="text-sm font-semibold">
// // //                           {link.label}
// // //                         </span>
// // //                       </Link>
// // //                     </motion.div>
// // //                   ))}

// // //                   {!session && (
// // //                     <motion.div
// // //                       initial={{ opacity: 0, y: 6 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       transition={{ delay: 0.2, duration: 0.18 }}
// // //                       className="flex gap-3 px-5 pt-3 mt-1"
// // //                       style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
// // //                     >
// // //                       <Link
// // //                         href="/login"
// // //                         onClick={() => setMenuOpen(false)}
// // //                         className="flex-1 py-2.5 text-center text-sm text-slate-400 rounded-lg font-semibold hover:bg-white/5 hover:text-white transition-colors"
// // //                         style={{ border: "1px solid rgba(255,255,255,0.1)" }}
// // //                       >
// // //                         Login
// // //                       </Link>
// // //                       <Link
// // //                         href="/register"
// // //                         onClick={() => setMenuOpen(false)}
// // //                         className="register-btn-dark flex-1 py-2.5 text-center text-sm font-bold rounded-lg"
// // //                       >
// // //                         Sign Up
// // //                       </Link>
// // //                     </motion.div>
// // //                   )}
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </motion.nav>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";
// // import { useSession, signOut } from "next-auth/react";
// // import { useState, useRef, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   Menu,
// //   X,
// //   GraduationCap,
// //   ChevronDown,
// //   LogOut,
// //   User,
// //   LayoutDashboard,
// //   Home,
// //   Calendar,
// //   Info,
// //   Mail,
// // } from "lucide-react";

// // export function Navbar() {
// //   const { data: session, status } = useSession();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

// //   useEffect(() => {
// //     function handleClickOutside(e: MouseEvent) {
// //       if (
// //         dropdownRef.current &&
// //         !dropdownRef.current.contains(e.target as Node)
// //       ) {
// //         setDropdownOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     function handleScroll() {
// //       setScrolled(window.scrollY > 20);
// //     }
// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const navLinks = [
// //     { href: "/", label: "Home" },
// //     { href: "/events", label: "Events" },
// //     { href: "/about", label: "About" },
// //     { href: "/contact", label: "Contact" },
// //   ];

// //   return (
// //     <>
// //       <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
// //         <motion.nav
// //           initial={{ y: -20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           className="pointer-events-auto w-full max-w-4xl flex flex-col overflow-hidden"
// //           style={{
// //             background: scrolled
// //               ? "rgba(15, 23, 42, 0.9)"
// //               : "rgba(15, 23, 42, 0.8)",
// //             backdropFilter: "blur(16px)",
// //             border: "1px solid rgba(255, 255, 255, 0.1)",
// //             borderRadius: menuOpen ? "32px" : "999px",
// //             boxShadow: scrolled
// //               ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
// //               : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
// //             transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
// //           }}
// //         >
// //           <div className="flex items-center justify-between px-6 h-14">
// //             {/* --- Brand --- */}
// //             <Link
// //               href="/"
// //               className="flex items-center gap-2.5 group flex-shrink-0"
// //             >
// //               <motion.div
// //                 whileHover={{ rotate: 10, scale: 1.1 }}
// //                 className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-lg"
// //               >
// //                 <GraduationCap className="w-5 h-5 text-slate-900" />
// //               </motion.div>
// //               <span className="text-sm font-black text-white tracking-widest hidden sm:block uppercase">
// //                 NowOnCampus
// //               </span>
// //             </Link>

// //             {/* --- Desktop Links --- */}
// //             <div className="hidden md:flex items-center gap-2">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className="relative px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors group"
// //                 >
// //                   {link.label}
// //                   <motion.span
// //                     className="absolute inset-0 bg-white/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
// //                     layoutId="nav-glow"
// //                   />
// //                 </Link>
// //               ))}
// //             </div>

// //             {/* --- Right Actions --- */}
// //             <div className="hidden md:flex items-center gap-3">
// //               {status === "loading" ? (
// //                 <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
// //               ) : session ? (
// //                 <div className="relative" ref={dropdownRef}>
// //                   <motion.button
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     onClick={() => setDropdownOpen(!dropdownOpen)}
// //                     className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
// //                   >
// //                     {session.user?.image ? (
// //                       <img
// //                         src={session.user.image}
// //                         alt="avatar"
// //                         className="w-7 h-7 rounded-full"
// //                       />
// //                     ) : (
// //                       <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">
// //                         {session.user?.name?.charAt(0).toUpperCase()}
// //                       </div>
// //                     )}
// //                     <span className="text-xs font-bold text-slate-200">
// //                       {session.user?.name?.split(" ")[0]}
// //                     </span>
// //                     <ChevronDown
// //                       className={`w-3 h-3 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
// //                     />
// //                   </motion.button>

// //                   <AnimatePresence>
// //                     {dropdownOpen && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
// //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// //                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
// //                         className="absolute right-0 mt-3 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
// //                       >
// //                         <Link
// //                           href="/profile"
// //                           className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
// //                         >
// //                           <User size={16} /> Profile
// //                         </Link>
// //                         {isAdmin && (
// //                           <Link
// //                             href="/admin"
// //                             className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
// //                           >
// //                             <LayoutDashboard size={16} /> Admin
// //                           </Link>
// //                         )}
// //                         <button
// //                           onClick={() => signOut()}
// //                           className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
// //                         >
// //                           <LogOut size={16} /> Sign Out
// //                         </button>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               ) : (
// //                 <div className="flex items-center gap-2">
// //                   <Link
// //                     href="/login"
// //                     className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-all"
// //                   >
// //                     Login
// //                   </Link>
// //                   <motion.div
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <Link
// //                       href="/register"
// //                       className="px-5 py-2 text-xs font-black text-slate-900 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all"
// //                     >
// //                       REGISTER
// //                     </Link>
// //                   </motion.div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* --- Mobile Menu Toggle --- */}
// //             <button
// //               className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
// //               onClick={() => setMenuOpen(!menuOpen)}
// //             >
// //               {menuOpen ? <X size={20} /> : <Menu size={20} />}
// //             </button>
// //           </div>

// //           {/* --- Mobile Navigation --- */}
// //           <AnimatePresence>
// //             {menuOpen && (
// //               <motion.div
// //                 initial={{ height: 0, opacity: 0 }}
// //                 animate={{ height: "auto", opacity: 1 }}
// //                 exit={{ height: 0, opacity: 0 }}
// //                 className="md:hidden border-t border-white/5"
// //               >
// //                 <div className="flex flex-col p-4 gap-1">
// //                   {navLinks.map((link) => (
// //                     <Link
// //                       key={link.href}
// //                       href={link.href}
// //                       onClick={() => setMenuOpen(false)}
// //                       className="px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5 rounded-xl transition-all"
// //                     >
// //                       {link.label}
// //                     </Link>
// //                   ))}
// //                   {!session && (
// //                     <div className="flex gap-2 mt-2 pt-4 border-t border-white/5">
// //                       <Link
// //                         href="/login"
// //                         className="flex-1 py-3 text-center text-xs font-bold text-white bg-white/5 rounded-xl"
// //                       >
// //                         LOGIN
// //                       </Link>
// //                       <Link
// //                         href="/register"
// //                         className="flex-1 py-3 text-center text-xs font-black text-slate-900 bg-white rounded-xl"
// //                       >
// //                         REGISTER
// //                       </Link>
// //                     </div>
// //                   )}
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </motion.nav>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu, X, GraduationCap, ChevronDown,
//   LogOut, User, LayoutDashboard, Home, Calendar, Info, Mail
// } from "lucide-react";

// export function Navbar() {
//   const { data: session, status } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     function handleScroll() {
//       setScrolled(window.scrollY > 20);
//     }
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/events", label: "Events" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];

//   return (
//     <>
//       {/* Container ab top-0 par hai aur full width hai */}
//       <div className="fixed top-0 left-0 right-0 z-[100] w-full pointer-events-none">
//         <motion.nav
//           initial={{ y: -50 }}
//           animate={{ y: 0 }}
//           className="pointer-events-auto w-full flex flex-col overflow-hidden"
//           style={{
//             // Scrolled hone par border-bottom aayega
//             background: scrolled ? "rgba(15, 23, 42, 0.95)" : "rgba(15, 23, 42, 0.85)",
//             backdropFilter: "blur(16px)",
//             borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between px-6 md:px-12 h-16">

//             {/* --- Brand --- */}
//             <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
//               <motion.div
//                 whileHover={{ rotate: 10, scale: 1.1 }}
//                 className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg"
//               >
//                 <GraduationCap className="w-5 h-5 text-slate-900" />
//               </motion.div>
//               <span className="text-base font-black text-white tracking-widest hidden sm:block uppercase">
//                 NowOnCampus
//               </span>
//             </Link>

//             {/* --- Desktop Links --- */}
//             <div className="hidden md:flex items-center gap-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="relative px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors group uppercase tracking-wider"
//                 >
//                   {link.label}
//                   <motion.span
//                     className="absolute bottom-0 left-4 right-4 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
//                   />
//                 </Link>
//               ))}
//             </div>

//             {/* --- Right Actions --- */}
//             <div className="hidden md:flex items-center gap-4">
//               {status === "loading" ? (
//                 <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
//               ) : session ? (
//                 <div className="relative" ref={dropdownRef}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
//                   >
//                     {session.user?.image ? (
//                       <img src={session.user.image} alt="avatar" className="w-7 h-7 rounded-full" />
//                     ) : (
//                       <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">
//                         {session.user?.name?.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                     <span className="text-xs font-bold text-slate-200">{session.user?.name?.split(" ")[0]}</span>
//                     <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
//                   </motion.button>

//                   <AnimatePresence>
//                     {dropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute right-0 mt-3 w-52 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
//                       >
//                         <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">
//                           <User size={16} /> Profile
//                         </Link>
//                         {isAdmin && (
//                           <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">
//                             <LayoutDashboard size={16} /> Admin Panel
//                           </Link>
//                         )}
//                         <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all">
//                           <LogOut size={16} /> Sign Out
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-4">
//                   <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white transition-all uppercase tracking-widest">
//                     Login
//                   </Link>
//                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                     <Link
//                       href="/register"
//                       className="px-6 py-2.5 text-xs font-black text-slate-900 bg-white rounded-md hover:bg-slate-100 transition-all shadow-lg"
//                     >
//                       REGISTER
//                     </Link>
//                   </motion.div>
//                 </div>
//               )}
//             </div>

//             {/* --- Mobile Menu Toggle --- */}
//             <button
//               className="md:hidden p-2 text-slate-300"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* --- Mobile Navigation --- */}
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 initial={{ height: 0 }}
//                 animate={{ height: "auto" }}
//                 exit={{ height: 0 }}
//                 className="md:hidden bg-slate-900 border-t border-white/5"
//               >
//                 <div className="flex flex-col p-6 gap-2">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setMenuOpen(false)}
//                       className="text-lg font-bold text-slate-300 py-3 border-b border-white/5"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                   {!session && (
//                     <div className="flex flex-col gap-3 mt-4">
//                       <Link href="/login" className="w-full py-4 text-center font-bold text-white bg-white/5 rounded-lg">
//                         LOGIN
//                       </Link>
//                       <Link href="/register" className="w-full py-4 text-center font-black text-slate-900 bg-white rounded-lg">
//                         REGISTER
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.nav>
//       </div>
//     </>
//   );
// }
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
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
  Info,
  Mail,
  Zap,
  ArrowRight,
  Send,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Zap },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  // close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="fixed top-3 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto w-full max-w-4xl"
        style={{
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          /* ← pill on desktop, rectangle on mobile handled below */
          borderRadius: menuOpen ? "1.5rem" : "9999px",
          transition: "border-radius 0.3s ease",
          overflow: menuOpen ? "hidden" : "visible",
        }}
      >
        {/* ── TOP ROW ── */}
        <div className="flex items-center justify-between px-5 h-14">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "#f97316", transition: "transform 0.25s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "rotate(12deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "rotate(0deg)")
              }
            >
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-sm font-black text-white tracking-widest hidden sm:block uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              NowOnCampus
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className="relative px-4 py-1.5 text-[11px] font-black uppercase tracking-wider transition-colors"
                  style={{
                    color: active ? "#f97316" : "rgba(255,255,255,0.65)",
                  }}
                >
                  {link.label}
                  {/* active dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#f97316" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {/* hover underline */}
                  {hoveredLink === link.href && !active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.3)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div
                className="w-8 h-8 rounded-full animate-pulse"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {session.user?.image && !imgError ? (
                    <img
                      src={session.user.image}
                      alt="avatar"
                      className="w-7 h-7 rounded-full"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black"
                      style={{ background: "#f97316" }}
                    >
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <ChevronDown
                    className="w-3 h-3 transition-transform"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-48 py-2 overflow-hidden"
                      style={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: "1.25rem",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                      }}
                    >
                      {/* user info */}
                      <div
                        className="px-4 pb-2 mb-1"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <p className="text-xs font-black text-white truncate">
                          {session.user?.name}
                        </p>
                        <p
                          className="text-[10px] truncate"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold transition-colors"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(255,255,255,0.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <User size={13} /> Profile
                      </Link>
                      {!isAdmin && (
                        <Link
                          href="/request-event"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm font-semibold transition-colors"
                          style={{ color: "rgba(249,115,22,0.90)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(249,115,22,0.08)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <Send size={13} /> Request Event
                        </Link>
                      )}
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm font-semibold transition-colors"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(255,255,255,0.06)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <LayoutDashboard size={13} /> Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold transition-colors"
                        style={{ color: "#f87171" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(239,68,68,0.08)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <LogOut size={13} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-[11px] font-black uppercase tracking-wider transition-colors"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full transition-all"
                  style={{
                    background: "#f97316",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
            style={{
              background: menuOpen
                ? "rgba(249,115,22,0.15)"
                : "rgba(255,255,255,0.06)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X
                    size={18}
                    color={menuOpen ? "#f97316" : "rgba(255,255,255,0.7)"}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} color="rgba(255,255,255,0.7)" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              {/* divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                  margin: "0 1.25rem",
                }}
              />

              <div style={{ padding: "1rem 1rem 0.75rem" }}>
                {/* Nav links */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginBottom: "1rem",
                  }}
                >
                  {NAV_LINKS.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                          style={{
                            background: active
                              ? "rgba(249,115,22,0.12)"
                              : "transparent",
                            border: active
                              ? "1px solid rgba(249,115,22,0.25)"
                              : "1px solid transparent",
                            color: active
                              ? "#f97316"
                              : "rgba(255,255,255,0.70)",
                            textDecoration: "none",
                          }}
                        >
                          <span
                            className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                            style={{
                              background: active
                                ? "rgba(249,115,22,0.18)"
                                : "rgba(255,255,255,0.06)",
                            }}
                          >
                            <link.icon
                              size={13}
                              color={
                                active ? "#f97316" : "rgba(255,255,255,0.5)"
                              }
                            />
                          </span>
                          <span
                            style={{
                              fontSize: "0.8125rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {link.label}
                          </span>
                          {active && (
                            <span
                              className="ml-auto flex items-center gap-1"
                              style={{
                                fontSize: "9px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                color: "#f97316",
                              }}
                            >
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  background: "#f97316",
                                  display: "inline-block",
                                }}
                              />
                              Active
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.07)",
                    marginBottom: "1rem",
                  }}
                />

                {/* User section */}
                {status === "loading" ? null : session ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {/* user info chip */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {session.user?.image && !imgError ? (
                        <img
                          src={session.user.image}
                          alt="avatar"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            background: "#f97316",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 800,
                            color: "#fff",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {session.user?.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.6875rem",
                            color: "rgba(255,255,255,0.4)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                      style={{
                        color: "rgba(255,255,255,0.70)",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <User size={13} color="rgba(255,255,255,0.5)" />
                      </span>
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Profile
                      </span>
                    </Link>

                    {!isAdmin && (
                      <Link
                        href="/request-event"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                        style={{
                          color: "#f97316",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(249,115,22,0.12)" }}
                        >
                          <Send size={13} color="#f97316" />
                        </span>
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Request Event
                        </span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                        style={{
                          color: "rgba(255,255,255,0.70)",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <LayoutDashboard
                            size={13}
                            color="rgba(255,255,255,0.5)"
                          />
                        </span>
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Admin
                        </span>
                      </Link>
                    )}

                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors w-full text-left"
                      style={{
                        color: "#f87171",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(239,68,68,0.08)" }}
                      >
                        <LogOut size={13} color="#f87171" />
                      </span>
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Sign Out
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem",
                      paddingBottom: "0.25rem",
                    }}
                  >
                    <Link
                      href="/login"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "11px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "11px",
                        borderRadius: "12px",
                        background: "#f97316",
                        border: "1px solid transparent",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                      }}
                    >
                      Register
                      <ArrowRight size={13} />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}