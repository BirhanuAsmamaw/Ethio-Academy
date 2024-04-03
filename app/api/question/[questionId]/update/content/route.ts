
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{questionId:string}}){
  const questionId=params.questionId;
  const body = await req.json();
  const {title_two,title,year} = body;

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

    const updatedquestion=await prisma.question.update({
      where: {id:questionId},
      data:{
        title:title,
       title_two:title_two,
       year:year,
      }
    })
    return NextResponse.json(updatedquestion);
  }
  catch(err){}
}