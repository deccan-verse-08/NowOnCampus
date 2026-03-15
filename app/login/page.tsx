// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { signIn } from "next-auth/react";
// // import { signIn as signInWebAuthn } from "next-auth/webauthn";
// // import { useRouter } from "next/navigation";
// // import {
// //     GraduationCap, Mail, Lock, Eye, EyeOff,
// //     AlertCircle, Loader2, ShieldCheck, ArrowLeft,
// // } from "lucide-react";

// // type Step = "credentials" | "otp";

// // export default function LoginPage() {
// //     const router = useRouter();

// //     // Step 1 fields
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [showPassword, setShowPassword] = useState(false);

// //     // Step 2 fields
// //     const [otp, setOtp] = useState("");

// //     const [step, setStep] = useState<Step>("credentials");
// //     const [error, setError] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [googleLoading, setGoogleLoading] = useState(false);
// //     const [passkeyLoading, setPasskeyLoading] = useState(false);

// //     // ── Step 1: validate credentials → send OTP ───────────────────────────────
// //     const handleSendOtp = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setError("");
// //         setLoading(true);
// //         try {
// //             const res = await fetch("/api/auth/send-otp", {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify({ email, password }),
// //             });
// //             const data = await res.json();
// //             if (!res.ok) {
// //                 setError(data.error || "Invalid credentials.");
// //             } else {
// //                 setStep("otp");
// //             }
// //         } catch {
// //             setError("Something went wrong. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // ── Step 2: verify OTP → sign in ──────────────────────────────────────────
// //     const handleVerifyOtp = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setError("");
// //         if (otp.length !== 6) { setError("Please enter the 6-digit OTP."); return; }
// //         setLoading(true);
// //         try {
// //             const result = await signIn("credentials", {
// //                 email,
// //                 otp,
// //                 redirect: false,
// //             });
// //             if (result?.error) {
// //                 setError("Invalid or expired OTP. Please try again.");
// //             } else {
// //                 router.push("/");
// //                 router.refresh();
// //             }
// //         } catch {
// //             setError("Something went wrong. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleGoogleSignIn = async () => {
// //         setGoogleLoading(true);
// //         await signIn("google", { callbackUrl: "/" });
// //     };

// //     const handlePasskeySignIn = async () => {
// //         setPasskeyLoading(true);
// //         setError("");
// //         try {
// //             await signInWebAuthn("passkey", { action: "authenticate", callbackUrl: "/" });
// //         } catch (error: any) {
// //             if (error?.name === "NotAllowedError" || error?.message?.includes("not allowed")) {
// //                 setError("Passkey sign in was cancelled.");
// //             } else {
// //                 setError("Failed to sign in with Passkey. Please try again.");
// //             }
// //         } finally {
// //             setPasskeyLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
// //             <div className="w-full max-w-md">
// //                 <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
// //                     {/* Step indicator bar */}
// //                     <div className="flex">
// //                         <div className={`h-1 flex-1 transition-colors duration-500 ${step === "credentials" ? "bg-blue-600" : "bg-blue-200"}`} />
// //                         <div className={`h-1 flex-1 transition-colors duration-500 ${step === "otp" ? "bg-blue-600" : "bg-blue-100"}`} />
// //                     </div>

// //                     <div className="p-8">
// //                         {/* Logo */}
// //                         <div className="text-center mb-8">
// //                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-500 ${step === "otp"
// //                                     ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-200"
// //                                     : "bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-200"
// //                                 }`}>
// //                                 {step === "otp"
// //                                     ? <ShieldCheck className="w-8 h-8 text-white" />
// //                                     : <GraduationCap className="w-8 h-8 text-white" />
// //                                 }
// //                             </div>
// //                             {step === "credentials" ? (
// //                                 <>
// //                                     <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
// //                                     <p className="text-slate-500 text-sm mt-1">Sign in to your NowOnCampus account</p>
// //                                 </>
// //                             ) : (
// //                                 <>
// //                                     <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
// //                                     <p className="text-slate-500 text-sm mt-1">
// //                                         We sent a 6-digit OTP to<br />
// //                                         <span className="font-semibold text-blue-600">{email}</span>
// //                                     </p>
// //                                 </>
// //                             )}
// //                         </div>

