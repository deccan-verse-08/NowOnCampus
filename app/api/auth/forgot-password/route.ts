import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        // Always return success to prevent email enumeration attacks
        if (!user || !user.password) {
            return NextResponse.json({ message: "If this email exists, a reset link has been sent." });
        }

        // Generate a secure random token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Delete any existing token for this user, then create new one
        await prisma.verificationToken.deleteMany({
            where: { identifier: email },
        });

        await prisma.verificationToken.create({
            data: { identifier: email, token, expires },
        });

        await sendPasswordResetEmail(email, user.name || "there", token);

        return NextResponse.json({ message: "If this email exists, a reset link has been sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
