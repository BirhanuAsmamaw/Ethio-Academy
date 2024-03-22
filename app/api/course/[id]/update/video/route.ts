import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  try{
   const {video} = body

   if(!video){
    throw new Error('video not Empty');
   }
   const course=await prisma.course.update({
    where: {id:id},
    data:{videoUrl:video}

   })
   return NextResponse.json(course)

  }
  catch(err){
    throw new Error("video Could not be updated")
  }
}