
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
  const body = await req.json();
  const {name,code} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const universityData=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!universityData){
      return NextResponse.json({status:false, message:"course not found"});
    }

    const updateduniversity=await prisma.university.update({
      where: {id:universityId},
      data:{
        name:name,
        code:code,
      }
    })
    return NextResponse.json(updateduniversity);
  }
  catch(err){}
}