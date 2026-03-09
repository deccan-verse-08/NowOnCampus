import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { EditEventForm } from "./EditEventForm";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== "ADMIN") redirect("/");

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) notFound();

    return <EditEventForm event={event} />;
}
