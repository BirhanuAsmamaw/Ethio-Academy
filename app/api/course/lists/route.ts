import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get("search");

  const page = parseInt(searchParams.get("page") || "1", 10); // Parse page query parameter, default to 1 if not provided

  try {
    const pageSize = 4; // Number of courses per page
    const skip = (page - 1) * pageSize;

   

    const courses = await prisma.course.findMany({
      where: searchQuery?{
        OR: [
            {course:{contains:searchQuery,mode: "insensitive"}}, // Search by course name

            { subject: { subjectName:{ contains: searchQuery, mode: "insensitive" } } }, // Search by subject name

            { subject: { department: { departmentName: { contains: searchQuery, mode: "insensitive" } } } }, // Search by department name
          ],
      }:{},
      include: {
        reviews: true,
        instructor: {
          include: {
            user: true,
          },
        },
        subject: {
          include: {
            department: true,
          },
        },
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
      skip: skip,
      take: pageSize,
    });

    const count = await prisma.course.count({ where:searchQuery?{
      OR: [
          {course:{contains:searchQuery,mode: "insensitive"}}, // Search by course name

          { subject: { subjectName:{ contains: searchQuery, mode: "insensitive" } } }, // Search by subject name

          { subject: { department: { departmentName: { contains: searchQuery, mode: "insensitive" } } } }, // Search by department name
        ],
    }:{}, }); // Total count of courses matching the search criteria

    // Calculate pagination info
    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      courses,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}
