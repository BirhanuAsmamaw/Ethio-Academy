
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  const {rating} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unauthorized"},{status:400});
    }

    const course=await prisma.course.findUnique({
      where: {id:id}
    })
    if(!course){
      return NextResponse.json({status:false, message:"course not found"},{status:404});
    }

    const updatedCourse=await prisma.course.update({
      where: {id:id},
      data:{rating:rating}
    })
    return NextResponse.json(updatedCourse);
  }
  catch(err){
    return NextResponse.json({message:"something went wrong!"},{status:500})
  }
}