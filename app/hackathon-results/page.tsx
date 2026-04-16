import { prisma } from "@/lib/db";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function HackathonResultsPage() {
    const resultPosts = await prisma.hackathonResultPost.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            event: { select: { id: true, title: true, date: true } },
        },
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                    <div className="text-center mb-10">
                        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wide">
                            <Trophy className="w-3.5 h-3.5" /> Winners Board
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                            Hackathon Winner Announcements
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm sm:text-base">
                            See the latest winning teams from our campus hackathons.
                        </p>
                    </div>

                    {resultPosts.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                            <p className="text-slate-500">No winner announcements published yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {resultPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
                                >
                                    <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                                        {post.event.title}
                                    </p>
                                    <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                                        🏆 {post.winningTeamName}
                                    </h2>
                                    <p className="text-slate-600 mt-2">{post.announcement}</p>
                                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                        <span>
                                            {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span>•</span>
                                        <Link
                                            href={`/events/${post.event.id}`}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View Hackathon
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
