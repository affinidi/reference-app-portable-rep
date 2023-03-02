import React, { ReactNode } from 'react'

import Box from '../Box/Box'

import { TabsProvider } from './useTabContext'

type TabsProps = {
  onChange: (tab: number) => void
  value: unknown
  className?: string
  children: ReactNode
}

const Tabs: React.FC<TabsProps> = ({ children, onChange, value, className }) => (
  <TabsProvider onChange={onChange} value={value}>
    <Box gap={40} alignItems="center" direction="row" className={className}>
      {children}
    </Box>
  </TabsProvider>
)

export default Tabs
