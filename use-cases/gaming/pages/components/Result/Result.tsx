import { FC } from 'react'
import { useRouter } from 'next/router'

import { ErrorResponse } from 'types/error'
import { Box, Container, Header, Spinner } from 'components'

import { ResultContent } from './ResultContent'
import * as S from './Result.styled'

export type ResultProps = {
  isLoading?: boolean
  error?: Partial<ErrorResponse> | null
  isValid: boolean
  pathTo: string
}

export const Result: FC<ResultProps> = ({
  isLoading = false,
  isValid,
  error = null,
  pathTo,
}) => {
  const router = useRouter()

  if (isLoading) {
    return (
      <>
        <Header
          title="QR code scanned"
          hasBackIcon
        />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  const isResultValid = isValid && !error

  return (
    <>
      <Header
        title="QR code scanned"
        hasBackIcon
      />

      <Container>
        <div className='grid lg:grid-cols-3 gap-12 lg:gap-16'>
          <Box className='lg:col-start-2' alignItems='center'>
            <ResultContent isValid={isResultValid} error={error} />

            <S.ResultPara variant='p1'>
              {isResultValid
                ? 'QR Code successfully checked.'
                : 'QR Code is invalid.'}
            </S.ResultPara>

            <S.IssueButton
              fullWidth
              color='quaternary'
              variant='outlined'
              onClick={() => router.push(pathTo)}
            >
              Scan next QR code
            </S.IssueButton>
          </Box>
        </div>
      </Container>
    </>
  )
}
