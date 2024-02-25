import { getCurrentUser } from "@/actions/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function POST(req:Request){
const body=await req.json();

const {
 
  recit,
   bank,
   courses,
   transaction,
   totalPrice,
}=body;

if (!transaction || !bank || !totalPrice ||  !recit || !courses.length ){
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
    recit: recit,
    transaction: transaction,
    totalPrice: totalPrice,
    bank:bank,
    courses: courses,
    customerId:user.id

  }
})

return NextResponse.json(newPayment)

}