// //                         {/* Error */}
// //                         {error && (
// //                             <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
// //                                 <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
// //                             </div>
// //                         )}

// //                         {/* ── STEP 1 ── */}
// //                         {step === "credentials" && (
// //                             <>
// //                                 {/* Google */}
// //                                 <button
// //                                     type="button"
// //                                     onClick={handleGoogleSignIn}
// //                                     disabled={googleLoading}
// //                                     className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 mb-6 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
// //                                 >
// //                                     {googleLoading ? (
// //                                         <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
// //                                     ) : (
// //                                         <svg className="w-5 h-5" viewBox="0 0 24 24">
// //                                             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
// //                                             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
// //                                             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
// //                                             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
// //                                         </svg>
// //                                     )}
// //                                     {googleLoading ? "Signing in..." : "Continue with Google"}
// //                                 </button>

// //                                 {/* Passkey */}
// //                                 <button
// //                                     type="button"
// //                                     onClick={handlePasskeySignIn}
// //                                     disabled={passkeyLoading || googleLoading}
// //                                     className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 mb-6 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
// //                                 >
// //                                     {passkeyLoading ? (
// //                                         <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
// //                                     ) : (
// //                                         <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
// //                                         </svg>
// //                                     )}
// //                                     {passkeyLoading ? "Authenticating..." : "Sign in with Passkey"}
// //                                 </button>

// //                                 <div className="flex items-center gap-3 mb-6">
// //                                     <div className="flex-1 h-px bg-slate-200" />
// //                                     <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
// //                                     <div className="flex-1 h-px bg-slate-200" />
// //                                 </div>

// //                                 <form onSubmit={handleSendOtp} className="space-y-4">
// //                                     <div>
// //                                         <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
// //                                         <div className="relative">
// //                                             <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                                             <input
// //                                                 type="email"
// //                                                 value={email}
// //                                                 onChange={(e) => setEmail(e.target.value)}
// //                                                 placeholder="you@college.edu"
// //                                                 required
// //                                                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                                             />
// //                                         </div>
// //                                     </div>

// //                                     <div>
// //                                         <div className="flex items-center justify-between mb-1.5">
// //                                             <label className="block text-sm font-medium text-slate-700">Password</label>
// //                                             <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
// //                                                 Forgot password?
// //                                             </Link>
// //                                         </div>
// //                                         <div className="relative">
// //                                             <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                                             <input
// //                                                 type={showPassword ? "text" : "password"}
// //                                                 value={password}
// //                                                 onChange={(e) => setPassword(e.target.value)}
// //                                                 placeholder="Enter your password"
// //                                                 required
// //                                                 className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                                             />
// //                                             <button
// //                                                 type="button"
// //                                                 onClick={() => setShowPassword(!showPassword)}
// //                                                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
// //                                             >
// //                                                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                                             </button>
// //                                         </div>
// //                                     </div>

// //                                     <button
// //                                         type="submit"
// //                                         disabled={loading}
// //                                         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed mt-2 shadow-md hover:shadow-blue-200"
// //                                     >
// //                                         {loading ? (
// //                                             <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP...</>
// //                                         ) : (
// //                                             "Send OTP →"
// //                                         )}
// //                                     </button>
// //                                 </form>

// //                                 <p className="text-center text-sm text-slate-500 mt-6">
// //                                     Don&apos;t have an account?{" "}
// //                                     <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-800">Create one free →</Link>
// //                                 </p>
// //                             </>
// //                         )}

// //                         {/* ── STEP 2: OTP ── */}
// //                         {step === "otp" && (
// //                             <form onSubmit={handleVerifyOtp} className="space-y-5">
// //                                 <div>
// //                                     <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
// //                                         Enter the 6-digit code
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         inputMode="numeric"
// //                                         maxLength={6}
// //                                         value={otp}
// //                                         onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
// //                                         placeholder="000000"
// //                                         autoFocus
// //                                         className="w-full text-center text-3xl font-bold tracking-[0.5em] py-4 border-2 border-slate-200 focus:border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
// //                                     />
// //                                     <p className="text-xs text-slate-400 text-center mt-2">Code expires in 10 minutes</p>
// //                                 </div>

