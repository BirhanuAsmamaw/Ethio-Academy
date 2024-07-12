
import { myPermissions } from "@/actions/authorization/myPermission";
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {name, account,bank_name}=body

   // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
if(!permissions){
  return NextResponse.json({message:"Forbidden Resources"},{status:404})
}
const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageBank" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}
    if(!name|| !account || !bank_name){
      throw new Error(`Invalid parameters`);
    }
    const newBank = await prisma.bank.create({
      data: {name:name,account:account,bankName:bank_name}
    })

    return NextResponse.json(newBank);
  }
  catch(err){

  }
}