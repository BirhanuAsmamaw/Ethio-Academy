
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{bankId:string}}){
  const bankId=params.bankId;
  const body = await req.json();
  const {logo} = body;

  try{
    

      // authorization
const user = await getCurrentUser();
if(!user){
  return NextResponse.json({message:"Unauthorized"},{status:400})
 
}
const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageBank" )
if(!isDataAccessed){
 
  return NextResponse.json({message:"Forbidden Recourse"},{status:404})
}

    const bankData=await prisma.bank.findUnique({
      where: {id:bankId}
    })
    if(!bankData){
      return NextResponse.json({status:false, message:"bank not found"},{status:404});
    }

    const updateBank=await prisma.bank.update({
      where: {id:bankId},
      data:{
        logo:logo
      }
    })
    return NextResponse.json(updateBank);
  }
  catch(err){
    return NextResponse.json({status:false, message:"something went wrong!"},{status:500});
  }
}