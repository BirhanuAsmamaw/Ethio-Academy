
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();

    // Destructure necessary fields from the request body
    const {
      departmentId,
      bank,
      courses,
      transaction,
      totalPrice,
    } = body;

    // Validate required parameters
    if (!transaction || !bank || !totalPrice) {
      return NextResponse.json({
        status: false,
        message: "Invalid payment parameters",
      });
    }

    // Get current user
    const user = await getCurrentUser();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User not authenticated",
      });
    }

    // Create payment entry
    const newPayment = await prisma.payment.create({
      data: {
        transaction: transaction,
        totalPrice: parseFloat(totalPrice),
        bank: bank,
        customerId: user.id,
        departmentId: departmentId,
      },
    });

    // Create paymentCourse entries for each course
    if (courses && courses.length) {
      const paymentCoursePromises = courses.map(async (course: any) => {
        await prisma.paymentCourse.create({
          data: {
            paymentId: newPayment.id,
            courseId: course.id,
          },
        });
      });

    
// Fetch users who can approve payments and notify them
const users = await getAllUsers();
const approvePaymentUsers = (users || []).filter((usr) =>
  usr.permissions.some(
    (permission) => permission.permission.action === "CanApprovePayment"
  )
);

      await Promise.all(
        approvePaymentUsers.map(async (u) => {
          await prisma.notification.create({
            data: {
              url: `/dashboard/approve-payment/${newPayment.id}`,
              type: "Success",
              title: "Payment Success!",
              message: `${user.name} purchased ${
                courses.length
              } course${courses.length > 1 ? "s" : ""} and ${
                departmentId ? "exams" : ""
              }.`,
              senderId: user.id,
              userId: u.id,
            },
          });
        })
      );

      // Wait for all paymentCourse creation promises to resolve
      await Promise.all(paymentCoursePromises);
    }

    // Return the created payment entry
    return NextResponse.json(newPayment);
  } catch (error) {
    // Handle any errors
    
    throw new Error("Failed to create payments");
  }
}