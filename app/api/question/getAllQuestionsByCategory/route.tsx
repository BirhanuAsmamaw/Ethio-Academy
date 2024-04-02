import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type, department, year, subject, isModel } = req.query

    const whereClause: any = {
      year: year,
      isModel: isModel,
      department: {
        departmentName: department,
        exam: {
          url: type,
        },
      },
    };

    if (subject) {
      whereClause.subject = subject;
    }

    const selectedQuestion = await prisma.question.findMany({
      where: whereClause,
    });

    return res.json(selectedQuestion);
  } catch (err) {
    // Handle the error appropriately
    console.error("Error in getQuestionsByCategory:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
