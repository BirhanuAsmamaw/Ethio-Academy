
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function GET(req: NextRequest){
  
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");
  
    try {

      if(!url){
        return NextResponse.json({ message: "Invalid params" }, { status: 400 }); 
      }
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
      }
  
     

      // Check if the department exists
      const department= await prisma.department.findUnique({ where: { url: url } });
  
      if (!department) {
        return NextResponse.json({ message: "Department does not exist" }, { status: 404 });
      }

      const payedDepartment=await prisma.payment.findMany({
        where:{
          customerId:user?.id
        }
      });

      if(!payedDepartment){
        return NextResponse.json({message:"Payed Course not found!"},{status:404})
      }
  
      


    
    const isDeptPayed = payedDepartment?.some((dept:any) => (dept.departmentId === department?.id)&&dept.status)
   
    return NextResponse.json({isExamPayed:isDeptPayed,isUser:user?true:false},{status:200});
  }
  catch(err:any){
    return NextResponse.json({ message: err }, { status: 500 });
  }
}