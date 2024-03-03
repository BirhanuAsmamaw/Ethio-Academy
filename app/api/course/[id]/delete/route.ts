
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function Delete(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const course=await prisma.course.findUnique({
      where: {id:id}
    })
    if(!course){
      return NextResponse.json({status:false, message:"course not found"});
    }

   await prisma.course.delete({
      where: {id:id},
      
    })
    return NextResponse.json({
      status:true,
      message:"course deleted successfully"
    });
  }
  catch(err){}
}