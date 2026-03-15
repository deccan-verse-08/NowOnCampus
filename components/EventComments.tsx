"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MessageSquare, Star, Loader2, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  text: string;
  rating: number | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export function EventComments({ eventId }: { eventId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  async function fetchComments() {
    try {
      const res = await fetch(`/api/events/${eventId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          rating: rating > 0 ? rating : null,
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setText("");
        setRating(0);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ed-card">
      <div className="ed-card-pad">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
          <MessageSquare size={18} color="#f97316" />
          <h2 className="ed-section-title" style={{ margin: 0, fontSize: "1.5rem" }}>
            Comments & Reviews
          </h2>
          <span style={{ fontSize: "0.875rem", color: "#94a3b8", fontWeight: 700, marginLeft: "auto" }}>
            {comments.length}
          </span>
        </div>

        {/* Comment Form */}
        <div style={{ marginBottom: "2rem", background: "#f8fafc", padding: "1.25rem", border: "1px solid #f1f5f9", borderRadius: "1rem" }}>
          {session ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{ width: "36px", height: "36px", borderRadius: "10px", objectFit: "cover", background: "#e2e8f0" }}
                  />
                ) : (
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", background: "#f97316",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0,
                    fontFamily: "'Bebas Neue', sans-serif"
                  }}>
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                    {session.user?.name || "Anonymous"}
                  </p>
                  <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}
                      >
                        <Star
                          size={14}
                          fill={star <= (hoverRating || rating) ? "#fbbf24" : "transparent"}
                          color={star <= (hoverRating || rating) ? "#fbbf24" : "#cbd5e1"}
                          style={{ transition: "all 0.1s" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts or review about this event..."
                style={{
                  width: "100%", minHeight: "80px", padding: "12px 16px",
                  borderRadius: "12px", border: "1px solid #e2e8f0",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem",
                  resize: "vertical", outline: "none", color: "#1e293b",
                  marginBottom: "1rem"
                }}
              />
              
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: text.trim() ? "#f97316" : "#cbd5e1",
                    color: "#fff", border: "none", padding: "10px 20px",
                    borderRadius: "10px", fontSize: "0.875rem", fontWeight: 800,
                    cursor: text.trim() && !submitting ? "pointer" : "not-allowed",
                    transition: "all 0.2s"
                  }}
                >
                  {submitting ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={16} />}
                  Post Comment
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <p style={{ color: "#64748b", fontSize: "0.9375rem", marginBottom: "1rem" }}>
                Log in to write a review or comment on this event.
              </p>
              <button
                onClick={() => router.push("/login")}
                style={{
                  background: "#1e293b", color: "#fff", border: "none",
                  padding: "10px 24px", borderRadius: "10px", fontSize: "0.875rem",
                  fontWeight: 700, cursor: "pointer"
                }}
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
              <Loader2 size={24} color="#f97316" style={{ animation: "spin 1s linear infinite" }} />
            </div>
          ) : comments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 0", color: "#94a3b8" }}>
              <MessageSquare size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: "0.9375rem" }}>No comments yet. Be the first!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} style={{ display: "flex", gap: "1rem" }}>
                {comment.user.image ? (
                  <img
                    src={comment.user.image}
                    alt={comment.user.name || ""}
                    style={{ width: "40px", height: "40px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
                  />
                ) : (
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px", background: "#f97316",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 800, fontSize: "1.2rem", flexShrink: 0,
                    fontFamily: "'Bebas Neue', sans-serif"
                  }}>
                    {comment.user.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9375rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {comment.user.name || "Anonymous"}
                    </p>
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  {comment.rating && (
                    <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          fill={star <= comment.rating! ? "#fbbf24" : "transparent"}
                          color={star <= comment.rating! ? "#fbbf24" : "#cbd5e1"}
                        />
                      ))}
                    </div>
                  )}
                  
                  <p style={{ color: "#475569", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
