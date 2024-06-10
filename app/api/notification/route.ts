
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prismadb"
// import { getCurrentUser } from "@/actions/users/currentUser";
// export async function POST(req:Request){
// const body=await req.json();

// const {
//   url,
//   type,
//   title ,
//    message ,
//    customers
// }=body;

// if (!title || !message|| !customers.length){
//   return NextResponse.json({
//     status: false,
//     message:"Invalid  Notification parameters"
//   })
// }


// const user= await getCurrentUser();

// if (!user){
//   return NextResponse.json({
//     status: false,
//     message:"unathorized!"
//   })
// }


// const newNotification= await prisma.notification.create({
//   data:{
//     userId: user.id,
//     title: title,
//     message: message,
//     customers: customers,
//     url:url,
//     type: type,

//   },
  
// })

// return NextResponse.json(newNotification);

// }


