
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
  const body = await req.json();
  const {title,subtitle} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const heroData=await prisma.hero.findUnique({
      where: {id:heroId}
    })
    if(!heroData){
      return NextResponse.json({status:false, message:"hero not found"});
    }

    const updatedhero=await prisma.hero.update({
      where: {id:heroId},
      data:{
        title:title,
       subtitle:subtitle
       
      }
    })
    return NextResponse.json(updatedhero);
  }
  catch(err){}
}