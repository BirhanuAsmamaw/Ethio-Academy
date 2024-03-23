
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const chapter=await prisma.chapter.findUnique({
      where: {id:chapterId}
    })
    if(!chapter){
      return NextResponse.json({status:false, message:"course not found"});
    }

  await prisma.chapter.delete({
      where: {id:chapterId}
      
    })
    return NextResponse.json({
      message:"Chapter deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}