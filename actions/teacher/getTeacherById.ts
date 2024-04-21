import prisma from "@/lib/prismadb"
export async function getTeacherById(id: string){
try{
  const teacher=await prisma.teacher.findUnique({
    where:{id:id},
    include:{
      courses:{
        include:{
          reviews:true,
          subject:{
            include:{
              department:true,
            }
          },
          
        }
      },
      user:true,
    }
  })
  return teacher;
}
catch(e){
  return null;
}
}