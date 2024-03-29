
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {title,subtitle}=body
    if(!title || !subtitle){
      throw new Error(`Invalid parameters`);
    }
    const newHero = await prisma.hero.create({
      data: {title,subtitle}
    })

    return NextResponse.json(newHero);
  }
  catch(err){

  }
}