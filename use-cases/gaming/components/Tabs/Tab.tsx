import React, { HTMLAttributes, ReactNode } from 'react'

import { useTabContext } from './useTabContext'
import * as S from './Tabs.styled'

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  index: number
  children: ReactNode
}

const Tab: React.FC<TabProps> = ({ children, index, ...rest }) => {
  const { onChange, value } = useTabContext()

  const handleClick = () => onChange(index)

  return (
    <S.Tab {...rest} variant="p2" $isActive={index === value} onClick={handleClick} tag="div">
      {children}
    </S.Tab>
  )
}

export default Tab
