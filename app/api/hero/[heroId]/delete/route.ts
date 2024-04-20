
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
 

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageBanner" )
    if(isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    const hero=await prisma.hero.findUnique({
      where: {id:heroId}
    })
    if(!hero){
     throw new Error("Hero not found")
    }

 await prisma.hero.delete({
      where: {id:heroId},
      
    })
    return NextResponse.json({
      success:true,
      message:"hero deleted successfully"
    });
  }
  catch(err){
  throw new Error("Something went wrong")
  }
}