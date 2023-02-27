import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { ErrorResponse, SCAN_ERROR } from 'types/error'

import { Result } from '../../components/Result/Result'

import { useVerifyVcQuery } from './useVerifyVcQuery'

const ScanResult: FC = () => {
  const router = useRouter()
  const [scanError, setScanError] = useState<Partial<ErrorResponse> | null>(
    null
  )

  const { key, hash } = router.query as { key: string; hash: string }

  const { data, isLoading, error } = useVerifyVcQuery({ key, hash })

  useEffect(() => {
    if (!key || !hash) {
      setScanError({ code: SCAN_ERROR, message: 'The QR code was not recognized' })
    }
  }, [key, hash])

  return (
    <Result
      isLoading={scanError ? false : isLoading}
      error={error || scanError}
      isValid={Boolean(data?.isValid)}
      pathTo={ROUTES.scan.root}
    />
  )
}

export default ScanResult
