import React from 'react'

import { TabsProvider } from './useTabContext'
import * as S from './Tabs.styled'

type TabsProps = {
  onChange: (tab: number) => void
  value: unknown
  className?: string
}

const Tabs: React.FC<TabsProps> = ({ children, onChange, value, className }) => (
  <TabsProvider onChange={onChange} value={value}>
    <S.Tabs gap={40} alignItems="center" direction="row" className={className}>
      {children}
    </S.Tabs>
  </TabsProvider>
)

export default Tabs
