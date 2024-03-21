import prisma from "@/lib/prismadb"

export const getVerificationTokenByEmail = async(email:string)=>{
  try{
    const verificationToken= await prisma.verificationToken.findFirst({
      where:{email}
    });
    return verificationToken;
  }
  catch(err){
    return null;
  }

}
