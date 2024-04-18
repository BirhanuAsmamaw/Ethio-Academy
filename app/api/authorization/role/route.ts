import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  name
}=body;

if(!name){
  throw new Error("Invalid name passed")
}
//authorized

//create ROLES
const newPermission=await prisma.roles.create({
  data:{name:name}
});

return NextResponse.json(newPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}