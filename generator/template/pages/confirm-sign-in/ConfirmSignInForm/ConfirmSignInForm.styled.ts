import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Button, Input, Typography } from 'components'

export const Wrapper = styled.div`
  padding-bottom: ${pxToRem(40)};
`

export const Prompt = styled(Typography)`
  margin: ${pxToRem(40)} 0;
`

export const VerificationFieldContainer = styled(Box)`
  @media (max-width: 1024px) {
    gap: ${pxToRem(16)};
  }
`

export const VerificationField = styled(Input)`
  input {
    text-align: center;
    padding: ${pxToRem(4)};
    border-radius: 8px;
    font-size: ${pxToRem(28)};
    font-weight: bold;

    &:focus {
      padding: ${pxToRem(4)} !important;
      border-width: 1px !important;
    }
  }
`

export const SignInButton = styled(Button)`
  margin: ${pxToRem(16)} 0 ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(40)};
  }
`

export const Label = styled(Typography)<{ hasError: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      color: ${props.theme.colors.utility.danger['100']};
    `}
`
