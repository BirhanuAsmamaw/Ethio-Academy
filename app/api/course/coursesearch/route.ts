import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the subject from the query parameters
    const { subject } = req.query;

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }


    
    // Search courses by subject
    const courses = await prisma.course.findMany({
      where: {
        subject: {
          equals: subject.toString(), // Convert subject to string
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
