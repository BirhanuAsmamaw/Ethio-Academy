import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ status: false, message: "Unauthorized" });
    }

    const isDataAccessed = user.permissions.some((permission) =>
      ["CanManageCourse", "CanCreateCourse", "CanManageOwnCourse"].includes(permission.permission.action)
    );

    if (!isDataAccessed) {
      return NextResponse.json({ status: false, message:"Unauthorized"},{status:400});
    }

    if (!user.teacher || !user.teacher.status) {
      return NextResponse.json({ status: false, message:"Unauthorized"},{status:400});
      
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
      return NextResponse.json({ status: false, message:"Invalid parameters"},{status:400});
      
    }

    const newCourse = await prisma.course.create({
      data: {
        subjectId: subjectId,
        instructorId: user.teacher.id||"",
        course: course,
        price: parseFloat(price),
        rating: 0,
        descriptions: descriptions,
        requirements: requirements,
        whoShouldTake: whoShouldTake
      }
    });

    const users = await getAllUsers();
    const subscribers = users?.filter((u) =>user?.teacher?.subscribers?.some((sub) => sub.userId === u.id)
    ).map((subscriber) => ({
      id: subscriber.id,
      name: subscriber.name || "",
      email: subscriber.email || ""
    }));

    await prisma.notification.create({
      data: {
        url: `/course/${newCourse.id}`,
        type: "Success",
        title: "New Course Created",
        message: `${user.teacher.accountName || user.name} has created the ${newCourse.course} course`,
        userId: user.id,
        customers: subscribers
      }
    });

    return NextResponse.json(newCourse);
  } catch (error:any) {
    return NextResponse.json({ status: false, message: error.message },{status:500});
  }
}
