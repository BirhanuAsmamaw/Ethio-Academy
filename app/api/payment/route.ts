import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";

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
    if (!transaction || !bank || !totalPrice || !courses || !Array.isArray(courses)) {
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

    // Create payment entries for each course
    const payments = await Promise.all(courses.map(async (courseId) => {
      const newPayment = await prisma.payment.create({
        data: {
          transaction: transaction,
          totalPrice: parseFloat(totalPrice),
          bank: bank,
          courses: { connect: { id: courseId } },
          customerId: user.id,
          departmentId: departmentId,
        },
      });
      return newPayment;
    }));

    // Return the created payment entries
    return NextResponse.json({
      status: true,
      payments: payments,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating payments:", error);
   throw new Error("Failed to create payments");
  }
}
