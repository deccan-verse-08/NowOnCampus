import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true, name: true, email: true, image: true, role: true, createdAt: true,
            _count: { select: { registrations: true } },
        },
    });

    return NextResponse.json(users);
}
