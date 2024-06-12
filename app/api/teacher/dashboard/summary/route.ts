
import {NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";

export async function GET(req: Request) {
  

  

  try {

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({message:"Access denied"},{status:400})
    }

    const teacher = await prisma.teacher.findUnique({
      where: { id: user?.teacher?.id ||""},
      include: {
        courses: {
          select: {
            payments: {
              select: {
                payment: {
                  select: {
                    totalPrice: true,
                    customer: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!teacher) {
      return NextResponse.json({ message: "No teacher found" }, { status: 404 });
    }

    const totalLearners = new Set();
    let totalPrice = 0;

    teacher.courses.forEach(course => {
      course.payments.forEach(payment => {
        if (payment.payment.customer) {
          totalLearners.add(payment.payment.customer?.id);
        }
        totalPrice += payment.payment.totalPrice;
      });
    });

    const summaryData = {
      learners: totalLearners.size,
      courses: teacher.courses.length,
      price: totalPrice
    };

    return NextResponse.json(summaryData);
  } catch (err) {
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}