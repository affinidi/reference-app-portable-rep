export type ErrorResponse = {
  code: string
  message?: string
  issues?: { message: string }[]
}

export const SCAN_ERROR = 'SCAN_ERROR'

