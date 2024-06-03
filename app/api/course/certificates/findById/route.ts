import { getCurrentUser } from "@/actions/users/currentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const courseId = searchParams.get("courseId") || "";

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    // Check if the course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return NextResponse.json({ message: "Course does not exist" }, { status: 404 });
    }

    // Find course certificates
    const courseCertificate = await prisma.courseCertificate.findFirst({
      where: { courseId: course.id, userId: user.id },
      select: {
        lessonCertificates: {
          select: {
            lesson: true,
          },
        },
        course: {
          select: {
            chapters: {
              select: {
                lessons: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!courseCertificate) {
      return NextResponse.json({ message: "No certificates found for this course" }, { status: 404 });
    }

    const totalLessons = courseCertificate.course.chapters.reduce(
      (total, chapter) => total + chapter.lessons.length,
      0
    );
    const totalLessonCertificates = courseCertificate.lessonCertificates.length;
    const coursePercent = (totalLessonCertificates / totalLessons) * 100;

    return NextResponse.json({ ...courseCertificate, coursePercent });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
