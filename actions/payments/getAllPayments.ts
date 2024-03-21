import prisma from "@/lib/prismadb"

export async function getAllPayments(){
  try{
    const payments = await prisma.payment.findMany({
      include:{
        customer:true
      }
    })
  
  return payments
  }catch(e){
   
    return null;
  }
  
}