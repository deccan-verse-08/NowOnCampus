"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteEventButton({ eventId }: { eventId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone and will remove all registrations.")) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/events/${eventId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete event");
            }

            // Refresh the server component to update the list
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to delete event");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-1.5 rounded-lg transition-colors ${
                isDeleting 
                    ? "text-red-300 cursor-not-allowed" 
                    : "text-red-500 hover:text-red-600 hover:bg-red-50"
            }`}
            title="Delete Event"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
