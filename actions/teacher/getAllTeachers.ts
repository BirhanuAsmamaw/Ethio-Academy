import prisma from "@/lib/prismadb";

export async function getAllTeachers() {
  try {
    const allTeachers = await prisma.teacher.findMany({
      where: { status: true },
      include: {
        subscribers: {
          include: {
            user: true,
          },
        },
        courses: {
          include: {
            payments: true,
          },
        },
        user: true,
      },
    });

    // Calculate the number of learners by summing up payments for each course
    const instructors = allTeachers.map((instructor) => {
      const learners = instructor.courses.reduce((total, course) => total + course.payments.length, 0);

      return {
        ...instructor,
        learner_no: learners,
        subscribe_no: instructor.subscribers.length,
        course_no: instructor.courses.length,
      };
    });

    return instructors;
  } catch (e) {
    console.error(e);
    return null;
  }
}
