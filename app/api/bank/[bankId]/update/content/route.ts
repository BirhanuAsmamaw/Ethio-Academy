
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{bankId:string}}){
  const bankId=params.bankId;
  const body = await req.json();
  const {account,name,bank_name} = body;

  try{
      // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageBank" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

    const bankData=await prisma.bank.findUnique({
      where: {id:bankId}
    })
    if(!bankData){
      return NextResponse.json({status:false, message:"course not found"});
    }

    const updatedbank=await prisma.bank.update({
      where: {id:bankId},
      data:{
        bankName:bank_name,
        name:name,
        account:account
      }
    })
    return NextResponse.json(updatedbank);
  }
  catch(err){}
}