
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {name, code,}=body
    if(!name|| !code){
      throw new Error(`Invalid parameters`);
    }
    const newUniversity= await prisma.university.create({
      data: {name:name,code:code}
    })

    return NextResponse.json(newUniversity);
  }
  catch(err){

  }
}