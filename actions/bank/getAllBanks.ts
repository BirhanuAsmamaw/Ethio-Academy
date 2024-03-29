import prisma from "@/lib/prismadb"
export async function getAllBanks(){
  try{
    const banks=await prisma.bank.findMany()
    return banks;
  }
  catch(e){
    return null
  }
}