import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function DELETE(req: Request,{ params }: { params: { notificationId: string }}){

  try{

    const notificationId = params.notificationId;

   
const notification= await prisma.notification.delete({
where:{id:notificationId,},

});

return NextResponse.json(notification);

  }
  catch(err){
    console.log(err);
  }

}