
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{paymentId:string}}){
  const paymentId=params.paymentId;
  

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    const payment=await prisma.payment.findUnique({
      where: {id:paymentId}
    })

    if(!payment){
      return NextResponse.json({status:false, message:"payment not found"});
    }

    const approvePayment=await prisma.payment.update({
      where: {id:paymentId},
      data:{status:true}
    })
    return NextResponse.json(approvePayment);
  }
  catch(err){}
}