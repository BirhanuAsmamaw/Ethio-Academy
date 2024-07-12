
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{userId:string}}){
  const userId=params.userId;
  const body = await req.json();
  const {role} = body;

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
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageUser" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
    }

    const UserData=await prisma.user.findUnique({
      where: {id:userId}
    })
    if(!UserData){
      return NextResponse.json({status:false, message:"User not found"});
    }
    const updatedUser=await prisma.user.update({
      where: {id:userId},
      data:{
        
      }
    })
    return NextResponse.json(updatedUser);
  }
  catch(err){
    return NextResponse.json({message:"Something Went wrong"})
  }
}