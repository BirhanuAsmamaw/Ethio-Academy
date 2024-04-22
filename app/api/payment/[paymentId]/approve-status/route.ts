
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{paymentId:string}}){
  const paymentId=params.paymentId;
  

  try{
       // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanApprovePayment" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
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