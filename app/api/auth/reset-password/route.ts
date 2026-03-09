import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
        }

        // Find the token
        const record = await prisma.verificationToken.findUnique({ where: { token } });

        if (!record) {
            return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
        }

        if (new Date(record.expires) < new Date()) {
            await prisma.verificationToken.delete({ where: { token } });
            return NextResponse.json({ error: "This reset link has expired. Please request a new one." }, { status: 400 });
        }

        // Update the user's password
        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.user.update({
            where: { email: record.identifier },
            data: { password: hashedPassword },
        });

        // Delete the used token
        await prisma.verificationToken.delete({ where: { token } });

        return NextResponse.json({ message: "Password updated successfully!" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
