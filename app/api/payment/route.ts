import { getCurrentUser } from "@/actions/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { GetCourseById } from "@/actions/getCourseById";
export async function POST(req:Request){
const body=await req.json();

const {
  courseId,
  recit,
   bank,
   transaction,
   price 
}=body;

if (!transaction || !bank || !price ||  !recit || !courseId){
  return NextResponse.json({
    status: false,
    message:"Invalid payment parameters"
  })
}


const user=await getCurrentUser();

if (!user){
  return NextResponse.json({
    status: false,
    message:"unathorized!"
  })
}


const course=await GetCourseById(courseId)

if (!course){
  return NextResponse.json({
    status: false,
    message:"course not found"
  })
}

const newPayment = await prisma.payment.create({
  data:{
    recit: recit,
    transaction: transaction,
    price: price,
    bank:bank,
    courseId:course.id,
    customerId:user.id

  }
})

return NextResponse.json(newPayment)

}