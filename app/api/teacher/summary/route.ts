import { getCurrentUser } from "@/actions/users/currentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const teacher = await prisma.teacher.findFirst({
      where: { userId: user?.id },
      select: {
        subscribers: true,
        courses: {
          select: {
            payments: {
              select: {
                payment: {
                  select: {
                    customer: true,
                    totalPrice: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!teacher) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    // Calculate total learners, total price and course count
    let totalLearners = 0;
    let totalPrice = 0;

    teacher.courses.forEach((course) => {
      course.payments.forEach((payment) => {
        totalLearners += 1; // assuming each payment represents a unique learner
        totalPrice += payment.payment.totalPrice;
      });
    });

    const summaryData = {
      courses_no: teacher.courses.length,
      learners_no: totalLearners,
      subscribers_no: teacher.subscribers.length,
      price: totalPrice,
    };

    return NextResponse.json(summaryData, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
