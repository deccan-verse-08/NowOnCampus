"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
            } else {
                setSuccess(true);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Top accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

                    <div className="p-8">
                        {/* Logo */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg mb-4">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">Forgot Password?</h1>
                            <p className="text-slate-500 text-sm mt-1 text-center">
                                Enter your email and we&apos;ll send you a reset link
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center py-4">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 mb-2">Check your inbox!</h2>
                                <p className="text-slate-500 text-sm mb-6">
                                    If <strong>{email}</strong> is registered, you&apos;ll receive a password reset link shortly.
                                    The link expires in <strong>1 hour</strong>.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@college.edu"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-200 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending link...</>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>

                                <div className="text-center">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
