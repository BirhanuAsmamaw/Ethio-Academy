
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{imageId:string}}){
  const imageId=params.imageId;
  const body = await req.json();
  const {image} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const imageData=await prisma.content.findUnique({
      where: {id:imageId}
    })
    if(!imageData){
      return NextResponse.json({status:false, message:"image not found"});
    }

    const updatedimage=await prisma.content.update({
      where: {id:imageId},
      data:{
        image:image,
       
      }
    })
    return NextResponse.json(updatedimage);
  }
  catch(err){}
}