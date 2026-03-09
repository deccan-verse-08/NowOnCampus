import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Use identifier = "otp:" + email to avoid collision with password reset tokens
        await prisma.verificationToken.deleteMany({
            where: { identifier: `otp:${email}` },
        });

        await prisma.verificationToken.create({
            data: { identifier: `otp:${email}`, token: otp, expires },
        });

        await sendOtpEmail(email, user.name || "Student", otp);

        return NextResponse.json({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
