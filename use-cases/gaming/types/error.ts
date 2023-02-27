export type ErrorResponse = {
  code: string
  message?: string
  issues?: { message: string }[]
}

export enum ErrorCodes {
  SCAN_ERROR = 'SCAN_ERROR'
}

