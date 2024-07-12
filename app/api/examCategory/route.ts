import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { myPermissions } from "@/actions/authorization/myPermission";
export async function POST(req:Request) {

  const body=await req.json();

  try{
    const {examType,url}=body
  
 // authorization
 const user = await getCurrentUser();
 if(!user){
   return NextResponse.json({message:"Unauthorized"},{status:400})
   
 }
 
 
 const permissions=await myPermissions();
     if(!permissions){
       return NextResponse.json({message:"permissions not found"},{status:404})
     }

     
     const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageExamType" )
     if(!isDataAccessed){
       throw new Error("Forbidden Recourse")
     }

    if(!examType || !url){
      return NextResponse.json({message:"exams not empty",status: false})
    }
   
    const newExams=await  prisma.exam.create({
      data:{
        url:url,
        examType:examType,
      }
    })

    return NextResponse.json(newExams)

  }
  catch(err){
    throw new Error("Something went wrong")
  };
}