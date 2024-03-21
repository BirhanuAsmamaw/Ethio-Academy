import prisma from "@/lib/prismadb"
export async function getUserByEmail(email: string){
 try{
const user = await prisma.user.findUnique({where: {email: email}});
return user
 }
 catch(e){
  return null;
 }
}