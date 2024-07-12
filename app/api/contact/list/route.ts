import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function GET(req:NextRequest){
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
    const isViewCustomerData=permissions?.some((permission:any)=>permission?.action === "CanViewCustomerMessage") 

    if(!isViewCustomerData){
      
      return NextResponse.json({message:"Forbidden Resource!"},{status:400})
    }
    const customersData=await prisma.contact.findMany();
    
    return NextResponse.json(customersData)
  }
  catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}