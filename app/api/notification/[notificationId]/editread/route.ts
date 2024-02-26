import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function PUT(req: Request,{ params }: { params: { notificationId: string }}){

  try{

    const notificationId = params.notificationId;

   
const notification= await prisma.notification.update({
where:{id:notificationId,},
data:{isRead:true}

});

return NextResponse.json(notification);

  }
  catch(err){
    console.log(err);
  }

}