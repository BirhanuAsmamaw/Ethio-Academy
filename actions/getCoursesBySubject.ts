// Assuming you have a PrismaClient instance in "@/lib/prismadb"
import prisma from "@/lib/prismadb";

export async function getCoursesBySubject(subject:string, page = 1, pageSize = 10) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        subject: {
          equals: subject,
        },
      },
     
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return courses;
  } catch (e) {
    console.error('Error:', e);
    return null;
  }
}
