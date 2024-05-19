import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  

  const userId =searchParams.get("profileId") || ""; 


  try {
   


    const user = await prisma.user.findUnique({
      where:{
        id:userId
      }
      
    });

    

    return NextResponse.json(user);
  } catch (e) {
    
    return NextResponse.json({message:"Something went wrong"},{status:500});
    
  }
}
