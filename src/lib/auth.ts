import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      // console.log("JWT callback inii:", { token, user });
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      // console.log("Session callback isii:", { session, token });
      if (token.user) session.user = token.user;
      return session;
    },
  },
});
