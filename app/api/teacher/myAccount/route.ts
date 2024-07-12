import { myTeacherAccount } from "@/actions/teacher/myAccount";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  
  try{

    const myAccount=await myTeacherAccount();

    if(!myAccount){
      return NextResponse.json({message:"Account Not Found!"},{status:404})
    }


    return NextResponse.json(myAccount,{status:200})
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong!"},{status:500})
  }
}