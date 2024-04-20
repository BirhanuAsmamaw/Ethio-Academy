
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
  const body = await req.json();
  const {cover} = body;

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageSubject" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    const subjectData=await prisma.subject.findUnique({
      where: {id:subjectId}
    })
    if(!subjectData){
     throw new Error("subject not found");
    }

    const updatedsubject=await prisma.subject.update({
      where: {id:subjectId},
      data:{
        cover:cover
      }
    })
    return NextResponse.json(updatedsubject);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}