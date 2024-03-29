import prisma from "@/lib/prismadb"
export async function getBanner(){
  try{
    const  banner=await prisma.hero.findMany()
    return banner[0];
  }
  catch(e){
    return null
  }
}