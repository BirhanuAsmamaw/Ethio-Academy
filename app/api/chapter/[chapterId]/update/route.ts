
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
export async function PUT(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
  const body = await req.json();
  const {title} = body;

  try{

    const myAccount:any=await myTeacherAccount()

    
       // authorization
const user = await getCurrentUser();
if(!user){
  return NextResponse.json({message:"Unauthorized"},{status:400})
  
}


const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }
    
const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  return NextResponse.json({message:"Forbidden Recourse"},{status:400})
}

if(!myAccount){
  return NextResponse.json({message:"Unauthorized"},{status:400})

}



if(!myAccount?.status){
  return NextResponse.json({message:"Unauthorized"},{status:400})
} 

const Chapter=await prisma.chapter.findFirst({
  where:{
    id:chapterId,
    course:{
     instructorId:myAccount?.id
    }

  }
})
if(!Chapter){
  throw new Error("No Chapter found")
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