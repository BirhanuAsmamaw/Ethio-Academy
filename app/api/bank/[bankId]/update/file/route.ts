
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{bankId:string}}){
  const bankId=params.bankId;
  const body = await req.json();
  const {logo} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const bankData=await prisma.bank.findUnique({
      where: {id:bankId}
    })
    if(!bankData){
      return NextResponse.json({status:false, message:"bank not found"});
    }

    const updatedbank=await prisma.bank.update({
      where: {id:bankId},
      data:{
        logo:logo
      }
    })
    return NextResponse.json(updatedbank);
  }
  catch(err){}
}