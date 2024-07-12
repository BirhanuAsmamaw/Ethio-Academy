import { myPermissions } from "@/actions/authorization/myPermission";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

  try{

    const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }

    return NextResponse.json(permissions,{status:200})
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
  }
  
}