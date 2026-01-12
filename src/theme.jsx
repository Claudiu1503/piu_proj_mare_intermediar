import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (
    typeof window !== 'undefined' ? (localStorage.getItem('piu-theme') || 'light') : 'light'
  ))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
    localStorage.setItem('piu-theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() { return useContext(ThemeContext) }
