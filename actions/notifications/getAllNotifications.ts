import prisma from "@/lib/prismadb"

export async function getAllNotifications(){
  try{
    const notifications = await prisma.notification.findMany({
      orderBy:{
        createdAt:"desc"
      }
      
    });
  return notifications
  }catch(e){
    return null;
  }
  
}