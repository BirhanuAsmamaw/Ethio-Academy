import prisma from "@/lib/prismadb"
export async function getTeacherById(id: string){
try{
  const teacher=await prisma.teacher.findUnique({
    where:{id:id},
    include:{
      user:true,
    }
  })
  return teacher;
}
catch(e){
  return null;
}
}