
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{userId:string}}){
  const userId=params.userId;
  const body = await req.json();
  const {role} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const UserData=await prisma.user.findUnique({
      where: {id:userId}
    })
    if(!UserData){
      return NextResponse.json({status:false, message:"User not found"});
    }
    const updatedUser=await prisma.user.update({
      where: {id:userId},
      data:{
        role:role
      }
    })
    return NextResponse.json(updatedUser);
  }
  catch(err){}
}