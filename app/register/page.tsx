"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const passwordStrength = () => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-500", "bg-green-500"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed. Please try again.");
            } else {
                setSuccess("Account created! Signing you in...");
                await signIn("credentials", { email, password, redirect: false });
                router.push("/");
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/" });
    };

    const ps = passwordStrength();

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                        <p className="text-slate-500 text-sm mt-1">Join NowOnCampus and never miss an event</p>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 mb-6 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                    >
                        {googleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        {googleLoading ? "Signing up..." : "Continue with Google"}
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 font-medium">or register with email</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@college.edu"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {/* Password Strength */}
                            {password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= ps ? strengthColor[ps] : "bg-slate-200"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500">Strength: <span className="font-medium">{strengthLabel[ps]}</span></p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat your password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {confirmPassword && (
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                        {password === confirmPassword
                                            ? <CheckCircle className="w-4 h-4 text-green-500" />
                                            : <AlertCircle className="w-4 h-4 text-red-400" />
                                        }
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed mt-2 shadow-md hover:shadow-blue-200"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
