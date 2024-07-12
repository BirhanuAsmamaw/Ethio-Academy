import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
import { myTeacherAccount } from "@/actions/teacher/myAccount";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { lessonId,parentId, language, content, code, image } = body;

    let codeExample;
    if (!code || !language) {
      codeExample = null;
    } else {
      codeExample = {
        language: language,
        code: code
      };
    }

    const myAccount:any=await myTeacherAccount()
 // authorization
 const user = await getCurrentUser();
 if(!user){
   return NextResponse.json({message:"Unauthorized"},{status:400})
   
 }
 
 
 const permissions=await myPermissions();
     if(!permissions){
       return NextResponse.json({message:"permissions not found"},{status:404})
     }

    if (!lessonId) {
      return NextResponse.json({message:"Invalid parameters"},{status:400})
     
    }

    const isDataAccessed = permissions?.some(
      (permission) => permission?.action === "CanManageOwnCourse"
    );
    if (!isDataAccessed) {
      return NextResponse.json({message:"Forbidden Resource"},{status:400})
      
    }

    if (!myAccount) {
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }

    if (!myAccount?.status) {
      return NextResponse.json({message:"Unauthorized"},{status:400})
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        chapter: {
          course: {
            instructorId: myAccount?.id,
          },
        },
      },
      include: {
        chapter: {
          include: {
            course: {
              include: {
                payments: {
                  include: {
                    payment: {
                      include: {
                        customer: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({message:"No lesson Found!"},{status:400})
     
    }

    const newContent = await prisma.content.create({
      data: {
        parentId:parentId,
        lessonId: lesson.id,
        content: content,
        image: image,
        codeExample: codeExample
      }
    });

   
   

    return NextResponse.json(newContent);
  } catch (err) {
    return NextResponse.json({message:"Something went wrong"},{status:500})
   
  }
}
