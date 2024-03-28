
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
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
    department,
     price,
     descriptions,
     requirements,
     whoShouldTake,
  }=body;



  if (!subject || !department ||  !price || !descriptions || !requirements || !whoShouldTake ){
    return NextResponse.json({status:false, message:"invalid course parameters"});

  }
  const newCourse=await prisma.course.create({
    data:{
      creatorId:user.id,
      subject:subject,
      department:department,
      price:parseFloat(price),
      rating:0,
      descriptions:descriptions,
      requirements:requirements,
      whoShouldTake:whoShouldTake
    }
  })

  return NextResponse.json(newCourse);
}