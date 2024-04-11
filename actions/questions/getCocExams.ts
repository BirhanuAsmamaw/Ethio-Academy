import prisma from "@/lib/prismadb";


export async function getCOCQuestionsByCategory(type: string, department: string, year: string, subject: string,university?: string){
  try {
    const whereClause: any = {
      year: year,
      
      
      department: {
        url: department,
        exam: {
          url: type,
        },
      },
      
    };
   
    if(university){
      whereClause.university={
        code:university
      }
    } 
    whereClause.subject = {
      id: subject
    };

    const selectedQuestion = await prisma.question.findMany({
      where: {department:{
        
      }},

    });

    return selectedQuestion;
  } catch (err) {
    // Handle the error appropriately
    console.error("Error in getQuestionsByCategory:", err);
    throw err; // Re-throw the error to be caught by the calling function or handle it accordingly.
  }
}
