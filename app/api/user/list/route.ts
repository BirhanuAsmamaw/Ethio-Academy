

import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  

  const page = parseInt(searchParams.get("page") || "1"); // Parse page query parameter, default to 1 if not provided
  const pageSize = parseInt(searchParams.get("pageSize") || "5"); // Number of users per page

  


  try {
   
    const skip = (page - 1) * pageSize;
 // Construct the where condition based on searchQuery, priceFilter, and ratingFilter

   

    const users = await prisma.user.findMany({
     
      orderBy: {
        createdAt: 'desc', 
      }, 
       
      include:{
        payedCourses:true,
        permissions:{
          include:{
            permission:true
          },
          
        },
      },
      skip: skip,
      take: pageSize,
    });

    const count = await prisma.user.count({where:{
      }}); // Total count of users matching the search criteria

    // Calculate pagination info
    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      users,
      totalUsers:count,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (e) {
    console.error("Error:", e);
     throw new Error("Something went wrong");
  }
}
