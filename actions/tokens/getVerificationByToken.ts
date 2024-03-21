import prisma from "@/lib/prismadb"

export const getVerificationTokenByToken = async(token:string)=>{
  try{
    const verificationToken= await prisma.verificationToken.findUnique({
      where:{token:token}
    });
    return verificationToken;
  }
  catch(err){
    console.log(err);
    return null;
  }

}
