import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getCurrentUser } from '@/actions/users/currentUser';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { courseId } = body;

    // Get the current date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    // Check if the streak already exists
    const existingStreak = await prisma.courseStreak.findFirst({
      where: {
        courseId: courseId,
        userId: user.id,
      },
    });

    if (existingStreak) {
      const lastUpdated = new Date(existingStreak?.streak?.endAt||0);
      lastUpdated.setHours(0, 0, 0, 0);

      // Check if the last update was today
      if (lastUpdated.getTime() === today.getTime()) {
        return NextResponse.json({ message: 'Streak already updated today' }, { status: 200 });
      }

      // Determine if the streak should reset
      let newStreakCount = 0;
      if (lastUpdated.getTime() === yesterday.getTime()) {
        newStreakCount = existingStreak?.streak?.streak||0 + 1;
      } else {
        newStreakCount = 1; // Reset streak if dates are not consecutive
      }

      // Determine the new longest streak
      const longestStreakCount = existingStreak.longestStreak?.streak ?? 0;
      const newLongestStreak = Math.max(longestStreakCount, newStreakCount);

      // Handle potential undefined value for longestStreak.endAt
      const longestStreakEndAt = existingStreak.longestStreak?.endAt
        ? existingStreak.longestStreak.endAt
        : new Date();

        const currentStreakEndAt = existingStreak.streak?.endAt
        ? existingStreak.streak.endAt
        : new Date();

      // Increment the existing streak by 1 or reset to 1
      const updatedStreak = await prisma.courseStreak.update({
        where: { id: existingStreak.id },
        data: {
          longestStreak: {
            streak: newLongestStreak >= longestStreakCount ? newLongestStreak:longestStreakCount,
            startAt: newLongestStreak >= longestStreakCount 
                     ? existingStreak.streak?.startAt 
                     : existingStreak.longestStreak?.startAt,
            endAt: newLongestStreak > longestStreakCount ?currentStreakEndAt : longestStreakEndAt,
          },
          streak: {
            endAt: new Date(),
            streak: newStreakCount,
            startAt: newStreakCount == 1 ? new Date() : existingStreak.streak?.startAt,
          },
        },
      });

      return NextResponse.json(updatedStreak, { status: 200 });
    } else {
      // Create a new streak
      const newCourseStreak = await prisma.courseStreak.create({
        data: {
          courseId: courseId,
          userId: user.id,
          longestStreak: {
            streak: 1,
            startAt: new Date(),
            endAt: new Date(),
          },
          streak: {
            streak: 1,
            startAt: new Date(),
            endAt: new Date(),
          },
        },
      });

      return NextResponse.json(newCourseStreak, { status: 201 });
    }
  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
