import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDB();

      // Does user exist?
      const userExists = await User.findOne({ email: profile.email });

      // If no user, create one
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", ""),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
