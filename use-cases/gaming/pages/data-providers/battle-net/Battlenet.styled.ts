import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Typography } from 'components'

export const Wrapper = styled.div`
  padding: ${pxToRem(24)} 0 ${pxToRem(80)};
`

export const LastUpdate = styled(Box)`
  margin-bottom: ${pxToRem(40)};

  span {
    margin: 0;
  }
`

export const GrayText = styled(Typography)`
  color: ${(props) => props.theme.colors.neutral.primary['70']};
`

export const LoadingWrapper = styled.div`
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.colors.brand.secondary['100']};
  }
`
