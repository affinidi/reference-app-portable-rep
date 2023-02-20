import { useCallback, useState } from 'react'

import { logout } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, setAuthState } = useAuthContext()
  const { clear } = useLocalStorage()

  const handleLogOut = useCallback(async () => {
    await logout()

    // NOTE: session storage do not cleared with cloudWalletService.logOut
    clear()

    setIsMenuOpen(false)

    setAuthState({ loading: false, authorized: false })
  }, [setIsMenuOpen, logout, clear, setAuthState])

  return {
    isMenuOpen,
    handleLogOut,
    setIsMenuOpen,
    isAuthorized: authState.authorized,
  }
}
