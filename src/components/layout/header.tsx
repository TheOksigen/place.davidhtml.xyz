"use client"

import { Moon, Sun, Globe, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { useLocale } from "next-intl"

// Helper to get flag and initial for locale
const getLocaleDisplay = (locale: string) => {
  switch (locale) {
    case "en":
      return { flag: "🇬🇧", initial: " EN" }
    case "az":
      return { flag: "🇦🇿", initial: " AZ" }
    case "ru":
      return { flag: "🇷🇺", initial: " RU" }
    default:
      return { flag: "", initial: "" }
}
}

export function Header() {
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale })
  }

  const currentLocaleDisplay = getLocaleDisplay(locale)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex-none">
          <Link href="/" className="flex items-center space-x-2">
            <ImageIcon className="h-7 w-7 text-primary" />
            <span className="font-extrabold text-xl text-primary">Placeholder API</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-end space-x-2">
          <Select onValueChange={switchLanguage} defaultValue={locale}>
            <SelectTrigger className="w-[120px] flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              <SelectValue>
                <span className="flex items-center gap-1">
                  {currentLocaleDisplay.flag}
                  {currentLocaleDisplay.initial}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="az">🇦🇿 Azərbaycan</SelectItem>
              <SelectItem value="ru">🇷🇺 Русский</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
