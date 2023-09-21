import React from "react";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const user = { id: 1, name: "ExampleUser", email: "user@example.com" };

        // If no error and we have user data, return it
        if (username === "user@example.com" && password === "1Password") {
          return user;
        }
        // Return null if user data could not be retrieved
        // return null;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  //   callbacks: {
  //     session({ session, user }) {
  //       session.user.id = user.id;
  //       session.user.name = user.name;
  //       return session;
  //     },

  //   session: {
  //     strategy: "jwt",
  //     maxAge: 30 * 24 * 60 * 60, // 30 days
  //   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
