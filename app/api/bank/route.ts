
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {name, account,bank_name}=body
    if(!name|| !account || !bank_name){
      throw new Error(`Invalid parameters`);
    }
    const newHero = await prisma.bank.create({
      data: {name:name,account:account,bankName:bank_name}
    })

    return NextResponse.json(newHero);
  }
  catch(err){

  }
}