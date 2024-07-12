
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";

export async function DELETE(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
  

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
  return NextResponse.json({message:"No Chapter found"},{status:404})
 
}

  
  await prisma.chapter.delete({
      where: {id:chapterId}
      
    })
    return NextResponse.json({
      message:"Chapter deleted successfully"
    });
  }
  catch(err){
    return NextResponse.json({
      message:"something went wrong"
    },{status:500});
  }
}