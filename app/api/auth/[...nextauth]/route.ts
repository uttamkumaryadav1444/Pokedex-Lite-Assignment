import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      // expose simple user payload to client
      if (token) {
        session.user = {
          name: token.name as string | undefined,
          email: token.email as string | undefined,
          image: token.picture as string | undefined,
        }
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }