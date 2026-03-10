"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { signIn as signInWebAuthn } from "next-auth/webauthn";
import { useRouter } from "next/navigation";
import {
    GraduationCap, Mail, Lock, Eye, EyeOff,
    AlertCircle, Loader2, ShieldCheck, ArrowLeft,
} from "lucide-react";

type Step = "credentials" | "otp";

export default function LoginPage() {
    const router = useRouter();

    // Step 1 fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Step 2 fields
    const [otp, setOtp] = useState("");

    const [step, setStep] = useState<Step>("credentials");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [passkeyLoading, setPasskeyLoading] = useState(false);

    // ── Step 1: validate credentials → send OTP ───────────────────────────────
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Invalid credentials.");
            } else {
                setStep("otp");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: verify OTP → sign in ──────────────────────────────────────────
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (otp.length !== 6) { setError("Please enter the 6-digit OTP."); return; }
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email,
                otp,
                redirect: false,
            });
            if (result?.error) {
                setError("Invalid or expired OTP. Please try again.");
            } else {
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

    const handlePasskeySignIn = async () => {
        setPasskeyLoading(true);
        setError("");
        try {
            await signInWebAuthn("passkey", { action: "authenticate", callbackUrl: "/" });
        } catch (error: any) {
            if (error?.name === "NotAllowedError" || error?.message?.includes("not allowed")) {
                setError("Passkey sign in was cancelled.");
            } else {
                setError("Failed to sign in with Passkey. Please try again.");
            }
        } finally {
            setPasskeyLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Step indicator bar */}
                    <div className="flex">
                        <div className={`h-1 flex-1 transition-colors duration-500 ${step === "credentials" ? "bg-blue-600" : "bg-blue-200"}`} />
                        <div className={`h-1 flex-1 transition-colors duration-500 ${step === "otp" ? "bg-blue-600" : "bg-blue-100"}`} />
                    </div>

                    <div className="p-8">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-500 ${step === "otp"
                                    ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-200"
                                    : "bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-200"
                                }`}>
                                {step === "otp"
                                    ? <ShieldCheck className="w-8 h-8 text-white" />
                                    : <GraduationCap className="w-8 h-8 text-white" />
                                }
                            </div>
                            {step === "credentials" ? (
                                <>
                                    <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
                                    <p className="text-slate-500 text-sm mt-1">Sign in to your NowOnCampus account</p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
                                    <p className="text-slate-500 text-sm mt-1">
                                        We sent a 6-digit OTP to<br />
                                        <span className="font-semibold text-blue-600">{email}</span>
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                            </div>
                        )}

                        {/* ── STEP 1 ── */}
                        {step === "credentials" && (
                            <>
                                {/* Google */}
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
                                    {googleLoading ? "Signing in..." : "Continue with Google"}
                                </button>

                                {/* Passkey */}
                                <button
                                    type="button"
                                    onClick={handlePasskeySignIn}
                                    disabled={passkeyLoading || googleLoading}
                                    className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 mb-6 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {passkeyLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                    ) : (
                                        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                        </svg>
                                    )}
                                    {passkeyLoading ? "Authenticating..." : "Sign in with Passkey"}
                                </button>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex-1 h-px bg-slate-200" />
                                    <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
                                    <div className="flex-1 h-px bg-slate-200" />
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-4">
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
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Password</label>
                                            <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                required
                                                className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed mt-2 shadow-md hover:shadow-blue-200"
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP...</>
                                        ) : (
                                            "Send OTP →"
                                        )}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-slate-500 mt-6">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-800">Create one free →</Link>
                                </p>
                            </>
                        )}

                        {/* ── STEP 2: OTP ── */}
                        {step === "otp" && (
                            <form onSubmit={handleVerifyOtp} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
                                        Enter the 6-digit code
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000000"
                                        autoFocus
                                        className="w-full text-center text-3xl font-bold tracking-[0.5em] py-4 border-2 border-slate-200 focus:border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                                    />
                                    <p className="text-xs text-slate-400 text-center mt-2">Code expires in 10 minutes</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow-md"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                                    ) : (
                                        <><ShieldCheck className="w-4 h-4" /> Verify & Sign In</>
                                    )}
                                </button>

                                <div className="text-center space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => { setStep("credentials"); setOtp(""); setError(""); }}
                                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" /> Use different email
                                    </button>
                                    <br />
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="text-xs text-blue-600 hover:underline disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
