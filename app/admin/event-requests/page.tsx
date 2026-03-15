"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Clock, CheckCircle, XCircle, Loader2, ChevronDown,
  User, Calendar, MapPin, LayoutDashboard, ArrowLeft,
} from "lucide-react";

type EventRequest = {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  description: string;
  shortDescription?: string;
  maxParticipants?: number;
  teamSize?: string;
  prizeMoney?: string;
  tags?: string;
  image?: string;
  message?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewNote?: string;
  createdAt: string;
  requester: { name: string; email: string; image?: string };
  reviewedBy?: { name: string };
};

type Tab = "PENDING" | "APPROVED" | "REJECTED";

export default function AdminEventRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("PENDING");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});
  const [rejectOpen, setRejectOpen] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/event-requests");
    if (res.ok) {
      const data = await res.json();
      setRequests(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "authenticated") fetchRequests();
    if (status === "unauthenticated") router.push("/login");
  }, [status, fetchRequests, router]);

  async function approve(id: string) {
    setActionLoading(id);
    await fetch(`/api/event-requests/${id}/approve`, { method: "POST" });
    await fetchRequests();
    setActionLoading(null);
  }

  async function reject(id: string) {
    setActionLoading(id);
    await fetch(`/api/event-requests/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewNote: rejectNote[id] || "" }),
    });
    setRejectOpen(null);
    await fetchRequests();
    setActionLoading(null);
  }

  const filtered = requests.filter((r) => r.status === activeTab);
  const counts = {
    PENDING: requests.filter((r) => r.status === "PENDING").length,
    APPROVED: requests.filter((r) => r.status === "APPROVED").length,
    REJECTED: requests.filter((r) => r.status === "REJECTED").length,
  };

  const tabColor: Record<Tab, string> = {
    PENDING: "#f97316",
    APPROVED: "#22c55e",
    REJECTED: "#ef4444",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)", borderRadius: "10px",
    color: "#fff", padding: "10px 14px", fontSize: "0.8125rem",
    outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
    resize: "vertical",
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={40} color="#f97316" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        .req-note::placeholder { color: rgba(255,255,255,0.25); }
        .req-note:focus { border-color: #f97316 !important; }
      `}</style>
      <Navbar />

      {/* Hero */}
      <div style={{
        paddingTop: "5rem", background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", marginBottom: "1rem" }}>
            <ArrowLeft size={14} /> Admin Dashboard
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "999px", padding: "5px 14px", marginBottom: "0.75rem" }}>
                <LayoutDashboard size={11} color="#f97316" />
                <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: "#f97316" }}>Admin</span>
              </div>
              <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#fff", margin: 0 }}>
                Event Requests
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginTop: "4px" }}>
                Review student event creation requests
              </p>
            </div>
            {/* Counts */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(["PENDING", "APPROVED", "REJECTED"] as Tab[]).map((t) => (
                <div key={t} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "10px 18px", textAlign: "center",
                }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 900, color: tabColor[t], margin: 0, lineHeight: 1 }}>{counts[t]}</p>
                  <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", marginTop: "3px" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginTop: "1.5rem" }}>
            {(["PENDING", "APPROVED", "REJECTED"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: "8px 20px", borderRadius: "999px", fontWeight: 800,
                fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em",
                border: "1px solid",
                borderColor: activeTab === t ? tabColor[t] : "rgba(255,255,255,0.10)",
                background: activeTab === t ? `${tabColor[t]}18` : "transparent",
                color: activeTab === t ? tabColor[t] : "rgba(255,255,255,0.45)",
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {t} {counts[t] > 0 && <span style={{ marginLeft: "4px", background: tabColor[t], color: "#fff", borderRadius: "999px", padding: "1px 7px", fontSize: "9px" }}>{counts[t]}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ background: "#0f172a", minHeight: "100vh", padding: "2rem 1rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.35)" }}>
              <p style={{ fontSize: "1rem", fontWeight: 600 }}>No {activeTab.toLowerCase()} requests</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((req) => {
                const isExpanded = expandedId === req.id;
                const isActioning = actionLoading === req.id;
                return (
                  <div key={req.id} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "1.5rem", overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}>
                    {/* Header row */}
                    <div style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      {/* Avatar */}
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "12px",
                        background: "#f97316", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 900, fontSize: "14px",
                      }}>
                        {req.requester.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 800, fontSize: "0.9375rem", color: "#fff", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{req.title}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "4px" }}>
                          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "4px" }}>
                            <User size={11} /> {req.requester.name} · {req.requester.email}
                          </span>
                          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar size={11} /> {new Date(req.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "4px" }}>
                            <MapPin size={11} /> {req.venue}
                          </span>
                          <span style={{
                            fontSize: "10px", fontWeight: 800, padding: "2px 10px", borderRadius: "999px",
                            background: `${tabColor[req.status]}18`, color: tabColor[req.status],
                            textTransform: "uppercase", letterSpacing: "0.08em",
                          }}>{req.category}</span>
                        </div>
                      </div>
                      {/* Expand toggle */}
                      <button onClick={() => setExpandedId(isExpanded ? null : req.id)} style={{
                        background: "rgba(255,255,255,0.06)", border: "none",
                        borderRadius: "10px", padding: "8px 12px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "6px",
                        color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 700,
                        transition: "background 0.2s",
                      }}>
                        {isExpanded ? "Less" : "More"}
                        <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                      </button>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                          <DetailItem label="Description" value={req.description} multiline />
                          {req.shortDescription && <DetailItem label="Short Description" value={req.shortDescription} />}
                          {req.maxParticipants && <DetailItem label="Max Participants" value={String(req.maxParticipants)} />}
                          {req.teamSize && <DetailItem label="Team Size" value={req.teamSize} />}
                          {req.prizeMoney && <DetailItem label="Prize / Reward" value={req.prizeMoney} />}
                          {req.tags && <DetailItem label="Tags" value={req.tags} />}
                          {req.image && <DetailItem label="Image URL" value={req.image} />}
                          {req.message && <DetailItem label="Message from Student" value={req.message} highlight />}
                        </div>

                        {/* Approve / Reject actions for PENDING */}
                        {req.status === "PENDING" && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-start", marginTop: "0.5rem" }}>
                            <button
                              onClick={() => approve(req.id)}
                              disabled={isActioning}
                              style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                background: "#16a34a", color: "#fff", border: "none",
                                borderRadius: "12px", padding: "10px 22px", fontWeight: 800,
                                fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em",
                                cursor: isActioning ? "not-allowed" : "pointer", opacity: isActioning ? 0.6 : 1,
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              {isActioning
                                ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                                : <CheckCircle size={15} />}
                              Approve & Publish
                            </button>

                            {rejectOpen === req.id ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: "200px" }}>
                                <textarea
                                  className="req-note"
                                  style={inputStyle}
                                  rows={2}
                                  placeholder="Optional rejection note for the student..."
                                  value={rejectNote[req.id] || ""}
                                  onChange={e => setRejectNote(p => ({ ...p, [req.id]: e.target.value }))}
                                />
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button
                                    onClick={() => reject(req.id)}
                                    disabled={isActioning}
                                    style={{
                                      display: "flex", alignItems: "center", gap: "6px",
                                      background: "#dc2626", color: "#fff", border: "none",
                                      borderRadius: "10px", padding: "8px 18px", fontWeight: 800,
                                      fontSize: "0.8125rem", cursor: isActioning ? "not-allowed" : "pointer",
                                      fontFamily: "'DM Sans', sans-serif",
                                    }}
                                  >
                                    {isActioning ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <XCircle size={14} />}
                                    Confirm Reject
                                  </button>
                                  <button onClick={() => setRejectOpen(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontSize: "0.8125rem" }}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setRejectOpen(req.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: "8px",
                                  background: "rgba(239,68,68,0.10)",
                                  border: "1px solid rgba(239,68,68,0.25)",
                                  color: "#f87171", borderRadius: "12px", padding: "10px 22px",
                                  fontWeight: 800, fontSize: "0.8125rem", textTransform: "uppercase",
                                  letterSpacing: "0.08em", cursor: "pointer",
                                  fontFamily: "'DM Sans', sans-serif",
                                }}
                              >
                                <XCircle size={15} /> Reject
                              </button>
                            )}
                          </div>
                        )}

                        {/* Rejected note */}
                        {req.status === "REJECTED" && req.reviewNote && (
                          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)", borderRadius: "12px", padding: "12px 16px" }}>
                            <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f87171", margin: "0 0 6px" }}>Admin Note</p>
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", margin: 0 }}>{req.reviewNote}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function DetailItem({ label, value, multiline, highlight }: { label: string; value: string; multiline?: boolean; highlight?: boolean }) {
  return (
    <div style={{
      background: highlight ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${highlight ? "rgba(249,115,22,0.20)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: "10px", padding: "12px 14px",
    }}>
      <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: highlight ? "#f97316" : "rgba(255,255,255,0.35)", margin: "0 0 5px" }}>{label}</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8125rem", margin: 0, lineHeight: 1.5, whiteSpace: multiline ? "pre-wrap" : "normal" }}>{value}</p>
    </div>
  );
}
