import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get("filter")||"";
try{
  const courses=await prisma.course.findMany({
    where:{subjectId:searchQuery}
  });

  return  NextResponse.json(courses);

}
catch(err){
throw new Error("Something went wrong")
}
}