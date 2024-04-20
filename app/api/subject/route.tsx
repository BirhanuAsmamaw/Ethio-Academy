import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body = await req.json();
  try{
  const {departmentId,subject}=body

  const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageSubject" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
  if (!departmentId || !subject){
   
     throw new Error("Invalid parameters")
  }
    const newSubject=await prisma.subject.create({
      data:{
        departmentId:departmentId,
        subjectName:subject
      }
    })

    return NextResponse.json(newSubject);

  }

  catch(err){
    throw new Error("Something went wrong")
  }
}