
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const university=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!university){
      return NextResponse.json({status:false, message:"university not found"});
    }

 await prisma.university.delete({
      where: {id:universityId},
      
    })
    return NextResponse.json({
      success:true,
      message:"university deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}