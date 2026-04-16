"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Plus, Trash2, Users, X } from "lucide-react";
import Link from "next/link";

interface Props {
    eventId: string;
    isLoggedIn: boolean;
    isHackathon: boolean;
    isWaitlistOnly: boolean;
}

interface TeamMemberForm {
    name: string;
    rollNumber: string;
    course: string;
    phoneNumber: string;
}

const emptyMember = (): TeamMemberForm => ({
    name: "",
    rollNumber: "",
    course: "",
    phoneNumber: "",
});

export function RegisterButton({ eventId, isLoggedIn, isHackathon, isWaitlistOnly }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState<TeamMemberForm[]>([emptyMember()]);

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

    const submitRegistration = async (payload?: {
        teamName?: string;
        teamParticipants?: TeamMemberForm[];
    }) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/events/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId, ...payload }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Registration failed.");
            } else {
                setShowTeamForm(false);
                setTeamName("");
                setTeamMembers([emptyMember()]);
                router.refresh();
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (isHackathon) {
            setShowTeamForm(true);
            return;
        }

        await submitRegistration();
    };

    const addTeamMember = () => {
        setTeamMembers((prev) => [...prev, emptyMember()]);
    };

    const removeTeamMember = (index: number) => {
        setTeamMembers((prev) =>
            prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev,
        );
    };

    const updateTeamMember = (
        index: number,
        key: keyof TeamMemberForm,
        value: string,
    ) => {
        setTeamMembers((prev) =>
            prev.map((member, idx) =>
                idx === index ? { ...member, [key]: value } : member,
            ),
        );
    };

    const handleHackathonSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasIncompleteMember = teamMembers.some(
            (member) =>
                !member.name.trim() ||
                !member.rollNumber.trim() ||
                !member.course.trim() ||
                !member.phoneNumber.trim(),
        );

        if (hasIncompleteMember) {
            setError(
                "Please fill teammate name, roll number, class/course, and phone number for all members.",
            );
            return;
        }

        await submitRegistration({
            teamName: teamName.trim() || undefined,
            teamParticipants: teamMembers,
        });
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
                    isWaitlistOnly
                        ? (isHackathon ? "Join Hackathon Waitlist" : "Join Event Waitlist")
                        : (isHackathon ? "Register for Hackathon" : "Register for Event")
                )}
            </button>

            {showTeamForm && (
                <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Hackathon Team Registration
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Add complete teammate details to continue.
                                </p>
                                {isWaitlistOnly && (
                                    <p className="text-xs text-orange-600 mt-1 font-medium">
                                        Team slots are full. You will be added to the waitlist.
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!loading) {
                                        setShowTeamForm(false);
                                    }
                                }}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                                aria-label="Close form"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleHackathonSubmit} className="p-5 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Team Name (optional)
                                </label>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="e.g. Code Warriors"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-600" /> Team Partners
                                    </p>
                                    <button
                                        type="button"
                                        onClick={addTeamMember}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Partner
                                    </button>
                                </div>

                                {teamMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 rounded-xl p-3.5 space-y-3 bg-slate-50/60"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                                Partner {index + 1}
                                            </p>
                                            {teamMembers.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTeamMember(index)}
                                                    className="p-1.5 rounded-md text-red-500 hover:bg-red-50"
                                                    aria-label={`Remove partner ${index + 1}`}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) =>
                                                    updateTeamMember(index, "name", e.target.value)
                                                }
                                                placeholder="Name"
                                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                value={member.rollNumber}
                                                onChange={(e) =>
                                                    updateTeamMember(index, "rollNumber", e.target.value)
                                                }
                                                placeholder="Roll Number"
                                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                value={member.course}
                                                onChange={(e) =>
                                                    updateTeamMember(index, "course", e.target.value)
                                                }
                                                placeholder="Class / Course"
                                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="tel"
                                                value={member.phoneNumber}
                                                onChange={(e) =>
                                                    updateTeamMember(index, "phoneNumber", e.target.value)
                                                }
                                                placeholder="Phone Number"
                                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowTeamForm(false)}
                                    disabled={loading}
                                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        isWaitlistOnly
                                            ? "Submit Team & Join Waitlist"
                                            : "Submit Team & Register"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
