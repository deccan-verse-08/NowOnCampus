"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Loader2, Pencil, Save, Trash2, X } from "lucide-react";

interface TeamParticipant {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  phoneNumber: string;
}

interface LifecycleRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  eventVenue: string;
  eventDate: string;
  eventStatus: string;
  registrationDeadline: string | null;
  status: "CONFIRMED" | "WAITLISTED" | "CANCELLED";
  teamName: string | null;
  teamParticipants: TeamParticipant[];
}

interface Props {
  registrations: LifecycleRegistration[];
}

export function RegistrationLifecycleManager({ registrations }: Props) {
  const [items, setItems] = useState<LifecycleRegistration[]>(registrations);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamParticipant[]>([]);
  const [busyEventId, setBusyEventId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const activeRegistrations = useMemo(
    () => items.filter((item) => item.eventStatus === "UPCOMING" && item.status !== "CANCELLED"),
    [items],
  );

  const canEditTeam = (item: LifecycleRegistration) => {
    if (item.eventCategory !== "HACKATHON" || item.status === "CANCELLED") return false;
    if (!item.registrationDeadline) return true;
    return new Date(item.registrationDeadline) > new Date();
  };

  const startEdit = (item: LifecycleRegistration) => {
    setEditingEventId(item.eventId);
    setTeamName(item.teamName || "");
    setTeamMembers(
      item.teamParticipants.length > 0
        ? item.teamParticipants
        : [
            {
              id: `new-0`,
              name: "",
              rollNumber: "",
              course: "",
              phoneNumber: "",
            },
          ],
    );
    setError("");
  };

  const cancelEdit = () => {
    setEditingEventId(null);
    setTeamName("");
    setTeamMembers([]);
    setError("");
  };

  const addMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      {
        id: `new-${prev.length}`,
        name: "",
        rollNumber: "",
        course: "",
        phoneNumber: "",
      },
    ]);
  };

  const removeMember = (index: number) => {
    setTeamMembers((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  };

  const updateMember = (
    index: number,
    key: keyof Omit<TeamParticipant, "id">,
    value: string,
  ) => {
    setTeamMembers((prev) =>
      prev.map((member, i) => (i === index ? { ...member, [key]: value } : member)),
    );
  };

  const cancelRegistration = async (eventId: string) => {
    const confirmed = window.confirm("Cancel this registration?");
    if (!confirmed) return;

    setBusyEventId(eventId);
    setError("");
    try {
      const res = await fetch(`/api/events/register/${eventId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to cancel registration.");
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.eventId === eventId ? { ...item, status: "CANCELLED" } : item,
        ),
      );
    } catch {
      setError("Something went wrong while cancelling registration.");
    } finally {
      setBusyEventId(null);
    }
  };

  const saveTeam = async (eventId: string) => {
    const normalizedMembers = teamMembers.map((member) => ({
      name: member.name.trim(),
      rollNumber: member.rollNumber.trim(),
      course: member.course.trim(),
      phoneNumber: member.phoneNumber.trim(),
    }));

    if (
      normalizedMembers.length === 0 ||
      normalizedMembers.some(
        (member) =>
          !member.name || !member.rollNumber || !member.course || !member.phoneNumber,
      )
    ) {
      setError(
        "Please fill teammate name, roll number, class/course, and phone number for all members.",
      );
      return;
    }

    setBusyEventId(eventId);
    setError("");
    try {
      const res = await fetch(`/api/events/register/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName,
          teamParticipants: normalizedMembers,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update team details.");
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.eventId === eventId
            ? {
                ...item,
                teamName: teamName.trim() || null,
                teamParticipants: normalizedMembers.map((member, index) => ({
                  id: `updated-${eventId}-${index}`,
                  ...member,
                })),
              }
            : item,
        ),
      );
      cancelEdit();
    } catch {
      setError("Something went wrong while updating team details.");
    } finally {
      setBusyEventId(null);
    }
  };

  const statusClass: Record<LifecycleRegistration["status"], string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    WAITLISTED: "bg-orange-100 text-orange-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500">
            Registration Lifecycle
          </p>
          <h2
            className="text-4xl font-black text-slate-900"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Manage Registrations
          </h2>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {activeRegistrations.length === 0 ? (
        <p className="text-sm text-slate-500">No active upcoming registrations to manage.</p>
      ) : (
        <div className="space-y-4">
          {activeRegistrations.map((item) => {
            const isBusy = busyEventId === item.eventId;
            const isEditing = editingEventId === item.eventId;
            const editableTeam = canEditTeam(item);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.eventTitle}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(item.eventDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {item.eventVenue}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusClass[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                {isEditing && (
                  <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                    <input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name (optional)"
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="space-y-2">
                      {teamMembers.map((member, index) => (
                        <div
                          key={member.id}
                          className="rounded-xl border border-slate-200 bg-white p-3"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              value={member.name}
                              onChange={(e) => updateMember(index, "name", e.target.value)}
                              placeholder="Name"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                            <input
                              value={member.rollNumber}
                              onChange={(e) => updateMember(index, "rollNumber", e.target.value)}
                              placeholder="Roll Number"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                            <input
                              value={member.course}
                              onChange={(e) => updateMember(index, "course", e.target.value)}
                              placeholder="Class / Course"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                            <input
                              value={member.phoneNumber}
                              onChange={(e) => updateMember(index, "phoneNumber", e.target.value)}
                              placeholder="Phone Number"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                          </div>
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMember(index)}
                              className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700"
                            >
                              Remove member
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addMember}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      + Add teammate
                    </button>
                  </div>
                )}

                {!isEditing && item.eventCategory === "HACKATHON" && (
                  <div className="mt-3 text-xs text-slate-600">
                    <p className="font-semibold">Team: {item.teamName || "Not provided"}</p>
                    {item.teamParticipants.length > 0 && (
                      <p className="mt-1">
                        {item.teamParticipants.length} teammate
                        {item.teamParticipants.length > 1 ? "s" : ""} added
                      </p>
                    )}
                    {editableTeam && item.registrationDeadline && (
                      <p className="mt-1 text-orange-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Editable until{" "}
                        {new Date(item.registrationDeadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/events/${item.eventId}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300"
                  >
                    View Event
                  </Link>

                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => saveTeam(item.eventId)}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                      >
                        {isBusy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Save className="w-3.5 h-3.5" />
                        )}
                        Save Team
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {editableTeam && (
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit Team
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => cancelRegistration(item.eventId)}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 disabled:bg-red-100"
                      >
                        {isBusy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Cancel Registration
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
