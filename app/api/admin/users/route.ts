import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true, name: true, email: true, image: true, role: true, isSuperAdmin: true, createdAt: true,
            _count: { select: { registrations: true } },
        },
    });

    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true, isSuperAdmin: true },
    });
    if (admin?.role !== "ADMIN" || !admin.isSuperAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, email, password } = (await request.json()) as {
        name?: string;
        email?: string;
        password?: string;
    };

    const cleanName = name?.trim();
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
        return NextResponse.json(
            { error: "Name, email, and password are required." },
            { status: 400 },
        );
    }

    if (password.length < 6) {
        return NextResponse.json(
            { error: "Password must be at least 6 characters." },
            { status: 400 },
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
        select: { id: true },
    });
    if (existingUser) {
        return NextResponse.json(
            { error: "A user with this email already exists." },
            { status: 409 },
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdAdmin = await prisma.user.create({
        data: {
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword,
            role: "ADMIN",
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            isSuperAdmin: true,
            createdAt: true,
            _count: { select: { registrations: true } },
        },
    });

    return NextResponse.json(
        { message: "Admin account created successfully.", user: createdAdmin },
        { status: 201 },
    );
}
