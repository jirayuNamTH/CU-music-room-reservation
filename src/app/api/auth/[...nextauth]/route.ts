import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// The handler is simpler in the App Router
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }