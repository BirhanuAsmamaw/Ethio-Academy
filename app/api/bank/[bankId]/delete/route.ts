
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{bankId:string}}){
  const bankId=params.bankId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const bank=await prisma.bank.findUnique({
      where: {id:bankId}
    })
    if(!bank){
      return NextResponse.json({status:false, message:"bank not found"});
    }

 await prisma.bank.delete({
      where: {id:bankId},
      
    })
    return NextResponse.json({
      success:true,
      message:"bank deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}