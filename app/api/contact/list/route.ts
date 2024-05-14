import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function GET(req:NextRequest){
  try{
    const user=await getCurrentUser();

    if(!user){
      throw new Error("unAuthenticated!")
    }

    const isViewCustomerData=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewCustomerMessage") 

    if(!isViewCustomerData){
      throw new Error("Forbidden Resource")
    }
    const customersData=await prisma.contact.findMany();
    return NextResponse.json(customersData)
  }
  catch(err:any){
throw new Error(err.message)
  }
}