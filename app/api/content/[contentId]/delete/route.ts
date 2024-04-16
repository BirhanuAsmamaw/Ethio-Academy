
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const content=await prisma.content.findUnique({
      where: {id:contentId}
    })
    if(!content){
      return NextResponse.json({status:false, message:"content not found"});
    }

 await prisma.content.delete({
      where: {id:contentId},
      
    })
    return NextResponse.json({
      success:true,
      message:"content deleted successfully"
    });
  }
  catch(err){
 
  }
}