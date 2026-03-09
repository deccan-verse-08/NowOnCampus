import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // OTP-based credentials provider
        // Frontend: Step 1 calls /api/auth/send-otp (validates password, sends OTP)
        //           Step 2 calls signIn("credentials", { email, otp })
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.otp) return null;

                const email = credentials.email as string;
                const otp = credentials.otp as string;

                // Look up the OTP token stored during step 1
                const record = await prisma.verificationToken.findFirst({
                    where: { identifier: `otp:${email}`, token: otp },
                });

                if (!record) return null;

                // Check expiry
                if (new Date(record.expires) < new Date()) {
                    await prisma.verificationToken.delete({ where: { token: otp } });
                    return null;
                }

                // Consume the OTP (one-time use)
                await prisma.verificationToken.delete({ where: { token: otp } });

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as { role?: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
});
