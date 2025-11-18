import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Your backend API endpoint

const RENDER_API_URL = "https://msroom.onrender.com/api";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    /**
     * This callback is triggered *after* a successful Google sign-in.
     */
    async jwt({ token, account, profile }) {
      
      // 'account' and 'profile' are only sent on the *first* sign-in
      if (account && profile?.email) {
        try {
          // 1. Call your backend API to "find or create" the user
          const res = await fetch(`${RENDER_API_URL}/users/find-or-create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Secure this server-to-server call with a secret
              "X-Internal-Auth-Secret": process.env.NEXTAUTH_TO_RENDER_SECRET!,
            },
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              googleAccountId: account.providerAccountId, // Good to save this
            }),
          });

          if (!res.ok) {
            console.error("Backend 'find-or-create' failed");
            throw new Error("Failed to sign in user with backend.");
          }

          // 2. Your backend returns its user data (with ID and roles)
          const backendUser = await res.json();
          // e.g., { id: "cl-uuid-12345", roles: ["user"] }

          // 3. Add your backend's data to the NextAuth token
          token.apiUserId = backendUser.id;
          token.apiRoles = backendUser.roles;

        } catch (error) {
          console.error("Error in JWT callback:", error);
          // On error, return the existing token instead of null to satisfy the expected JWT return type
          return token;
        }
      }
      
      // On subsequent visits, the token is already populated
      return token;
    },

    /**
     * This callback passes the data from the token to the client-side session
     */
    async session({ session, token }) {
      
      return session;
    },
  },
  // ... other settings
}