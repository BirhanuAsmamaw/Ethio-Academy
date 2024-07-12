import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getTeacherPermission } from "@/actions/authorization/getTeacherPermission";
import { myPermissions } from "@/actions/authorization/myPermission";

export async function PUT(req: Request, { params }: { params: { teacherId: string } }) {
  const teacherId = params.teacherId;
  const { reason, status } = await req.json();

  try {
    
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }
    const hasPermission = permissions?.some((permission) => permission?.action === "CanApprovedTeacher");
    if (!hasPermission) {
      return NextResponse.json({ message: "Forbidden Resource" }, { status: 403 });
    }

    const teacherData = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: { user: true },
    });

    if (!teacherData || !teacherData.user || !teacherData.user.username) {
      return NextResponse.json({ message: "Teacher or username not found" }, { status: 404 });
    }

    const permission = await getTeacherPermission("CanManageOwnCourse");
    if (!permission) {
      return NextResponse.json({ message: "Permission not found" }, { status: 404 });
    }

    await prisma.$transaction(async (transaction) => {
      if (status) {
        await transaction.userPermission.create({
          data: {
            userId: teacherData.userId,
            permissionId: permission.id,
          },
        });

        await transaction.teacher.update({
          where: { id: teacherId },
          data: { status: status },
        });

        await transaction.notification.create({
          data: {
            url: `/dashboard/instructor/account`,
            type: "Success",
            title: "Congratulations; Your Account Approved Successfully!",
            message: `${teacherData.user.name}, You are the Instructor of Ethio Academy; Start Creating Your Own Course for Students!`,
            userId: teacherData.user.id,
            senderId: user.id,
          },
        });

        return NextResponse.json({ message: "Instructor Approved Success!" }, { status: 200 });
      }

      const userPerm = await transaction.userPermission.findFirst({
        where: {
          userId: teacherData.userId,
          permissionId: permission.id,
        },
      });

      if (userPerm) {
        await transaction.userPermission.delete({ where: { id: userPerm.id } });
      }

      await transaction.teacher.update({
        where: { id: teacherId },
        data: { status: false },
      });

      await transaction.notification.create({
        data: {
          url: `/dashboard/profile`,
          type: "Danger",
          title: "Sorry, Your Account Has Been Blocked!",
          message: `Hello, ${teacherData.user.name}, your account ${teacherData.accountName || teacherData.user.name} has been suspended for ${reason || 'inappropriate actions on our platform'}. Please contact me via phone at +251930793119 or email at deribew.tech@gmail.com.`,
          userId: teacherData.user.id,
          senderId: user.id,
        },
      });

      return NextResponse.json({ message: "Instructor status updated to blocked." }, { status: 200 });
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
