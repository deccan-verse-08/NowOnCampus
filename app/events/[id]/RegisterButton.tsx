"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";

interface Props {
    eventId: string;
    isLoggedIn: boolean;
}

export function RegisterButton({ eventId, isLoggedIn }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isLoggedIn) {
        return (
            <Link
                href={`/login?callbackUrl=/events/${eventId}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-blue-200"
            >
                <LogIn className="w-4 h-4" /> Sign In to Register
            </Link>
        );
    }

    const handleRegister = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/events/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Registration failed.");
            } else {
                router.refresh();
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            {error && (
                <p className="text-xs text-red-600 text-center">{error}</p>
            )}
            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-blue-200 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registering...
                    </>
                ) : (
                    "Register for Event"
                )}
            </button>
        </div>
    );
}
