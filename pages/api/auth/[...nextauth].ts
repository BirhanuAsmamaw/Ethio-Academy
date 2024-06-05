import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import bcrypt from 'bcrypt';
import { getUserById } from "@/actions/tokens/getUserbyd";
import { generateVerificationToken } from "@/actions/tokens/generateToken";
import { sendVerificationEmail } from "@/lib/mail";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;  // username is required
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hash) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.hash);

        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        if (user && !user.emailVerified) {
          const verificationToken = await generateVerificationToken(credentials.email);
          const confirmLink = `https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`;
          await sendVerificationEmail(verificationToken.email, confirmLink);
          throw new Error("Your account is not verified. Please check your email and verify your account!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/profile',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id as string);
        if (!existingUser?.emailVerified) {
          return false;
        }
      }
    
      if (account?.provider === "google") {
        if (user.email) { // Add null check for user.email
         
          
            user.username = user.email; // Update the user object
          }
        } else {
          throw new Error("Email is required for Google sign-in."); // Throw error if user.email is null or undefined
        }
      
    
      return true;
    }
,    
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
