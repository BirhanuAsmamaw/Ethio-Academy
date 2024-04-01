
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";

export async function POST(req:Request){
const body=await req.json();

const {
  departmentId,
  
   bank,
   courses,
   transaction,
   totalPrice,
}=body;

if (!transaction || !bank || !totalPrice ){
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




const newPayment = await prisma.payment.create({
  data:{
    
    transaction: transaction,
    totalPrice: parseFloat(totalPrice),
    bank:bank,
    courses: courses,
    customerId:user.id,
   departmentId:departmentId

  }
})

return NextResponse.json(newPayment)

}