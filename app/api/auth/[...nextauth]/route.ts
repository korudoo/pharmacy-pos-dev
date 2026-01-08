import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import bcrypt from "bcryptjs"

// Hardcoded users with bcrypt hashed passwords
const users = [
  {
    id: "1",
    email: "admin@pharmacy.com",
    name: "Admin User",
    role: "admin",
    // Password: admin123
    passwordHash: "$2b$10$nnpPEWcg9WiogDMPx3naPOcuiVYXFK3TGqy7oceujaPfTWeGR8gEq",
  },
  {
    id: "2",
    email: "cashier@pharmacy.com",
    name: "Cashier User",
    role: "cashier",
    // Password: cashier123
    passwordHash: "$2b$10$GukurY3aEIFUNdSEupS3NuzB7kzWkWlUdgJKzGZdGp8b3wpQSvOSK",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@pharmacy.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password")
        }

        // Find user by email
        const user = users.find((u) => u.email === credentials.email)

        if (!user) {
          throw new Error("Invalid email or password")
        }

        // Compare password with bcrypt hash
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          throw new Error("Invalid email or password")
        }

        // Return user object for JWT
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

  // JWT session strategy
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Configure JWT
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Callbacks
  callbacks: {
    // Add role to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.name = user.name
      }
      return token
    },

    // Add role to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: "/",
    error: "/",
  },

  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
