"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Send, Calendar, MapPin, FileText, Tag, Trophy, Users,
  Loader2, CheckCircle, ChevronDown,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "FORMAL", "INFORMAL", "HACKATHON", "CULTURAL",
  "SPORTS", "WORKSHOP", "TECHNICAL", "LITERARY",
];

export default function RequestEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "", shortDescription: "", description: "", category: "",
    date: "", endDate: "", venue: "", registrationDeadline: "",
    maxParticipants: "", prizeMoney: "", teamSize: "", image: "", tags: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <Loader2 style={{ color: "#f97316", animation: "spin 1s linear infinite" }} size={40} />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const set = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.category || !form.date || !form.venue) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/event-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to submit");
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: "100vh", background: "#0f172a",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2rem 1rem",
        }}>
          <div style={{
            background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)",
            borderRadius: "2rem", padding: "2.5rem 1.75rem", maxWidth: "460px",
            width: "100%", textAlign: "center",
          }}>
            <CheckCircle size={52} color="#22c55e" style={{ marginBottom: "1.25rem" }} />
            <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 900, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>
              Request Submitted!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: "0 0 2rem", lineHeight: 1.6 }}>
              Your event creation request has been sent to the admins for review.
              You'll receive an email once it's approved or rejected.
            </p>
            <Link
              href="/events"
              style={{
                display: "inline-block", background: "#f97316", color: "#fff",
                padding: "13px 28px", borderRadius: "12px", fontWeight: 800,
                fontSize: "0.875rem", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              Browse Events
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .req-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          color: #fff;
          padding: 12px 16px;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .req-input:focus { border-color: #f97316; }
        .req-input::placeholder { color: rgba(255,255,255,0.25); }
        .req-select option { background: #1e293b; color: #fff; }
        .req-input[type="datetime-local"] { color-scheme: dark; }

        .req-page { background: #0f172a; min-height: 100vh; }

        /* Hero */
        .req-hero {
          padding-top: 5rem;
          background: linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .req-hero-inner {
          max-width: 680px;
          margin: 0 auto;
          padding: 2rem 1.25rem 1.75rem;
        }

        /* Form body */
        .req-form-wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 1.75rem 1.25rem 4rem;
        }

        /* Cards */
        .req-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 1.5rem 1.25rem;
          margin-bottom: 1rem;
        }
        .req-card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.1rem;
        }

        /* Two-col grid that collapses on mobile */
        .req-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.875rem;
        }
        @media (max-width: 520px) {
          .req-grid-2 { grid-template-columns: 1fr; }
          .req-card { padding: 1.25rem 1rem; }
          .req-hero-inner { padding: 1.5rem 1rem 1.25rem; }
          .req-form-wrap { padding: 1.25rem 0.875rem 3.5rem; }
        }

        /* Labels */
        .req-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.45);
          margin-bottom: 6px;
        }

        /* Submit btn */
        .req-submit {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          background: #f97316;
          color: #fff;
          font-weight: 900;
          font-size: 0.9375rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 28px rgba(249,115,22,0.30);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .req-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .req-submit:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(249,115,22,0.40);
        }

        /* Icon-prefixed input */
        .req-icon-wrap { position: relative; }
        .req-icon-wrap .req-input { padding-left: 40px; }
        .req-icon-wrap .req-prefix-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .req-select-wrap { position: relative; }
        .req-select-wrap .req-input { padding-right: 40px; appearance: none; cursor: pointer; }
        .req-select-wrap .req-suffix-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
      `}</style>

      <Navbar />
      <div className="req-page">

        {/* Hero */}
        <div className="req-hero">
          <div className="req-hero-inner">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: "999px", padding: "5px 14px", marginBottom: "0.875rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: "#f97316" }}>
                Student Event Request
              </span>
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(26px, 6vw, 42px)",
              fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1.15,
            }}>
              Request an Event
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
              Fill in the details below. An admin will review your request and you'll be notified by email.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="req-form-wrap">
          <form onSubmit={handleSubmit}>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "12px", padding: "12px 16px", marginBottom: "1.25rem",
                color: "#f87171", fontSize: "0.875rem",
              }}>
                {error}
              </div>
            )}

            {/* ── Basic Info ── */}
            <div className="req-card">
              <div className="req-card-title">
                <FileText size={16} color="#f97316" />
                <h2 style={{ color: "#fff", fontSize: "0.9375rem", fontWeight: 800, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Basic Information
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div>
                  <label className="req-label">Event Title *</label>
                  <input className="req-input" placeholder="e.g. Annual Hackathon 2025"
                    value={form.title} onChange={e => set("title", e.target.value)} />
                </div>
                <div>
                  <label className="req-label">Category *</label>
                  <div className="req-select-wrap">
                    <select className="req-input req-select" value={form.category}
                      onChange={e => set("category", e.target.value)}>
                      <option value="">Select a category...</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                      ))}
                    </select>
                    <ChevronDown size={15} color="rgba(255,255,255,0.35)" className="req-suffix-icon" />
                  </div>
                </div>
                <div>
                  <label className="req-label">Short Description</label>
                  <input className="req-input" placeholder="One-line teaser for the event listing"
                    value={form.shortDescription} onChange={e => set("shortDescription", e.target.value)} />
                </div>
                <div>
                  <label className="req-label">Full Description *</label>
                  <textarea className="req-input" style={{ minHeight: "110px", resize: "vertical" }}
                    placeholder="Describe the event in detail..."
                    value={form.description} onChange={e => set("description", e.target.value)} />
                </div>
              </div>
            </div>

            {/* ── Date & Venue ── */}
            <div className="req-card">
              <div className="req-card-title">
                <Calendar size={16} color="#f97316" />
                <h2 style={{ color: "#fff", fontSize: "0.9375rem", fontWeight: 800, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Date &amp; Venue
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div className="req-grid-2">
                  <div>
                    <label className="req-label">Start Date &amp; Time *</label>
                    <input type="datetime-local" className="req-input"
                      value={form.date} onChange={e => set("date", e.target.value)} />
                  </div>
                  <div>
                    <label className="req-label">End Date &amp; Time</label>
                    <input type="datetime-local" className="req-input"
                      value={form.endDate} onChange={e => set("endDate", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="req-label">Venue *</label>
                  <div className="req-icon-wrap">
                    <MapPin size={14} color="rgba(255,255,255,0.30)" className="req-prefix-icon" />
                    <input className="req-input" placeholder="e.g. Auditorium Block B"
                      value={form.venue} onChange={e => set("venue", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="req-label">Registration Deadline</label>
                  <input type="datetime-local" className="req-input"
                    value={form.registrationDeadline} onChange={e => set("registrationDeadline", e.target.value)} />
                </div>
              </div>
            </div>

            {/* ── Participation ── */}
            <div className="req-card">
              <div className="req-card-title">
                <Users size={16} color="#f97316" />
                <h2 style={{ color: "#fff", fontSize: "0.9375rem", fontWeight: 800, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Participation
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div className="req-grid-2">
                  <div>
                    <label className="req-label">Max Participants</label>
                    <input type="number" min="1" className="req-input" placeholder="e.g. 200"
                      value={form.maxParticipants} onChange={e => set("maxParticipants", e.target.value)} />
                  </div>
                  <div>
                    <label className="req-label">Team Size</label>
                    <input className="req-input" placeholder="e.g. 2–4 members"
                      value={form.teamSize} onChange={e => set("teamSize", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="req-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Trophy size={11} /> Prize Money / Reward
                  </label>
                  <input className="req-input" placeholder="e.g. ₹50,000 total prize pool"
                    value={form.prizeMoney} onChange={e => set("prizeMoney", e.target.value)} />
                </div>
              </div>
            </div>

            {/* ── Extra Details ── */}
            <div className="req-card">
              <div className="req-card-title">
                <Tag size={16} color="#f97316" />
                <h2 style={{ color: "#fff", fontSize: "0.9375rem", fontWeight: 800, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Extra Details
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div>
                  <label className="req-label">Tags</label>
                  <input className="req-input" placeholder="e.g. coding, AI, team (comma separated)"
                    value={form.tags} onChange={e => set("tags", e.target.value)} />
                </div>
                <div>
                  <label className="req-label">Event Image URL</label>
                  <input className="req-input" placeholder="https://..."
                    value={form.image} onChange={e => set("image", e.target.value)} />
                </div>
                <div>
                  <label className="req-label">Message to Admin</label>
                  <textarea className="req-input" style={{ minHeight: "80px", resize: "vertical" }}
                    placeholder="Any additional notes or context for the reviewing admin..."
                    value={form.message} onChange={e => set("message", e.target.value)} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="req-submit">
              {loading
                ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                : <><Send size={18} /> Submit Request</>}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
