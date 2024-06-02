import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { reservedUsernames } from "@/lib/reservednames";

export async function PUT(req: Request) {
  const body = await req.json();
  const { username } = body;

  // Validate username length
  if (!username || username.length < 4) {
    return NextResponse.json({ message: "Username must be at least 4 characters long" }, { status: 400 });
  }

  // Validate username characters
  const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!validUsernameRegex.test(username)) {
    return NextResponse.json({ message: "Username can only contain letters, numbers, and underscores" }, { status: 400 });
  }

  

  // Check if username is reserved
  if (reservedUsernames.map(name => name.toLowerCase()).includes(username.toLowerCase())) {
    return NextResponse.json({ message: "The username is already reserved" }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    // Check if the username already exists
    const findUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    if (findUser) {
      return NextResponse.json({ message: "The username already exists" }, { status: 400 });
    }

    // Update the user's username
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: { username: username }
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
