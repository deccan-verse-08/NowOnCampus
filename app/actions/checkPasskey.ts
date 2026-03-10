"use server";

import { prisma } from "@/lib/db";

export async function checkPasskeyExists(email: string) {
    if (!email) return false;
    
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                Authenticator: true,
            },
        });

        if (!user) return false;
        
        return user.Authenticator && user.Authenticator.length > 0;
    } catch (error) {
        console.error("Failed to check passkey status:", error);
        return false;
    }
}
