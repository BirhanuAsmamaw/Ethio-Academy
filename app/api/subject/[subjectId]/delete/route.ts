
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const subject=await prisma.subject.findUnique({
      where: {id:subjectId}
    })
    if(!subject){
      return NextResponse.json({status:false, message:"subject not found"});
    }

 await prisma.subject.delete({
      where: {id:subjectId},
      
    })
    return NextResponse.json({
      success:true,
      message:"subject deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}