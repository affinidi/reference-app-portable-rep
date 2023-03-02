import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'
import { AvatarIcon } from 'assets/avatar'

export const Wrapper = styled.div`
  padding: 0 ${pxToRem(24)};
  border-radius: 8px;
  background:${props => props.theme.colors.brand.primary['90']};
  cursor: pointer;
  
  * {
    cursor: pointer;
  }
`

export const Header = styled(Box)`
  min-height: ${pxToRem(72)};
`

export const Content = styled.div`
  padding: ${pxToRem(16)} 0;
`

export const AvatarIconWrapper = styled(AvatarIcon)`
  width: ${pxToRem(48)};
  height: ${pxToRem(48)};

  circle {
    fill: ${props => props.theme.colors.brand.primary['100']};
  }
`
