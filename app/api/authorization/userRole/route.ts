import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  userId,
  roleId
}=body;

if(!userId || !roleId){
  throw new Error("Invalid user and role passed")
}
//authorized

//create userrole
const newuserRole=await prisma.userRole.create({
  data:{
    userId:userId,
    roleId:roleId
  }
});

return NextResponse.json(newuserRole)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}