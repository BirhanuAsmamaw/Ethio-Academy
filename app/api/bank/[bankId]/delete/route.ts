
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{bankId:string}}){
  const bankId=params.bankId;
 

  try{
       // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}


const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }


const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageBank" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
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