import prisma from "@/lib/prismadb";

export async function getCoursesBySubject(subject: string) {
  try {
    const ccourses = await prisma.course.findMany({
      
    });

    const courses = ccourses.filter((course)=>course.department.code===subject);
    return courses;
  } catch (e) {
    console.error('Error:', e);
    return null;
  }
}
