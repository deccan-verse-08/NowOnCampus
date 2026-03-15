import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Context) {
  const { id: eventId } = await params;

  try {
    const comments = await prisma.eventComment.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Context) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: eventId } = await params;

  try {
    const { text, rating } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    let parsedRating = null;
    if (rating !== undefined && rating !== null) {
      parsedRating = Number(rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return NextResponse.json(
          { error: "Rating must be an integer between 1 and 5" },
          { status: 400 }
        );
      }
    }

    const comment = await prisma.eventComment.create({
      data: {
        text: text.trim(),
        rating: parsedRating,
        eventId,
        userId: session.user.id,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
