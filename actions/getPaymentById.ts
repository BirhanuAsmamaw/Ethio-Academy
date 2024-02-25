import prisma from "@/lib/prismadb"

export async function getPaymentById(PaymentId:string){
  try{
    const payment = await prisma.payment.findUnique({
      where:{id:PaymentId},
      
      
      
    });
  return payment
  }catch(e){
    return null;
  }
  
}