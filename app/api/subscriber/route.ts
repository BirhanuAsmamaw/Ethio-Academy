import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request,res:Response){
const body=await req.json();
  try{
    const {userId,accountId}=body;
    if(!userId||!accountId){
      return NextResponse.json("invalid Parameters",{status:400})
    }
    const newSubscribers=await prisma.subscriber.create({
      data:{
        userId:userId,
        teacherId:accountId
      }
    });

    return NextResponse.json(newSubscribers)

  }
  catch(err){

return NextResponse.json("something went wrong",{status:500})
  }
}