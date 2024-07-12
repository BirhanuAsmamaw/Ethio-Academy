import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";

export async function PUT(req: Request, { params }: { params: { paymentId: string } }) {
  const paymentId = params.paymentId;

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

    const isDataAccessed = permissions.some(
      (permission) => permission?.action === "CanApprovePayment"
    );
    if (!isDataAccessed) {
      throw new Error("Forbidden Resource");
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        customer: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ status: false, message: "Payment not found" });
    }

    const approvePayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: true },
    });

    await prisma.notification.create({
      data: {
        url: `/dashboard/learning`,
        type: "Success",
        title: "Congratulations! Payment Approved!",
        message: `Dear ${payment.customer.name}, we're thrilled to inform you that your payment has been successfully approved! You now have full access to all your paid courses. Get ready to dive into your learning journey! Thank you for choosing us.`,
        senderId: user.id,
        userId:payment.customerId
      },
    });

    return NextResponse.json(approvePayment);
  } catch (err:any) {
    return NextResponse.json({ status: false, message: err.message });
  }
}
