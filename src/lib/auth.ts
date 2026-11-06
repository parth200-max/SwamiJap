import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@swamijap.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const email = credentials.email.toLowerCase().trim();

        // 1. Check for fallback demo admin (convenience for instant out-of-the-box development & preview)
        const demoAdminEmail = process.env.ADMIN_EMAIL || "admin@swamijap.com";
        const demoAdminPassword = process.env.ADMIN_PASSWORD || "swamijap2026";

        if (email === demoAdminEmail && credentials.password === demoAdminPassword) {
          return {
            id: "admin-demo-id",
            name: "Swami Jap Administrator",
            email: demoAdminEmail,
            role: "ADMIN",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
          };
        }

        // 2. Query Prisma database if database is configured
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error("Invalid email or password");
          }

          if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
            throw new Error("Access restricted to administrators");
          }

          return {
            id: user.id,
            name: "Swami Jap Administrator",
            email: user.email,
            role: user.role,
            image: null,
          };
        } catch (dbError) {
          // If database is not yet migrated, fallback check already handled above
          console.error("Auth DB Error:", dbError);
          throw new Error("Authentication failed. Please verify database connection or use demo credentials.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "swami-jap-super-secret-key-change-in-production-2026",
};

export default authOptions;
