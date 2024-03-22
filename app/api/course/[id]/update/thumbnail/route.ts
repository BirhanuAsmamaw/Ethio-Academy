import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  try{
   const {thumbnail} = body

   if(!thumbnail){
    throw new Error('thumbnail not Empty');
   }
   const course=await prisma.course.update({
    where: {id:id},
    data:{videoThumbnail:thumbnail}

   })
   return NextResponse.json(course)

  }
  catch(err){
    throw new Error("thumbnail Could not be updated")
  }
}