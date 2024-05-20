import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
  try{
    const payments = await prisma.payment.findMany({
      include:{
        customer:true,
        department:true,
        courses:true
      }
    });
    
  
  return NextResponse.json(payments)
  }catch(e){
   
    return NextResponse.json({message:"something went wrong"},{status:200})
  }
  
}