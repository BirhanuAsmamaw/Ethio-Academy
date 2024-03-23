
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
  const body = await req.json();
  const {title} = body;

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
      return NextResponse.json({status:false, message:"chapter not found"});
    }

    const updatedChapter=await prisma.chapter.update({
      where: {id:chapterId},
      data:{
       title:title,
      }
    })
    return NextResponse.json(updatedChapter);
  }
  catch(err){}
}