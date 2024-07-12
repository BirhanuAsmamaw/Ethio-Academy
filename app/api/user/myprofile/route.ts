import { getCurrentUser } from "@/actions/users/currentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

  try{

    const user=await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
    }

    return NextResponse.json(user,{status:200})
  }
  catch(err){

    return NextResponse.json({message:"Something went wrong!"},{status:500})

  }
  
}