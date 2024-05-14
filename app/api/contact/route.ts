
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
    return NextResponse.json(newMessage)
  }
  catch(err:any){
    throw new Error(err.message)
  }

}