import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request,res:Response){
const body=await req.json();
  try{


    // get current user
    const user=await  getCurrentUser();

if(!user){
  return NextResponse.json({status:false, message:"unathorized"},{status:400});
}

    const {accountId}=body;
    if(!accountId){
      return NextResponse.json("invalid Parameters",{status:400})
    }


//get teacher by Id

const teacher= await prisma.teacher.findUnique({
where:{id:accountId},
include:{subscribers:true}
})




if(!teacher){
return NextResponse.json({status:false, message:"no account found"},{status:400});
}


const isSubscribe=teacher.subscribers.some((subs)=>subs.userId===user.id)



if(!isSubscribe){
  const newSubscribers=await prisma.subscriber.create({
    data:{
      userId:user.id,
      teacherId:accountId
    }
  });

  return NextResponse.json({
    success:true,
    message:"subscribe"
  });
}



// subscribe delete
const subscribers=teacher.subscribers.filter((subs)=>subs.userId===user.id)
 await prisma.subscriber.delete({
      
      where: {id:subscribers[0].id},
      
    })
    return NextResponse.json({
      success:true,
      message:"unsubscribe"
    });



   

  }
  catch(err){

return NextResponse.json("something went wrong",{status:500})
  }
}