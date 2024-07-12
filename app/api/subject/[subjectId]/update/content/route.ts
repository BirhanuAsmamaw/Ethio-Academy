
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
  const body = await req.json();
  const {subject} = body;

  try{
   
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageSubject" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
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
     subjectName:subject
      }
    })
    return NextResponse.json(updatedsubject);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}