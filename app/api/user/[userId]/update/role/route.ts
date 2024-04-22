
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
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageUser" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
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
        
      }
    })
    return NextResponse.json(updatedUser);
  }
  catch(err){}
}