import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Ensure the user is authenticated
  // Retrieve session claims and room details
  const { sessionClaims } = await auth();
  const { room } = await req.json();

  if (!sessionClaims?.email || !room) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }

  // Prepare the Liveblocks session
  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullName!,
      email: sessionClaims.email!,
      avatar: sessionClaims.image!,
    },
  });

  // Check if the user is in the room
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    // Grant full access to the room
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}
