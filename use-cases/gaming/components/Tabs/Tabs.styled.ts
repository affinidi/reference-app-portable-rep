import styled, { css } from 'styled-components'

import { pxToRem } from '../../utils'

import Box from '../Box/Box'
import Typography from '../Typography/Typography'

export const Tab = styled(Typography)<{ $isActive: boolean }>`
  padding-bottom: ${pxToRem(4)};
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease-out;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.secondary['100']};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      pointer-events: none;
      border-color: ${theme.colors.brand.secondary['100']};
    `}
`

export const Tabs = styled(Box)`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
