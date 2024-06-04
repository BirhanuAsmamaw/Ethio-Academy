
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function GET(req: Request, {params}:{params:{lessonId:string}}){
  const lessonId=params?.lessonId;
  
  try{
    const lesson = await prisma.lesson.findUnique({
      where:{id:lessonId},
      include:{
        contents:{
          include:{
            subContents:true
          }
        },
        chapter:{
          include:{
            course:{

              include:{
                subject:{
                  include:{
                    department:true
                  }
                },
                chapters:{
                  include:{
                    lessons:true
                  }
                }
              }
            }
          }
        },
        questions:true
      }
      
    });
  return NextResponse.json(lesson,{status:200})
  }catch(e){
    return  NextResponse.json({message:"Something went wrong"},{status:500});
  }
}