import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  try{
   const {cover} = body

   if(!cover){
    throw new Error('Cover not Empty');
   }
   const course=await prisma.course.update({
    where: {id:id},
    data:{cover:cover}

   })
   return NextResponse.json(course)

  }
  catch(err){
    throw new Error("Cover Could not be updated")
  }
}