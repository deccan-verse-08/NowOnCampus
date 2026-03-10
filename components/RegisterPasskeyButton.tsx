"use client";

import { useState } from "react";
import { signIn } from "next-auth/webauthn";
import { Loader2, Fingerprint, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    hasPasskey: boolean;
    email: string;
}

export function RegisterPasskeyButton({ hasPasskey, email }: Props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        setError("");
        try {
            // Using NextAuth's experimental passkey provider in 'register' mode
            const res = await signIn("passkey", { action: "register", email, redirect: false });
            if (res?.error) {
                setError(res.error);
            } else {
                setSuccess(true);
            }
        } catch (error: any) {
            if (error?.name === "NotAllowedError" || error?.message?.includes("not allowed")) {
                setError("Passkey registration was cancelled.");
            } else {
                setError("Failed to register passkey. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (hasPasskey || success) {
        return (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-emerald-700">Passkey Enabled</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleRegister}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                ) : (
                    <Fingerprint className="w-4 h-4" />
                )}
                {loading ? "Registering..." : "Add Passkey"}
            </button>
            
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-600/90 font-medium px-1 max-w-[200px]"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
