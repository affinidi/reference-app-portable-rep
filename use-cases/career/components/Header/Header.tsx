import { FC } from 'react'
import { useRouter } from 'next/router'

import { BackIcon } from 'assets/back'
import { Container } from 'components'

import * as S from './Header.styled'

export type HeaderProps = {
  title: string;
  hasBackIcon?: boolean
  path?: string;
};

const Header: FC<HeaderProps> = ({ title, hasBackIcon, path }) => {
  const navigate = useRouter()

  const handleGoBack = () => path ? navigate.push(path) : navigate.back()

  return (
    <S.Container justifyContent="flex-end">
      <Container>
        {hasBackIcon && (
          <S.IconWrapper onClick={handleGoBack}>
            <BackIcon />
          </S.IconWrapper>
        )}

        <S.Title variant="h4">{title}</S.Title>
      </Container>
    </S.Container>
  )
}

export default Header
