import prisma from "@/lib/prismadb"
export async function getTeacherPermission(permission:string){
  try{
    const permissionData = await prisma.permission.findFirst({
      where:{action: permission}
    })

    return permissionData;
  }
  catch(e){
    return null;
  }

}