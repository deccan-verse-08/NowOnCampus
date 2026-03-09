import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    const eventCategories = [
        { label: "Formal Events", href: "/events?category=FORMAL" },
        { label: "Informal Events", href: "/events?category=INFORMAL" },
        { label: "Hackathons", href: "/events?category=HACKATHON" },
        { label: "Cultural Events", href: "/events?category=CULTURAL" },
        { label: "Sports Events", href: "/events?category=SPORTS" },
        { label: "Workshops", href: "/events?category=WORKSHOP" },
        { label: "Technical Events", href: "/events?category=TECHNICAL" },
        { label: "Literary Events", href: "/events?category=LITERARY" },
    ];

    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "All Events", href: "/events" },
        { label: "Register", href: "/register" },
        { label: "Sign In", href: "/login" },
    ];

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">NowOnCampus</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your one-stop platform to discover and participate in all college events — from hackathons to cultural fests.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Event Categories */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Event Categories</h3>
                        <ul className="space-y-2.5">
                            {eventCategories.map((cat) => (
                                <li key={cat.href}>
                                    <Link href={cat.href} className="text-slate-400 text-sm hover:text-blue-400 transition-colors duration-200">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-slate-400 text-sm hover:text-blue-400 transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Mail className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                                <span>support@nowoncampus.in</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Phone className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                                <span>Campus Central, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} NowOnCampus. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-slate-500 text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 text-sm hover:text-blue-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
