"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Image as ImageIcon,
  Trophy,
  Users,
  Tag,
  MapPin,
  FileText,
  Info,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const categories = [
  { value: "FORMAL", label: "🎓 Formal" },
  { value: "INFORMAL", label: "🎉 Informal" },
  { value: "HACKATHON", label: "⚡ Hackathon" },
  { value: "CULTURAL", label: "🎭 Cultural" },
  { value: "SPORTS", label: "⚽ Sports" },
  { value: "WORKSHOP", label: "🔧 Workshop" },
  { value: "TECHNICAL", label: "💻 Technical" },
  { value: "LITERARY", label: "📚 Literary" },
];

interface FormData {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  date: string;
  endDate: string;
  venue: string;
  registrationDeadline: string;
  maxParticipants: string;
  prizeMoney: string;
  teamSize: string;
  image: string;
  tags: string;
  isFeatured: boolean;
}

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    title: "",
    shortDescription: "",
    description: "",
    category: "FORMAL",
    date: "",
    endDate: "",
    venue: "",
    registrationDeadline: "",
    maxParticipants: "",
    prizeMoney: "",
    teamSize: "",
    image: "",
    tags: "",
    isFeatured: false,
  });

  const update = (key: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          maxParticipants: form.maxParticipants
            ? parseInt(form.maxParticipants)
            : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create event.");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/admin/events"), 1500);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white";

  const labelClass =
    "block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <CalendarPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Create New Event
                </h1>
                <p className="text-xs text-slate-500">
                  Fill in the details below to publish an event
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {success ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Event Created!
              </h2>
              <p className="text-slate-500">Redirecting to events list...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Basic Info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Info className="w-4 h-4 text-blue-600" /> Basic Information
                </h2>

                <div>
                  <label className={labelClass}>Event Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. National Level Hackathon 2025"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                      className={inputClass}
                    >
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Venue *
                    </label>
                    <input
                      type="text"
                      value={form.venue}
                      onChange={(e) => update("venue", e.target.value)}
                      placeholder="e.g. Main Auditorium, Block A"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Short
                    Description
                  </label>
                  <input
                    type="text"
                    value={form.shortDescription}
                    onChange={(e) => update("shortDescription", e.target.value)}
                    placeholder="One-liner shown on event cards"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Full Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Detailed event description, rules, schedule..."
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CalendarPlus className="w-4 h-4 text-blue-600" /> Date &
                  Registration
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Date & Time *</label>
                    <input
                      type="datetime-local"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={form.endDate}
                      onChange={(e) => update("endDate", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Registration Deadline</label>
                  <input
                    type="datetime-local"
                    value={form.registrationDeadline}
                    onChange={(e) =>
                      update("registrationDeadline", e.target.value)
                    }
                    className={`${inputClass} max-w-sm`}
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Trophy className="w-4 h-4 text-blue-600" /> Additional
                  Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Max
                      Participants
                    </label>
                    <input
                      type="number"
                      value={form.maxParticipants}
                      onChange={(e) =>
                        update("maxParticipants", e.target.value)
                      }
                      placeholder="Leave blank = unlimited"
                      min={1}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Trophy className="w-3.5 h-3.5 text-slate-400" /> Prize
                      Money
                    </label>
                    <input
                      type="text"
                      value={form.prizeMoney}
                      onChange={(e) => update("prizeMoney", e.target.value)}
                      placeholder="e.g. ₹50,000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Team Size
                    </label>
                    <input
                      type="text"
                      value={form.teamSize}
                      onChange={(e) => update("teamSize", e.target.value)}
                      placeholder="e.g. 2-4 members"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <Tag className="w-3.5 h-3.5 text-slate-400" /> Tags (comma
                    separated)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => update("tags", e.target.value)}
                    placeholder="e.g. AI, Web Dev, Innovation"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <ImageIcon className="w-3.5 h-3.5 text-slate-400" /> Banner
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => update("isFeatured", !form.isFeatured)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${form.isFeatured ? "bg-blue-600" : "bg-slate-200"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.isFeatured ? "translate-x-5" : ""}`}
                    />
                  </button>
                  <label
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                    onClick={() => update("isFeatured", !form.isFeatured)}
                  >
                    Feature this event on homepage
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-4 pb-4">
                <Link
                  href="/admin"
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-7 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-blue-200 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-4 h-4" />
                      Publish Event
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