// //                                 <button
// //                                     type="submit"
// //                                     disabled={loading || otp.length !== 6}
// //                                     className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow-md"
// //                                 >
// //                                     {loading ? (
// //                                         <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
// //                                     ) : (
// //                                         <><ShieldCheck className="w-4 h-4" /> Verify & Sign In</>
// //                                     )}
// //                                 </button>

// //                                 <div className="text-center space-y-2">
// //                                     <button
// //                                         type="button"
// //                                         onClick={() => { setStep("credentials"); setOtp(""); setError(""); }}
// //                                         className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
// //                                     >
// //                                         <ArrowLeft className="w-3.5 h-3.5" /> Use different email
// //                                     </button>
// //                                     <br />
// //                                     <button
// //                                         type="button"
// //                                         onClick={handleSendOtp}
// //                                         disabled={loading}
// //                                         className="text-xs text-blue-600 hover:underline disabled:opacity-50"
// //                                     >
// //                                         Resend OTP
// //                                     </button>
// //                                 </div>
// //                             </form>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence, easeInOut } from "framer-motion";
// import {
//   GraduationCap,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   Loader2,
//   ShieldCheck,
//   User,
//   ChevronLeft,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";
// import Link from "next/link";

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.5, ease: easeInOut, staggerChildren: 0.1 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState<"credentials" | "otp">("credentials");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   // Register panel
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [rName, setRName] = useState("");
//   const [rEmail, setREmail] = useState("");
//   const [rPassword, setRPassword] = useState("");
//   const [rShowPw, setRShowPw] = useState(false);
//   const [rLoading, setRLoading] = useState(false);
//   const [rError, setRError] = useState("");

