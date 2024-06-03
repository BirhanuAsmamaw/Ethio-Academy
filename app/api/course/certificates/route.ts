import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export  async function POST(req:Request,res:Response){
  const body=await req.json();
  try{
    const {lessonId}=body;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({  message: "Unauthorized" },{status:404});
    }
    
    // CHECk IF LESSONS EXISTS

    const lesson=await prisma.lesson.findUnique({where:{id:lessonId},select:{chapter:{select:{courseId:true}}}})

    if(!lesson){
      return NextResponse.json({  message: "Lesson does not exists" },{status:404}); 

    }

    // CHECK THE CERTIFICATES EXISTS
    const existingCourseCertificate=await prisma.courseCertificate.findFirst({
      where:{userId:user?.id,courseId:lesson.chapter.courseId}
    });

    if(!existingCourseCertificate){

      const certificate=await prisma.courseCertificate.create({
      data:{
        userId:user.id,
        courseId:lesson.chapter.courseId
      }
    });

   await prisma.lessonCertificate.create({
      data:{
        courseCertificateId:certificate?.id,
        lessonId:lessonId
      }
    });

    return NextResponse.json({  message: "Certificate created successfully" },{status:201});
  }


  // CHECK THE LESSON CERTIFICATE
  const LesCertificate=await prisma.lessonCertificate.findFirst({
    where:{
      lessonId:lessonId,
      courseCertificateId:existingCourseCertificate.id

    }
  })

  if(LesCertificate){
    return NextResponse.json({  message: "Lesson Certificate already created" },{status:400});
  }


  await prisma.lessonCertificate.create({
    data:{
      courseCertificateId:existingCourseCertificate?.id,
      lessonId:lessonId
    }
  });

  return NextResponse.json({  message: "Lesson Certificate created successfully" },{status:201});

  }
  catch(er){
  return NextResponse.json({  message: "something went wrong!" },{status:500});
  }
}