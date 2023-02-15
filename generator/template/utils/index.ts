import { DATA_PROVIDER_ROUTES } from './data-providers'

export const pxToRem = (px: number) => `${px / 8}rem`

export const ROUTES = {
  profileSetup: '/',
  singIn: '/sign-in',
  confirmSingIn: '/confirm-sign-in',
  ...DATA_PROVIDER_ROUTES,
}
