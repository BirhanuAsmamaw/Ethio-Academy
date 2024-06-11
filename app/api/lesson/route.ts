
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { chapterId, title } = body;

    // Authorization
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!chapterId || !title) {
      throw new Error("Invalid parameters");
    }

    const isDataAccessed = user.permissions.some(
      (permission) => permission.permission.action === "CanManageOwnCourse"
    );
    if (!isDataAccessed) {
      throw new Error("Forbidden Resource");
    }

    if (!user.teacher) {
      throw new Error("Unauthorized");
    }

    if (!user.teacher.status) {
      throw new Error("Unauthorized");
    }

    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        course: {
          instructorId: user.teacher.id,
        },
      },
      include: {
        course: {
          select: {
            course: true,
            payments: {
              select: {
                payment: {
                  select: {
                    customerId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!chapter) {
      throw new Error("No chapter found!");
    }

    const newLesson = await prisma.lesson.create({
      data: {
        chapterId: chapter.id,
        title: title,
      },
    });

    // Send notifications to all course subscribers about the new lesson
    if (chapter.course.payments) {
      await Promise.all(
        chapter.course.payments.map(async (payment) => {
          await prisma.notification.create({
            data: {
              url: `/course/${chapter?.courseId}/${chapter?.id}/${newLesson?.id}`,
              type: "Info",
              title: `New Content Added to ${chapter.course.course}!`,
              message: `Hi students! 🎉 We've just added exciting new content to your course: "${newLesson?.title?.substring(0, 20) + '...'}". Log in now to check it out and keep learning!`,
              userId: payment.payment.customerId,
              senderId: user.id,
            },
          });
        })
      );
    }

    return NextResponse.json(newLesson);
  } catch (err) {
    throw new Error("Something went wrong");
  }
}