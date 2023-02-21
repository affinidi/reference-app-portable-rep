import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    battleNetAccessToken: string
  }
  interface Session extends DefaultSession {
    battleNetAccessToken: string
  }
}
