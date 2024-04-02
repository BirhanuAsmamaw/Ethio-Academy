import prisma from "@/lib/prismadb"
export async function getQuestionById(id: string){
  try{
    const question = await prisma.question.findUnique({where: {id: id}})
    return question
  }
  catch(err){
    return null
  }
}