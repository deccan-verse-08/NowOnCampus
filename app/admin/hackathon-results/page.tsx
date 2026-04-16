import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CreateResultPostForm } from "./CreateResultPostForm";
import { PublishedWinnerAnnouncements } from "./PublishedWinnerAnnouncements";

export default async function AdminHackathonResultsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });
    if (user?.role !== "ADMIN") redirect("/");

    const [hackathons, resultPosts] = await Promise.all([
        prisma.event.findMany({
            where: { category: "HACKATHON" },
            orderBy: { date: "desc" },
            select: { id: true, title: true, date: true },
        }),
        prisma.hackathonResultPost.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                event: { select: { id: true, title: true } },
                createdBy: { select: { name: true } },
            },
        }),
    ]);

    const serializablePosts = resultPosts.map((post) => ({
        id: post.id,
        event: {
            id: post.event.id,
            title: post.event.title,
        },
        createdBy: {
            name: post.createdBy.name,
        },
        winningTeamName: post.winningTeamName,
        announcement: post.announcement,
        createdAt: post.createdAt.toISOString(),
    }));

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-orange-500" />
                            Hackathon Winner Posts
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Publish and manage announcements of winning teams.
                        </p>
                    </div>

                    <CreateResultPostForm hackathons={hackathons} />

                    <PublishedWinnerAnnouncements initialPosts={serializablePosts} />
                </div>
            </div>
            <Footer />
        </>
    );
}
