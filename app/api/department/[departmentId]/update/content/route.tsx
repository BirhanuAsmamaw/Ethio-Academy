
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{departmentId:string}}){
  const departmentId=params.departmentId;
  const body = await req.json();
  const {department,url,} = body;

  try{
        // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
if(!permissions){
  return NextResponse.json({message:"Forbidden Resources"},{status:404})
}

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageDepartment" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
}

    const departmentData=await prisma.department.findUnique({
      where: {id:departmentId}
    })
    if(!departmentData){
     throw new Error("department not found");
    }

    const updatedDepartment=await prisma.department.update({
      where: {id:departmentId},
      data:{
        departmentName:department,
        url:url,
      }
    })
    return NextResponse.json(updatedDepartment);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}