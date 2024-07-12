
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
  const body = await req.json();
  const {logo} = body;

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
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageUniversity" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    
    const universityData=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!universityData){
     throw new Error("university not found");
    }

    const updateduniversity=await prisma.university.update({
      where: {id:universityId},
      data:{
        logo:logo
      }
    })
    return NextResponse.json(updateduniversity);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}