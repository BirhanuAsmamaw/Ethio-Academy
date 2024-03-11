
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";

export async function POST(req:Request){
const body=await req.json();

const {
  department,
  recit,
   bank,
   courses,
   transaction,
   totalPrice,
}=body;

if (!transaction || !bank || !totalPrice ||  !recit ){
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
    totalPrice: parseFloat(totalPrice),
    bank:bank,
    courses: courses,
    customerId:user.id,
    department:department

  }
})

return NextResponse.json(newPayment)

}