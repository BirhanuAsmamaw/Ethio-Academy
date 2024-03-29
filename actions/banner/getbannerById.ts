import prisma from "@/lib/prismadb"
export async function getBannerById(id:string){
  try{
    const  banner=await prisma.hero.findUnique({where:{id:id}})
    return banner;
  }
  catch(e){
    return null
  }
}