import prisma from "@/lib/prismadb"

export async function getPaymentById(PaymentId:string){
  try{
    const payment = await prisma.payment.findUnique({
      where:{id:PaymentId},
      include:{
        customer:true,
        department:true
      }
      
      
      
    });
  return payment
  }catch(e){
    return null;
  }
  
}