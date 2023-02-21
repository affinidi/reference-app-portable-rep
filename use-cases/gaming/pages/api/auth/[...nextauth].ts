import NextAuth, { NextAuthOptions } from 'next-auth'
import BattleNetProvider, { BattleNetIssuer } from 'next-auth/providers/battlenet'
import { authJwtSecret } from '../env'
import { battleNetClientId, battleNetClientSecret, battleNetIssuer } from '../data-providers/env'

export const authOptions: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: battleNetClientId,
      clientSecret: battleNetClientSecret,
      issuer: battleNetIssuer as BattleNetIssuer,
    })
  ],
  secret: authJwtSecret,
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'battlenet' && account.access_token) {
        user.battleNetAccessToken = account.access_token
        return true
      }

      return false
    },
    async jwt({ token, user }) {
      if (user?.battleNetAccessToken) {
        token.battleNetAccessToken = user.battleNetAccessToken
      }

      return token
    },
    async session({ session, token }) {
      session.battleNetAccessToken = token.battleNetAccessToken as string
      return session
    },
  },
}

export default NextAuth(authOptions)
