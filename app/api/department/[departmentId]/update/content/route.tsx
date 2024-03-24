
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{departmentId:string}}){
  const departmentId=params.departmentId;
  const body = await req.json();
  const {department,url,} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const departmentData=await prisma.department.findUnique({
      where: {id:departmentId}
    })
    if(!departmentData){
      return NextResponse.json({status:false, message:"course not found"});
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
  catch(err){}
}