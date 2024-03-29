
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{heroId:string}}){
  const heroId=params.heroId;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const hero=await prisma.hero.findUnique({
      where: {id:heroId}
    })
    if(!hero){
      return NextResponse.json({status:false, message:"hero not found"});
    }

 await prisma.hero.delete({
      where: {id:heroId},
      
    })
    return NextResponse.json({
      success:true,
      message:"hero deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}