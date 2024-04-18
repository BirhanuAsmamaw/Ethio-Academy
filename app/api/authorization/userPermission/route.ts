import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  userId,
  permissionId
}=body;

if(!userId || !permissionId){
  throw new Error("Invalid user and permission passed")
}
//authorized

//create userPERMISSION
const newuserPermission=await prisma.userPermission.create({
  data:{
    userId:userId,
    permissionId:permissionId
  }
});

return NextResponse.json(newuserPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}