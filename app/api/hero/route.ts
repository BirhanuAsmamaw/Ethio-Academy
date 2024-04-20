
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {title,subtitle}=body
    
    // authorization
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageBanner" )
    if(isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    if(!title || !subtitle){
      throw new Error(`Invalid parameters`);
    }
    const newHero = await prisma.hero.create({
      data: {title,subtitle}
    })

    return NextResponse.json(newHero);
  }
  catch(err){
throw new Error(`Something went wrong`);
  }
}