
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {name,account}=body
    if(!name|| !account){
      throw new Error(`Invalid parameters`);
    }
    const newHero = await prisma.bank.create({
      data: {name,account}
    })

    return NextResponse.json(newHero);
  }
  catch(err){

  }
}