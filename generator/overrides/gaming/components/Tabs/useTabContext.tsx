import React, { createContext, ReactNode, useContext } from 'react'

type TabsProviderProps = {
  value: unknown
  onChange: (tab: number) => void
  children: ReactNode
}

const tabsContext = createContext({} as TabsProviderProps)

export const TabsProvider: React.FC<TabsProviderProps> = ({ children, onChange, value }) => (
  <tabsContext.Provider value={{ onChange, value }}>{children}</tabsContext.Provider>
)

export const useTabContext = () => useContext(tabsContext)
