
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
 

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

    
    const isDataAccessed=permissions.some((permission)=>permission?.action === "CanManageBanner" )
    if(!isDataAccessed){
      throw new Error("Forbidden Recourse")
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