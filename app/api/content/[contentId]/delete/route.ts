
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
 

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

if(!contentId ) {
  return NextResponse.json({message:"Invalid  parameters"},{status:400})

 }

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

if(!myAccount){
  return NextResponse.json({message:"Unauthorized"},{status:400})
 
}

if(!myAccount?.status){
  return NextResponse.json({message:"Unauthorized"},{status:400})
}
const content=await prisma.content.findFirst({
  where:{
    id:contentId,
    lesson:{
      chapter:{
        course:{
          instructorId:myAccount?.id
        }
      }
    }
  }
})


if(!content){
  return NextResponse.json({message:"No content Found!"},{status:404})
  
}

 await prisma.content.delete({
      where: {id:content.id},
      
    })
    return NextResponse.json({
      success:true,
      message:"content deleted successfully"
    });
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
   
 
  }
}