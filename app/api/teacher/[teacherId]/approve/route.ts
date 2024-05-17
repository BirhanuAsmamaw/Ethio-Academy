
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";
export async function PUT(req: Request, {params}:{params:{teacherId:string}}){
  const teacherId=params.teacherId;
  
  const {reason}=await req.json();

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanApprovedTeacher" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }

    const teacherData=await prisma.teacher.findUnique({
      where: {id:teacherId},
      include:{
        user:true
      }
    })
    if(!teacherData){
   throw new Error("teacher not found");
    }

    if(!teacherData.status){
      const updatedteacher=await prisma.teacher.update({
        where: {id:teacherId},
  
        data:{
       status:true
        }
      });
  
  
     try{
      const users=await getAllUsers();
      const instructors=users?.filter(u=>u.id===teacherData.userId).map((usr)=>({
        id:usr.id,
        name:usr.name||"",
        email:usr.email||""
      }))
      await prisma.notification.create({
        data:{
          url:`/dashboard/instructor/account`,
          type:"Success",
          title:"Congratulations; Your Account Approved Successfully!",
          message:`${teacherData.user.name},You are the Instructor of Ethio Academy; Start  Creating Your Own Course for Students!`,
          userId:user.id,
          customers:instructors
        }
      });
     }
     catch(err){
  return NextResponse.json("Something went wrong",{status:500})
     }
  
  
      return NextResponse.json(updatedteacher);

    }



    const updatedteacher=await prisma.teacher.update({
      where: {id:teacherId},

      data:{
     status:false
      }
    });


   try{
    const users=await getAllUsers();
    const instructors=users?.filter(u=>u.id===teacherData.userId).map((usr)=>({
      id:usr.id,
      name:usr.name||"",
      email:usr.email||""
    }))
    await prisma.notification.create({
      data:{
        url:`/dashboard/profile`,
        type:"Danger",
        title:"Sorry, Your Account Has Been Blocked!",
        message:`
        Hello, ${teacherData.user.name}, your account ${teacherData.accountName||teacherData.user.name} has been suspended for ${reason ? reason : 'inappropriate actions on our platform'}. Please contact me via phone at +251930793119 or email at deribew.tech@gmail.com. `,
        userId:user.id,
        customers:instructors
      }
    });
   }
   catch(err){
return NextResponse.json("Something went wrong",{status:500})
   }


    return NextResponse.json(updatedteacher);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}