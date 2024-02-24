import { getCurrentUser } from "@/actions/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
export async function POST(req:Request){
  const body = await req.json();

  const user =await getCurrentUser();
  if (!user){
    return NextResponse.json({status:false, message:"unauthorized"});
  }

  if (user.role!=="ADMIN"){
    return NextResponse.json({status:false, message:"unauthorized"});

  }

  const {
    subject,
    category,
     cover,
     videoUrl,
     price,
     descriptions,
     requirements,
     whoShouldTake,
  }=body;



  if (!subject || !category || !cover || !price || !descriptions || !requirements || !whoShouldTake || !videoUrl ){
    return NextResponse.json({status:false, message:"invalid course parameters"});

  }
  const newCourse=await prisma.course.create({
    data:{
      creatorId:user.id,
      subject:subject,
      category:category,
      videoUrl:videoUrl,
      cover:cover,
      price:parseFloat(price),
      rating:0,
      descriptions:descriptions,
      requirements:requirements,
      whoShouldTake:whoShouldTake
    }
  })

  return NextResponse.json(newCourse);
}