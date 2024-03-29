
import prisma from "@/lib/prismadb"
export async function getBankById(id:string){
  try{

    const bank=await prisma.bank.findUnique({
      where:{id:id}
    });

    return bank;
  }
  catch(e){
    return  null;
  }
}