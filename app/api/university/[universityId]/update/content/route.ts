
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
  const body = await req.json();
  const {name,code} = body;

  try{
    const user=await  getCurrentUser();
   
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageUniversity" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    

    const universityData=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!universityData){
     throw new Error("University not found");
    }

    const updateduniversity=await prisma.university.update({
      where: {id:universityId},
      data:{
        name:name,
        code:code,
      }
    })
    return NextResponse.json(updateduniversity);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}