
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{questionId:string}}){
  const questionId=params.questionId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const question=await prisma.question.findUnique({
      where: {id:questionId}
    })
    if(!question){
      return NextResponse.json({status:false, message:"question not found"});
    }

 await prisma.question.delete({
      where: {id:questionId},
      
    })
    return NextResponse.json({
      success:true,
      message:"question deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}