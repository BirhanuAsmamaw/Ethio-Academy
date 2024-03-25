
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{examId:string}}){
  const examId=params.examId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const exam=await prisma.exam.findUnique({
      where: {id:examId}
    })
    if(!exam){
      return NextResponse.json({status:false, message:"exam not found"});
    }

 await prisma.exam.delete({
      where: {id:examId},
      
    })
    return NextResponse.json({
      success:true,
      message:"exam deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}