
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
  const body = await req.json();
  const {title,subtitle} = body;

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageBanner" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
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
        title:title,
       subtitle:subtitle
       
      }
    })
    return NextResponse.json(updatedhero);
  }
  catch(err){
    throw new Error("Something went werong")
  }
}