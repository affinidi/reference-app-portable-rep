import { FC } from 'react'

import { QrScanSuccessIllustration } from 'assets/qr-scan-success-illustration'
import { QrScanErrorIllustration } from 'assets/qr-scan-error-illustration'
import { ErrorCodes, ErrorResponse } from 'types/error'

import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
  error?: Partial<ErrorResponse> | null
}

export const ResultContent: FC<ResultContentProps> = ({
  isValid,
  error
}) => {
  const showMessage = () => {
    if (isValid) {
      return 'Valid QR code'
    }

    return error?.code === ErrorCodes.SCAN_ERROR
      ? error?.message
      : 'Invalid QR code'
  }

  return (
    <>
      <S.ImgWrapper>
        {isValid ? (
          <QrScanSuccessIllustration />
        ) : (
          <QrScanErrorIllustration />
        )}
      </S.ImgWrapper>

      <S.ResultTitle
        align='center'
        variant='h5'
        $isVerified={isValid}
      >
        {showMessage()}
      </S.ResultTitle>
    </>
  )
}
