
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
  const body = await req.json();
  const {subject} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const subjectData=await prisma.subject.findUnique({
      where: {id:subjectId}
    })
    if(!subjectData){
      return NextResponse.json({status:false, message:"subject not found"});
    }

    const updatedsubject=await prisma.subject.update({
      where: {id:subjectId},
      data:{
     subjectName:subject
      }
    })
    return NextResponse.json(updatedsubject);
  }
  catch(err){}
}