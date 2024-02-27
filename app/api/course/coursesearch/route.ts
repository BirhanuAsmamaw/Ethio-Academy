
import prisma from '@/lib/prismadb';
import {  NextResponse } from 'next/server';

export  async function GET(req: Request, res:NextResponse) {
  try {
    
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject") || "";
    

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }


    
    // Search courses by subject
    const courses = await prisma.course.findMany({
      where: {
        subject:{
          contains:subject,
          mode:'insensitive'
        }
      
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
