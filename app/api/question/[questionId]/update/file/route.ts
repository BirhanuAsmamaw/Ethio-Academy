
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{questionId:string}}){
  const questionId=params.questionId;
  const body = await req.json();
  const {image} = body;

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

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageOwnCourse" || permission?.action === "CanManageSubject" ||permission?.action === "CanManageDepartment"  )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
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
       q_image:image
      }
    })
    return NextResponse.json(updatedquestion);
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
  }
}