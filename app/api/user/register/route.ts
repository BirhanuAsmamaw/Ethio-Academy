import prisma from "@/lib/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
  console.log("user created");
  const body=await req.json()

  const {name,email,password,repeatpassword}=body
  if(!email || !password || !repeatpassword ||!name){
    throw new Error('invalid params');
  }

  if (password!==repeatpassword){
    throw new Error('password does not match');
  }

  const user = await prisma.user.findUnique({where: {email: email}})

  if (user) {
    throw new Error('User already exists');
  }

  const hashPassword=await bcrypt.hash(password,10)

  const newUser= await prisma.user.create({
    data:{name:name,email:email,hash:hashPassword}
  });

  return NextResponse.json(newUser);
  
}