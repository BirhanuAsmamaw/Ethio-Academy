import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
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
  throw new Error("Forbidden Resourse")
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

  
   const {video} = body

   if(!video){
    throw new Error('video not Empty');
   }
   const course=await prisma.course.update({
    where: {id:id,instructorId:myAccount?.id},
    data:{videoUrl:video}

   })
   return NextResponse.json(course)

  }
  catch(err){
    return NextResponse.json({status:false, message:"something went wrong"},{status:500});
  }
}