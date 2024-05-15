
import { getAllUsers } from "@/actions/users/getAllUsers";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req:Request,res:Response){

  try{
    const body=await req.json()
    const {name,email,message}=body
    if(!name || !email || !message){
      throw new Error("invalid params")
    }
    const newMessage=await prisma.contact.create({
      data:{
        name:name,
        email:email,
        message:message
      }
    });

    const users=await getAllUsers();
   

  //   const filteredUser=users?.filter(user=>user?.permissions.some((permission:any)=>permission.permission.action === "CanViewCustomerMessage")) 

  //  try{
  //   if(!newMessage){
  //     return NextResponse.json("no messages created",{status:400})
  //   }
  //   await prisma.notification.create({
      
  //   })
  //  }
  //  catch(err){

  //   return NextResponse.json("something went wrong",{status:500})
  //  }
    return NextResponse.json(newMessage)
  }
  catch(err:any){
    throw new Error(err.message)
  }

}