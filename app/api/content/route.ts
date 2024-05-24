import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { lessonId,parentId, language, content, code, image } = body;

    let codeExample;
    if (!code || !language) {
      codeExample = null;
    } else {
      codeExample = {
        language: language,
        code: code
      };
    }

    // Authorization
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!lessonId) {
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

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        chapter: {
          course: {
            instructorId: user.teacher.id,
          },
        },
      },
      include: {
        chapter: {
          include: {
            course: {
              include: {
                payments: {
                  include: {
                    payment: {
                      include: {
                        customer: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new Error("No lesson Found!");
    }

    const newContent = await prisma.content.create({
      data: {
        parentId:parentId,
        lessonId: lesson.id,
        content: content,
        image: image,
        codeExample: codeExample
      }
    });

    const learners = lesson.chapter.course.payments?.map((payment) => ({
      id: payment.payment.customer.id || "",
      name: payment.payment.customer.name || "",
      email: payment.payment.customer.email || ""
    }));

    await prisma.notification.create({
      data: {
        url: `/course/${lesson?.chapter?.courseId}/${lesson?.chapterId}/${lesson.id}`,
        type: "Info",
        title: `New Content Added to ${lesson.chapter.course.course}!`,
        message: `Hi students! 🎉 We've just added exciting new content to your course: "${newContent.content?.substring(0, 20) + '...'}". Log in now to check it out and keep learning!`,
        userId: user.id,
        customers: learners
      },
    });

    return NextResponse.json(newContent);
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
