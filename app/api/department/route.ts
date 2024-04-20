import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body = await req.json();
  try{
  const {examId,department,url}=body
     // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}


const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageDepartment" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

  if (!examId || !department || !url){
    return NextResponse.json({
      status:false,
      message:"invalid parameters"
    })
  }
    const newDepartment=await prisma.department.create({
      data:{
        url:url,
        examId:examId,
        departmentName:department
      }
    })

    return NextResponse.json(newDepartment);

  }

  catch(err){
    throw new Error("Something went wrong")
  }
}