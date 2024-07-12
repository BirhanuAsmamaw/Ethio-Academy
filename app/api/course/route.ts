
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
import { myPermissions } from "@/actions/authorization/myPermission";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const myAccount:any=await myTeacherAccount()
 // authorization
 const user = await getCurrentUser();
 if(!user){
   return NextResponse.json({message:"Unauthorized"},{status:400})
   
 }
 
 
 const permissions=await myPermissions();
     if(!permissions){
       return NextResponse.json({message:"permissions not found"},{status:404})
     }


    const isDataAccessed = permissions?.some((permission) =>
      ["CanManageCourse", "CanCreateCourse", "CanManageOwnCourse"].includes(permission?.action)
    );

    if (!isDataAccessed) {
      return NextResponse.json({ status: false, message: "Unauthorized" },{ status: 400 });
    }

    if (!myAccount || !myAccount?.status) {
      return NextResponse.json({ status: false, message: "Unauthorized" },{ status: 400 });
    }

    const {
      price,
      descriptions,
      requirements,
      whoShouldTake,
      subjectId,
      course
    } = body;

    if (!subjectId || !descriptions || !requirements || !whoShouldTake || !course) {
      return NextResponse.json({ status: false, message: "Invalid parameters" },{ status: 400 });
    }

    const newCourse = await prisma.course.create({
      data: {
        subjectId: subjectId,
        instructorId: myAccount?.id || "",
        course: course,
        price: parseFloat(price),
        rating: 0,
        descriptions: descriptions,
        requirements: requirements,
        whoShouldTake: whoShouldTake
      }
    });

    const users = await getAllUsers();
    const subscriberNotifications = users?.filter(async(u) => myAccount?.subscribers?.some((sub:any) => sub.userId === u.id))
      .map(async (subscriber) => {
        await prisma.notification.create({
          data: {
            url: `/course/${newCourse.id}`,
            type: "Success",
            title: "New Course Created",
            message: `${myAccount?.accountName || user.name} has created the ${newCourse.course} course`,
            senderId: user.id,
            userId: subscriber.id
          }
        });
      });

    if (subscriberNotifications) {
      await Promise.all(subscriberNotifications);
    }

    return NextResponse.json(newCourse);
  } catch (error:any) {
    return NextResponse.json({ status: false, message: error.message },{ status: 500 });
  }
}