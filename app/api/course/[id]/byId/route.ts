
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function GET(req: Request, {params}:{params:{id:string}}){
  const id=params?.id;
  
  try{

    const user=await getCurrentUser()
    const course = await prisma.course.findUnique({
      where:{
       
        id:id,
      },
      include:{
        
        
        subject:{
          include:{
department:true
          }
        },
        instructor:{
          include:{
            subscribers:true,
            user:true
          }
        },
        chapters:{
        include:{
          lessons:{
            include:{
              questions:true
            }
          }
        }
      },
        reviews:{
          orderBy:{
            createdAt:"desc"
          },
          include:{
            customer:true
          }
      }},
      
    });
    const isSubscribe=course?.instructor?.subscribers.some((usr)=>usr.userId===user?.id)
   
    const userHasReviewed = course?.reviews.some((review: any) => review.customer.id === user?.id);
    return NextResponse.json({...course,isSubscribe:isSubscribe,isUser:user?true:false,isReviewed:userHasReviewed})
    
  }
  
  catch(e){
    return  NextResponse.json({message:"Something went wrong"},{status:500});
  }
}