import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { Result } from '@zxing/library'

import { ROUTES } from 'utils'

import { extractHashAndKeyFromVSShareUrl } from './utils'
import { useScanner } from './useScanner'
import * as S from './QrScanner.styled'

type QrScannerProps = {};

const videoElementId = 'video-renderer'

const QrScanner: FC<QrScannerProps> = () => {
  const router = useRouter()

  const onScanned = useCallback(
    async (result: Result | undefined): Promise<void> => {
      const text = result?.getText()
      if (!text) {
        return
      }

      try {
        const hashAndKey = extractHashAndKeyFromVSShareUrl(text)

        await router.push(
          {
            pathname: ROUTES.scan.result,
            query: { key: hashAndKey?.key, hash: hashAndKey?.hash },
          },
          ROUTES.scan.result
        )
      } catch (error) {
        console.error(error)
        router.push(ROUTES.scan.result)
      }
    },
    [router]
  )

  useScanner({
    onScanned,
    videoElementId,
  })

  return (
    <S.Overlay>
      <video muted id={videoElementId} />
    </S.Overlay>
  )
}

export default QrScanner
