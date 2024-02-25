import { getCurrentUser } from "@/actions/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request){
const body=await req.json();

const {
  title ,
   message ,
   customers
}=body;

if (!title || !message|| !customers.length){
  return NextResponse.json({
    status: false,
    message:"Invalid  Notification parameters"
  })
}


const user= await getCurrentUser();

if (!user){
  return NextResponse.json({
    status: false,
    message:"unathorized!"
  })
}


const newNotification= await prisma.notification.create({
  data:{
    userId: user.id,
    title: title,
    message: message,
    customers: customers,

  }
})

return NextResponse.json(newNotification);

}


