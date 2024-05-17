import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
const body=await req.json();
try{
  const { accountName ,
    bankAccount ,
    
    title,
    description}=body;
  const user=await getCurrentUser();
  if(!user){
    throw new Error("access denied");
  }


    const newTeacher=await prisma.teacher.create({
      data:{
        userId:user.id,
        accountName:accountName,
        bankAccount:bankAccount,
        title:title,
       
        description:description

      }
    });

    const users=await getAllUsers();
    const admins=users?.filter(user=>user.permissions.some((permission)=>permission.permission.action === "CanApprovedTeacher" )).map((u)=>({
      id:u.id,
      name:u.name||"",
      email:u.email||""
    }));
    
    await prisma.notification.create({
      data:{
        url:`/dashboard/user-list/teachers/${newTeacher.id}`,
        type:"Success",
        title:"New Instructor Account Created",
        message:`${user.name} is  created ${newTeacher.accountName||user.name} Account`,
        userId:user.id,
        customers:admins
      }
    });
  
    return NextResponse.json(newTeacher);
}
catch(err){
  throw new Error("Something went wrong")
}
}