
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  const {course,
 
     price,
     descriptions,
     requirements,
     whoShouldTake,} = body;

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
  throw new Error(" forbidden resource")
}

if(!myAccount){
  return NextResponse.json({message:"Unauthorized"},{status:400})
 
}

if(!myAccount.status){
  return NextResponse.json({message:"Unauthorized"},{status:400})
}

    const courseData=await prisma.course.findUnique({
      where: {id:id,instructorId:myAccount?.id}
    })
    if(!courseData){
      return NextResponse.json({status:false, message:"course not found"},{status:404});
    }


    const updatedCourse=await prisma.course.update({
      where: {id:id},
      data:{
        course:course,
        price:parseFloat(price),
        descriptions:descriptions,
        requirements:requirements,
        whoShouldTake:whoShouldTake
      }
    })
    return NextResponse.json(updatedCourse);
  }
  catch(err:any){
    return NextResponse.json({status:false, message:"somethingwent wrong"},{status:500});
  }
}