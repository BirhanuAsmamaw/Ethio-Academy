import prisma  from "@/lib/prismadb"
export async function getUserById(id: string){
  try{
    const user = await prisma.user.findUnique({
      where:{id:id}
    });

    return user;
  }
  catch(err){
    return null;
  }

}