//   // Functions (Logic remain same as provided)
//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) setError(data.error || "Invalid credentials.");
//       else setStep("otp");
//     } catch {
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (otp.length !== 6) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await signIn("credentials", {
//         email,
//         otp,
//         redirect: false,
//       });
//       if (result?.error) setError("Invalid or expired OTP.");
//       else {
//         router.push("/");
//         router.refresh();
//       }
//     } catch {
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setRError("");
//     setRLoading(true);
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: rName,
//           email: rEmail,
//           password: rPassword,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) setRError(data.error || "Registration failed.");
//       else {
//         setPanelOpen(false);
//         setEmail(rEmail);
//       }
//     } catch {
//       setRError("Something went wrong.");
//     } finally {
//       setRLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 p-4">
//       {/* Background Animated Blobs */}
//       <div className="absolute inset-0 z-0">
//         <motion.div
//           animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-[100px]"
//         />
//         <motion.div
//           animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-blue-200/30 blur-[100px]"
//         />
//       </div>

//       {/* Main Card */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="relative z-10 bg-white shadow-[0_32px_120px_-20px_rgba(0,0,0,0.15)] w-full max-w-[900px] h-full min-h-[580px] rounded-[2.5rem] flex overflow-hidden border border-slate-100"
//       >
//         {/* Left Side: Brand Identity */}
//         <div className="hidden md:flex w-[320px] bg-slate-950 p-10 flex-col justify-between relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-blue-600/10 z-0" />

//           <div className="relative z-10">
//             <Link href="/" className="flex items-center gap-3 mb-12 group">
//               <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
//                 <GraduationCap className="text-white w-6 h-6" />
//               </div>
//               <span className="text-white font-black text-xl tracking-wider">
//                 NOWONCAMPUS
//               </span>
//             </Link>

//             <motion.h2
//               variants={itemVariants}
//               className="text-white text-5xl font-black leading-[0.9] mb-6 uppercase italic"
//             >
//               Level up <br />
//               <span className="text-orange-500">Your</span> <br />
//               Vibe
//             </motion.h2>
//             <motion.p
//               variants={itemVariants}
//               className="text-slate-400 text-sm font-medium leading-relaxed max-w-[200px]"
//             >
//               The only platform built for your campus hustle. Meet, compete, and
//               repeat.
//             </motion.p>
//           </div>

//           <div className="relative z-10 flex flex-col gap-4">
//             {[
//               ["500+", "Events"],
//               ["120+", "Colleges"],
//             ].map(([v, l]) => (
//               <div key={l} className="flex items-center gap-3">
//                 <span className="text-orange-500 text-2xl font-black">{v}</span>
//                 <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                   {l}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Swipe Trigger */}
//           <motion.button
//             whileHover={{ width: 60 }}
//             onClick={() => setPanelOpen(true)}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white h-24 w-12 rounded-l-2xl flex flex-col items-center justify-center gap-2 group transition-all"
//           >
//             <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//             <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black tracking-widest uppercase">
//               JOIN US
//             </span>
//           </motion.button>
//         </div>

//         {/* Right Side: Forms */}
//         <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center relative">
//           <AnimatePresence mode="wait">
//             {step === "credentials" ? (
//               <motion.div
//                 key="creds"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               >
//                 <header className="mb-8">
//                   <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//                     Welcome Back
//                   </h1>
//                   <p className="text-slate-400 text-sm font-medium">
//                     Log in to sync with your campus.
//                   </p>
//                 </header>

//                 <div className="space-y-4">
//                   <motion.button
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     onClick={() => {
//                       setGoogleLoading(true);
//                       signIn("google", { callbackUrl: "/" });
//                     }}
//                     className="w-full h-12 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
//                   >
//                     {googleLoading ? (
//                       <Loader2 className="animate-spin w-5 h-5" />
//                     ) : (
//                       <svg className="w-5 h-5" viewBox="0 0 24 24">
//                         <path
//                           fill="#EA4335"
//                           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                         />
//                         <path
//                           fill="#4285F4"
//                           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                         />
//                         <path
//                           fill="#34A853"
//                           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                         />
//                         <path
//                           fill="#FBBC05"
//                           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//                         />
//                       </svg>
//                     )}
//                     Google Account
//                   </motion.button>

//                   <div className="flex items-center gap-4 my-6">
//                     <div className="h-px bg-slate-100 flex-1" />
//                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
//                       or email
//                     </span>
//                     <div className="h-px bg-slate-100 flex-1" />
//                   </div>

//                   <form onSubmit={handleSendOtp} className="space-y-4">
//                     <div className="relative group">
//                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900"
//                         placeholder="your@campus.edu"
//                       />
//                     </div>
//                     <div className="space-y-1.5">
//                       <div className="flex justify-between px-1">
//                         <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
//                           Password
//                         </label>
//                         <Link
//                           href="/forgot"
//                           className="text-[11px] font-black uppercase text-orange-500"
//                         >
//                           Forgot?
//                         </Link>
//                       </div>
//                       <div className="relative group">
//                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                           className="w-full h-12 pl-12 pr-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900"
//                           placeholder="••••••••"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
//                         >
//                           {showPassword ? (
//                             <EyeOff size={18} />
//                           ) : (
//                             <Eye size={18} />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {error && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-xs font-bold"
//                       >
//                         <AlertCircle size={16} /> {error}
//                       </motion.div>
//                     )}

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={loading}
//                       className="w-full h-14 bg-slate-950 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors shadow-xl shadow-slate-950/20"
//                     >
//                       {loading ? (
//                         <Loader2 className="animate-spin" />
//                       ) : (
//                         <>
//                           Sign In <ArrowRight size={18} />
//                         </>
//                       )}
//                     </motion.button>
//                   </form>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="otp"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="text-center"
//               >
//                 <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
//                   <ShieldCheck size={32} />
//                 </div>
//                 <h2 className="text-2xl font-black text-slate-900 mb-2">
//                   Check Email
//                 </h2>
//                 <p className="text-slate-400 text-sm mb-8 font-medium">
//                   Enter the 6-digit code sent to <br />
//                   <span className="text-slate-900 font-bold">{email}</span>
//                 </p>

//                 <form onSubmit={handleVerifyOtp} className="space-y-6">
//                   <input
//                     type="text"
//                     maxLength={6}
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl h-20 text-center text-4xl font-black tracking-[0.5em] text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
//                     placeholder="000000"
//                   />
//                   <button
//                     disabled={loading}
//                     className="w-full h-14 bg-emerald-600 text-white rounded-[1.2rem] font-black uppercase tracking-widest"
//                   >
//                     {loading ? (
//                       <Loader2 className="animate-spin mx-auto" />
//                     ) : (
//                       "Verify Code"
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setStep("credentials")}
//                     className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
//                   >
//                     ← Change Email
//                   </button>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Registration Overlay Panel */}
//         <AnimatePresence>
//           {panelOpen && (
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 30, stiffness: 300 }}
//               className="absolute inset-0 z-50 bg-white flex flex-col md:flex-row"
//             >
//               <div className="flex-1 p-8 md:p-14 flex flex-col justify-center relative">
//                 <button
//                   onClick={() => setPanelOpen(false)}
//                   className="absolute top-8 left-8 p-2 hover:bg-slate-50 rounded-full transition-colors"
//                 >
//                   <ChevronLeft size={24} className="text-slate-900" />
//                 </button>

//                 <div className="max-w-sm mx-auto w-full">
//                   <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
//                     <Sparkles className="text-white" />
//                   </div>
//                   <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight uppercase italic">
//                     Fresh start <br /> starts here
//                   </h2>
//                   <p className="text-slate-400 text-sm font-medium mb-8">
//                     Join the wave of 50k+ students.
//                   </p>

//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <div className="space-y-4">
//                       <div className="relative group">
//                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
//                         <input
//                           type="text"
//                           value={rName}
//                           onChange={(e) => setRName(e.target.value)}
//                           required
//                           className="w-full h-12 pl-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
//                           placeholder="Full Name"
//                         />
//                       </div>
//                       <div className="relative group">
//                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
//                         <input
//                           type="email"
//                           value={rEmail}
//                           onChange={(e) => setREmail(e.target.value)}
//                           required
//                           className="w-full h-12 pl-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
//                           placeholder="University Email"
//                         />
//                       </div>
//                       <div className="relative group">
//                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
//                         <input
//                           type={rShowPw ? "text" : "password"}
//                           value={rPassword}
//                           onChange={(e) => setRPassword(e.target.value)}
//                           required
//                           className="w-full h-12 pl-12 pr-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
//                           placeholder="Strong Password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setRShowPw(!rShowPw)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
//                         >
//                           {rShowPw ? <EyeOff size={18} /> : <Eye size={18} />}
//                         </button>
//                       </div>
//                     </div>
//                     {rError && (
//                       <p className="text-red-500 text-xs font-bold">{rError}</p>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       className="w-full h-14 bg-orange-600 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-600/20"
//                     >
//                       {rLoading ? (
//                         <Loader2 className="animate-spin mx-auto" />
//                       ) : (
//                         "Create Account"
//                       )}
//                     </motion.button>
//                   </form>
//                 </div>
//               </div>

//               {/* Decorative side on register */}
//               <div className="hidden lg:flex w-[260px] bg-slate-950 p-12 flex-col justify-center relative overflow-hidden">
//                 <div className="absolute top-[-20%] right-[-20%] w-64 h-64 rounded-full bg-orange-500/20 blur-[60px]" />
//                 <h3 className="text-white text-3xl font-black leading-tight uppercase italic mb-8">
//                   Access <br />{" "}
//                   <span className="text-orange-500">exclusive</span> <br />{" "}
//                   campus <br /> deals.
//                 </h3>
//                 <ul className="space-y-4">
//                   {["Early Bird Tickets", "Skill Workshops", "Networking"].map(
//                     (i) => (
//                       <li
//                         key={i}
//                         className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
//                       >
//                         <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />{" "}
//                         {i}
//                       </li>
//                     ),
//                   )}
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
// Import for Passkey functionality
import { signIn as signInWebAuthn } from "next-auth/webauthn";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Fingerprint, // Added for Passkey icon
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeInOut, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("register") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false); // Added passkey loading state

  // Register panel states
  const [panelOpen, setPanelOpen] = useState(isRegister);
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rShowPw, setRShowPw] = useState(false);
  const [rConfirmPassword, setRConfirmPassword] = useState("");
  const [rShowConfirmPw, setRShowConfirmPw] = useState(false);
  const [rLoading, setRLoading] = useState(false);
  const [rError, setRError] = useState("");

  // ── PASSKEY SIGN IN LOGIC ──
  const handlePasskeySignIn = async () => {
    setPasskeyLoading(true);
    setError("");
    try {
      await signInWebAuthn("passkey", {
        action: "authenticate",
        callbackUrl: "/",
      });
    } catch (error: any) {
      if (
        error?.name === "NotAllowedError" ||
        error?.message?.includes("not allowed")
      ) {
        setError("Passkey sign in was cancelled.");
      } else {
        setError("Failed to sign in with Passkey. Please try again.");
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  // ── OTP & REGISTER LOGIC ──
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
      if (!res.ok) setError(data.error || "Invalid credentials.");
      else setStep("otp");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      });
      if (result?.error) setError("Invalid or expired OTP.");
      else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRError("");
    
    if (rPassword !== rConfirmPassword) {
      setRError("Passwords do not match.");
      return;
    }

    setRLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rName,
          email: rEmail,
          password: rPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) setRError(data.error || "Registration failed.");
      else {
        setPanelOpen(false);
        setEmail(rEmail);
      }
    } catch {
      setRError("Something went wrong.");
    } finally {
      setRLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 p-4 mt-12">
        {/* Background Blobs */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-blue-200/30 blur-[100px]"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 bg-white shadow-[0_32px_120px_-20px_rgba(0,0,0,0.15)] w-full max-w-[900px] h-full min-h-[580px] rounded-[2.5rem] flex overflow-hidden border border-slate-100"
        >
          {/* Left Side: Brand Identity */}
          <div className="hidden md:flex w-[320px] bg-slate-950 p-10 flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-blue-600/10 z-0" />
            <div className="relative z-10">
              <Link href="/" className="flex items-center gap-3 mb-12 group">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <GraduationCap className="text-white w-6 h-6" />
                </div>
                <span className="text-white font-black text-xl tracking-wider">
                  NOWONCAMPUS
                </span>
              </Link>
              <motion.h2
                variants={itemVariants}
                className="text-white text-5xl font-black leading-[0.9] mb-6 uppercase italic"
              >
                Level up <br /> <span className="text-orange-500">Your</span>{" "}
                <br /> Vibe
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-slate-400 text-sm font-medium leading-relaxed max-w-[200px]"
              >
                The only platform built for your campus hustle. Meet, compete,
                and repeat.
              </motion.p>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              {[
                ["500+", "Events"],
                ["120+", "Colleges"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-center gap-3">
                  <span className="text-orange-500 text-2xl font-black">
                    {v}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {l}
                  </span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ width: 60 }}
              onClick={() => setPanelOpen(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white h-50 w-12 rounded-l-2xl flex flex-col items-center justify-center gap-2 group transition-all"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black tracking-widest uppercase">
                Create Account
              </span>
            </motion.button>
          </div>

          {/* Right Side: Forms */}
          <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {step === "credentials" ? (
                <motion.div
                  key="creds"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <header className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                      Welcome Back
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                      Log in to sync with your campus.
                    </p>
                  </header>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Google Login Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setGoogleLoading(true);
                        signIn("google", { callbackUrl: "/" });
                      }}
                      className="h-14 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-2 font-bold text-slate-700 hover:bg-slate-50 transition-all text-xs uppercase tracking-tighter"
                    >
                      {googleLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                          Google
                        </>
                      )}
                    </motion.button>

                    {/* Passkey Login Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePasskeySignIn}
                      disabled={passkeyLoading || googleLoading}
                      className="h-14 bg-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center gap-2 font-bold text-white hover:bg-slate-800 transition-all text-xs uppercase tracking-tighter disabled:opacity-50"
                    >
                      {passkeyLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <>
                          <Fingerprint size={16} className="text-orange-500" />
                          Passkey
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-4 my-6">
                    <div className="h-px bg-slate-100 flex-1" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      or email
                    </span>
                    <div className="h-px bg-slate-100 flex-1" />
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900"
                        placeholder="your@campus.edu"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between px-1">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          Password
                        </label>
                        <Link
                          href="/forgot"
                          className="text-[11px] font-black uppercase text-orange-500"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full h-12 pl-12 pr-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-xs font-bold"
                      >
                        <AlertCircle size={16} /> {error}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="w-full h-14 bg-slate-950 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors shadow-xl shadow-slate-950/20"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          Sign In <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">
                    Check Email
                  </h2>
                  <p className="text-slate-400 text-sm mb-8 font-medium">
                    Enter the 6-digit code sent to <br />
                    <span className="text-slate-900 font-bold">{email}</span>
                  </p>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl h-20 text-center text-4xl font-black tracking-[0.5em] text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      placeholder="000000"
                    />
                    <button
                      disabled={loading}
                      className="w-full h-14 bg-emerald-600 text-white rounded-[1.2rem] font-black uppercase tracking-widest"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin mx-auto" />
                      ) : (
                        "Verify Code"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("credentials")}
                      className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                    >
                      ← Change Email
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Register Panel */}
          <AnimatePresence>
            {panelOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 1.2 }}
                className="absolute inset-0 z-50 bg-white flex flex-col md:flex-row"
              >
                <div className="flex-1 p-8 md:p-14 flex flex-col justify-center relative">
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="absolute top-8 left-8 p-2 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-slate-900" />
                  </button>
                  <div className="max-w-sm mx-auto w-full text-center md:text-left">
                    <div className="flex flex-col gap-6 mb-8">
                      <div className="text-center md:text-left">
                        
                        <h2 className="text-3xl font-black text-slate-900 mb-2 italic leading-tight whitespace-nowrap">
                          Create An Account
                        </h2>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setGoogleLoading(true);
                          signIn("google", { callbackUrl: "/" });
                        }}
                        disabled={googleLoading}
                        className="w-full h-14 bg-white border-2 border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200 rounded-[1.2rem] font-bold flex items-center justify-center gap-3 transition-all shadow-sm"
                      >
                        {googleLoading ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                          <>
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                              <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                              ></path>
                              <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                              ></path>
                              <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                              ></path>
                              <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                              ></path>
                            </svg>
                            <span className="text-sm uppercase tracking-widest">Sign up with Google</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px bg-slate-100 flex-1" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        or email
                      </span>
                      <div className="h-px bg-slate-100 flex-1" />
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                        <input
                          type="text"
                          value={rName}
                          onChange={(e) => setRName(e.target.value)}
                          required
                          className="w-full h-12 pl-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                        <input
                          type="email"
                          value={rEmail}
                          onChange={(e) => setREmail(e.target.value)}
                          required
                          className="w-full h-12 pl-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
                          placeholder="University Email"
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                        <input
                          type={rShowPw ? "text" : "password"}
                          value={rPassword}
                          onChange={(e) => setRPassword(e.target.value)}
                          required
                          className="w-full h-12 pl-12 pr-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
                          placeholder="Strong Password"
                        />
                        <button
                          type="button"
                          onClick={() => setRShowPw(!rShowPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                        >
                          {rShowPw ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                        <input
                          type={rShowConfirmPw ? "text" : "password"}
                          value={rConfirmPassword}
                          onChange={(e) => setRConfirmPassword(e.target.value)}
                          required
                          className="w-full h-12 pl-12 pr-12 bg-slate-50 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none"
                          placeholder="Confirm Password"
                        />
                        <button
                          type="button"
                          onClick={() => setRShowConfirmPw(!rShowConfirmPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                        >
                          {rShowConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {rError && (
                        <p className="text-red-500 text-xs font-bold">
                          {rError}
                        </p>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full h-14 bg-orange-600 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-sm"
                      >
                        {rLoading ? (
                          <Loader2 className="animate-spin mx-auto" />
                        ) : (
                          "Create Account"
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
                <div className="hidden lg:flex w-[260px] bg-slate-950 p-12 flex-col justify-center relative overflow-hidden text-center">
                  <div className="absolute top-[-20%] right-[-20%] w-64 h-64 rounded-full bg-orange-500/20 blur-[60px]" />
                  <h3 className="text-white text-3xl font-black leading-tight uppercase italic mb-8">
                    Access <br />{" "}
                    <span className="text-orange-500">exclusive</span> <br />{" "}
                    campus <br /> deals.
                  </h3>
                  <ul className="space-y-4 text-left">
                    {[
                      "Early Bird Tickets",
                      "Skill Workshops",
                      "Networking",
                    ].map((i) => (
                      <li
                        key={i}
                        className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />{" "}
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
