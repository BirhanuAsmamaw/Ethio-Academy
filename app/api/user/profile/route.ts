import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  

  const username =searchParams.get("username") || ""; 


  try {
   

    const myProfile: any = await getCurrentUser();
   
   

    const user = await prisma.user.findUnique({
      where:{
        username:username
      },
      include:{
        courseStreaks:{
          include:{
            course:true
          }
        },
        teacher:{
          include:{
            subscribers:true,
            courses:{
              include:{
                payments:true
              }
            }
          }
        }}
      
    });


    if(user?.accountType==='PRIVATE'&&user?.id!==myProfile?.id){
      return NextResponse.json({ message: "Unauthorized! This is a protected profile." }, { status: 400 });
    }else{
      return NextResponse.json(user);
    }

    

    
  } catch (e) {
    
    return NextResponse.json({message:"Something went wrong"},{status:500});
    
  }
}
