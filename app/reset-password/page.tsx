"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!token) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Invalid Link</h2>
                <p className="text-slate-500 text-sm mb-6">This password reset link is invalid or has expired.</p>
                <Link href="/forgot-password" className="text-sm text-blue-600 font-semibold hover:underline">
                    Request a new link →
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Password Updated!</h2>
                <p className="text-slate-500 text-sm">Redirecting you to sign in...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        required
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Re-enter your new password"
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${confirm && password !== confirm ? "border-red-300 bg-red-50" : "border-slate-200"
                            }`}
                    />
                </div>
                {confirm && password !== confirm && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || (!!confirm && password !== confirm)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-200 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
                ) : (
                    "Update Password"
                )}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    <div className="p-8">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg mb-4">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">Set New Password</h1>
                            <p className="text-slate-500 text-sm mt-1 text-center">
                                Choose a strong password for your account
                            </p>
                        </div>
                        <Suspense fallback={<div className="text-center text-slate-400 text-sm py-8">Loading...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
