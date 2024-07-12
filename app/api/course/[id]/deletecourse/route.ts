
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
export async function DELETE(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
 

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

    const isDataAccessed=permissions.some((permission)=>permission?.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  return NextResponse.json({message:"Forbidden resource"},{status:400})
}

if(!myAccount){
  return NextResponse.json({message:"Unauthorized"},{status:400})
 
}

if(!myAccount.status){
  return NextResponse.json({message:"Unauthorized"},{status:400})
}

    const course=await prisma.course.findUnique({
      where: {id:id,instructorId:myAccount?.id}
    })
    if(!course){
      return NextResponse.json({status:false, message:"course not found"},{status:404});
    }

 await prisma.course.delete({
      where: {id:id},
      
    })
    return NextResponse.json({
      success:true,
      message:"course deleted successfully"
    });
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
  }
}