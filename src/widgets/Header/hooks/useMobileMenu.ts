// src/widgets/Header/hooks/useMobileMenu.ts
import { useState, useEffect } from 'react'

export const useMobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (mobileMenuOpen) closeMobileMenu()
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [mobileMenuOpen])

  return { mobileMenuOpen, toggleMobileMenu, closeMobileMenu }
}
