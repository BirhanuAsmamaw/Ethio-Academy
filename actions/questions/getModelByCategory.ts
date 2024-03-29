import prisma from "@/lib/prismadb";


export async function getModelQuestionsByCategory(type: string, department: string, year: string, subject?: string) {
  try {
    const whereClause: any = {
      year: year,
      isModel:true,
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

    return selectedQuestion;
  } catch (err) {
    // Handle the error appropriately
    console.error("Error in getQuestionsByCategory:", err);
    throw err; // Re-throw the error to be caught by the calling function or handle it accordingly.
  }
}