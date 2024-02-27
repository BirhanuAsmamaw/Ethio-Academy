import prisma from "@/lib/prismadb"

export async function UpdatedPaymentStatusById(PaymentId:string){
  try{
    const payment = await prisma.payment.update({
      where:{id:PaymentId},
      data:{status:true}
    })
  return payment
  }catch(e){
    return null;
  }
  
}