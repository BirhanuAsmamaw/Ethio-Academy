
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{userId:string}}){
  const userId=params.userId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const userData=await prisma.user.findUnique({
      where: {id:userId}
    })
    if(!userData){
      return NextResponse.json({status:false, message:"user not found"});
    }
await prisma.user.delete({
      where: {id:userId},
      
    })
    return NextResponse.json({
      success: true,
      message:"User deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}