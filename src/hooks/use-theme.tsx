"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface UseTheme {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export function useTheme(): UseTheme {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme("system")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return { theme, setTheme }
}
