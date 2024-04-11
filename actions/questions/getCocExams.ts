import prisma from "@/lib/prismadb";


export async function getCOCQuestionsByCategory(type: string, department: string, year: string, subject: string,university?: string){
  try {
    const whereClause: any = {
      year: year,
      subject: subject,
      
      department: {
        url: department,
        exam: {
          url: type,
        },
      },
      
    };

    if(university){
      whereClause.university = {code:university};
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
