import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'
export const Title = styled(Typography)`
  padding-bottom: ${pxToRem(40)};

  @media (max-width: 1024px) {
    padding-bottom: ${pxToRem(24)};
  }
`
