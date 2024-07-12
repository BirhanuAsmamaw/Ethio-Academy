import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 400 });
    }

    const payments = await prisma.payment.findMany({
      where: {
        customerId: user.id,
      },
    });

    const paymentIds = payments.map((payment) => payment.id);

    const boughtCourses = await prisma.paymentCourse.findMany({
      where: {
        paymentId: {
          in: paymentIds,
        },
      },
      include: {
        course: true, // Assuming there's a relation to the course
      },
    });

    return NextResponse.json(boughtCourses, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
