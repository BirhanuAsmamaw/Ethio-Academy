import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    // Get the current date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const user: any = await getCurrentUser();
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "Unauthorized"
      }, { status: 401 });
    }

    const currentStreak = user?.currentStreak ?user?.currentStreak:{ streak: 0, endAt: new Date() };
    const longestStreak = user?.longestStreak ?user?.longestStreak:{ streak: 0, endAt: new Date() };

    const lastUpdated = new Date(currentStreak?.endAt);
    lastUpdated.setHours(0, 0, 0, 0);

    // Check if the last update was today
    if (lastUpdated.getTime() === today.getTime()) {
      return NextResponse.json({ message: 'Streak already updated today' }, { status: 200 });
    }

    // Determine if the streak should reset or increment
    let newStreakCount = 0;
    if (lastUpdated.getTime() === yesterday.getTime()) {
      newStreakCount = currentStreak.streak + 1;
    } else {
      newStreakCount = 1; // Reset streak if dates are not consecutive
    }

    // Determine the new longest streak
    const longestStreakCount = longestStreak?.streak ?? 0;
    const newLongestStreak = Math.max(longestStreakCount, newStreakCount);

    // Update streaks
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak: {
          streak: newStreakCount,
          startAt: newStreakCount == 1 ? new Date() : currentStreak?.startAt,
          endAt: new Date()
        },
        longestStreak: {
          streak:newLongestStreak,
          startAt: newLongestStreak >= longestStreakCount ? currentStreak?.startAt : longestStreak?.startAt,
          endAt: newLongestStreak >= longestStreakCount ? currentStreak?.endAt : longestStreak?.endAt
        }
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
