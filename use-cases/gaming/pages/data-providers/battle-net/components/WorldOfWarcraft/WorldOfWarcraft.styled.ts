import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const MainTitle = styled(Typography)`
  margin: ${pxToRem(24)} 0 ${pxToRem(16)};
`

export const Title = styled(Typography)`
  margin: ${pxToRem(64)} 0 ${pxToRem(16)};
`

export const Label = styled(Typography)`
  color: ${props => props.theme.colors.brand.primary['50']};
`
