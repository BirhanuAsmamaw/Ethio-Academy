import prisma from "@/lib/prismadb"

export async function getAllNotifications(){
  try{
    const notifications = await prisma.notification.findMany({
      
    });
  return notifications
  }catch(e){
    return null;
  }
  
}