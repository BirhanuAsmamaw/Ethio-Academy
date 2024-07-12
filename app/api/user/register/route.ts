import { generateVerificationToken } from "@/actions/tokens/generateToken";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, repeatpassword } = body;

    if (!email || !password || !repeatpassword || !name) {
      return NextResponse.json({ message: 'Invalid parameters' }, { status: 400 });
    }

    if (password !== repeatpassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      if (!user.emailVerified) {
        const verificationToken = await generateVerificationToken(email);

        const confirmLink = `https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`;

        await sendVerificationEmail(verificationToken.email, confirmLink, name);

        return NextResponse.json({ success: "Confirmation email sent successfully" });
      } else {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: { name: name, username: email, email: email, hash: hashPassword }
      });

      const verificationToken = await generateVerificationToken(email);

      const confirmLink = `https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`;

      await sendVerificationEmail(verificationToken.email, confirmLink, name);

      return NextResponse.json({ success: "Confirmation email sent successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
