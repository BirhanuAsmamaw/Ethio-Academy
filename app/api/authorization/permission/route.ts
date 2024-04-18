import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  action
}=body;

if(!action){
  throw new Error("Invalid action passed")
}
//authorized

//create PERMISSION
const newPermission=await prisma.permission.create({
  data:{action:action}
});

return NextResponse.json(newPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}