"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
    Menu, X, GraduationCap, ChevronDown,
    LogOut, User, LayoutDashboard, Home, Calendar, Info, Mail,
} from "lucide-react";

export function Navbar() {
    const { data: session, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/events", label: "Events", icon: Calendar },
        { href: "/about", label: "About Us", icon: Info },
        { href: "/contact", label: "Contact Us", icon: Mail },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow duration-300">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                            NowOnCampus
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {status === "loading" ? (
                            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                        ) : session ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
                                >
                                    {session.user?.image ? (
                                        <img
                                            src={session.user.image}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                            {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                                        {session.user?.name?.split(" ")[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                                        <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
                                            <p className="text-xs text-slate-500">Signed in as</p>
                                            <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                            >
                                                <User className="w-4 h-4" /> My Profile
                                            </Link>
                                            {isAdmin && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" /> Admin Panel
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => { signOut(); setDropdownOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-blue-200 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile: show avatar or hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        {status !== "loading" && session && (
                            <div className="flex items-center gap-2">
                                {session.user?.image ? (
                                    <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {menuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    {/* User info banner (if logged in) */}
                    {session && (
                        <div className="px-4 py-3 bg-blue-50 border-b border-slate-100">
                            <p className="text-xs text-slate-500">Signed in as</p>
                            <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.email}</p>
                        </div>
                    )}

                    {/* Nav Links */}
                    <div className="px-4 py-3 space-y-0.5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                                <link.icon className="w-4 h-4 text-slate-400" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-1.5">
                        {session ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    <User className="w-4 h-4" /> My Profile
                                </Link>
                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4" /> Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => { signOut(); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 pt-1">
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2.5 text-center text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
