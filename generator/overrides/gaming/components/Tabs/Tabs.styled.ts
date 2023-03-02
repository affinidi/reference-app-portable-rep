import styled, { css } from 'styled-components'

import { pxToRem } from '../../utils'
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
