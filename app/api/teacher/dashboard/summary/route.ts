
import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/users/currentUser";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user || !user.teacher) {
    return NextResponse.json({ message: "Access denied" }, { status: 400 });
  }

  try {
    

  

    const totalLearners = new Set();
    let totalPrice = 0;

    user?.teacher.courses.forEach(course => {
      course.payments.forEach(payment => {
        if (payment.payment.customer) {
          totalLearners.add(payment.payment.customer.id);
        }
        totalPrice += payment.payment.totalPrice;
      });
    });

    const summaryData = {
      learners: totalLearners.size,
      courses: user?.teacher.courses.length,
      price: totalPrice
    };

    return NextResponse.json(summaryData);
  } catch (err) {
    return NextResponse.json({ message: err || "Internal server error" }, { status: 500 });
  }
}