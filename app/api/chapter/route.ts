import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
export async function POST(req:Request){
 const body=await req.json();
 const {title,courseId}=body;
 if(!title){
  return NextResponse.json({
    status:false,
    message:"title and courseId is not empty",
  });
 }

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
  throw new Error("Forbidden Resourse")
}

if(!myAccount){
  return NextResponse.json({message:"Unauthorized"},{status:400})

}



if(!myAccount?.status){
  return NextResponse.json({message:"Unauthorized"},{status:400})
} 


const course=await prisma.course.findFirst({
  where:{id:courseId,instructorId:myAccount?.id}
})
if(!course){
  throw new Error("No Course found")
}
 const newChapter=await prisma.chapter.create({
 
  data:{
    courseId:course.id,
    title:title,
  }
 });

 return NextResponse.json(newChapter);


}