
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function GET(req: Request, {params}:{params:{paymentId:string}}){
  const paymentId=params.paymentId;
  

  try{
   
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanApprovePayment" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
}
    const payment=await prisma.payment.findUnique({
      where: {id:paymentId},
      include:{
        customer:true,
        courses:true,
        department:true
      }
    })

   
    return NextResponse.json(payment);
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong!"},{status:500})
  }
}