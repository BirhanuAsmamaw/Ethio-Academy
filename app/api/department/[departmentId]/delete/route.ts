
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{departmentId:string}}){
  const departmentId=params.departmentId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const department=await prisma.department.findUnique({
      where: {id:departmentId}
    })
    if(!department){
      return NextResponse.json({status:false, message:"department not found"});
    }

 await prisma.department.delete({
      where: {id:departmentId},
      
    })
    return NextResponse.json({
      success:true,
      message:"department deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}