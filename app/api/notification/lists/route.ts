import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function GET(req:Request) {
  
  try{
const user=await getCurrentUser();
if(!user){
  return NextResponse.json({message:"Unauthorized"},{status:400})
}

const notifications=await prisma.notification.findMany({
  where:{userId:user?.id}
})

return NextResponse.json(notifications,{status:200})
  }
  catch(err){
    return NextResponse.json({
      message:"Something went wrong!!"
    },{status:500})
  }
}