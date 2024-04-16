
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
  const body = await req.json();
  const {content} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const contentData=await prisma.content.findUnique({
      where: {id:contentId}
    })
    if(!contentData){
      return NextResponse.json({status:false, message:"content not found"});
    }

    const updatedcontent=await prisma.content.update({
      where: {id:contentId},
      data:{
        content:content,
       
      }
    })
    return NextResponse.json(updatedcontent);
  }
  catch(err){}
}