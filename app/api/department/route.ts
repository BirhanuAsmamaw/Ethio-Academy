
import { myPermissions } from "@/actions/authorization/myPermission";
import { getAllTeachers } from "@/actions/teacher/getAllTeachers";
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    const { examId, department, url } = body;

  
 // authorization
 const user = await getCurrentUser();
 if(!user){
   return NextResponse.json({message:"Unauthorized"},{status:400})
   
 }
 
 
 const permissions=await myPermissions();
     if(!permissions){
       return NextResponse.json({message:"permissions not found"},{status:404})
     }

    const isDataAccessed = permissions.some((permission) =>
      permission?.action === "CanManageDepartment"
    );
    if (!isDataAccessed) {
      throw new Error("Forbidden Resource");
    }

    if (!examId || !department || !url) {
      return NextResponse.json({
        status: false,
        message: "Invalid parameters",
      });
    }

    const newDepartment = await prisma.department.create({
      data: {
        url: url,
        examId: examId,
        departmentName: department,
      },
    });

    const teachers = await getAllTeachers();
    const notifications = teachers?.map(async (teacher) => {
      await prisma.notification.create({
        data: {
          url: `/category/${newDepartment.url}`,
          type: "Success",
          title: "New Category Created",
          message: `${newDepartment.departmentName} category is created`,
          senderId: user.id,
          userId: teacher.userId,
        },
      });
    });

    if (notifications) {
      await Promise.all(notifications);
    }

    return NextResponse.json(newDepartment);
  } catch (err) {
    throw new Error("Something went wrong");
  }
}