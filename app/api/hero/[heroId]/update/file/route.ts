
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
  const body = await req.json();
  const {logo} = body;

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

    
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageBanner" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
    }

    const heroData=await prisma.hero.findUnique({
      where: {id:heroId}
    })
    if(!heroData){
   
       throw new Error("Hero not found")
    }

    const updatedhero=await prisma.hero.update({
      where: {id:heroId},
      data:{
        logo:logo
      }
    })
    return NextResponse.json(updatedhero);
  }
  catch(err){
     throw new Error(" Something went wrong")
  }
}