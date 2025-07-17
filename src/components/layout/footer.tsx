import { Github, Send } from "lucide-react" // GitHub və Send ikonları əlavə edildi
import { Link } from "@/i18n/navigation" // Link komponenti əlavə edildi

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Placeholder API. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/theoksigen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href="https://t.me/theoksigen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            Telegram
          </Link>
        </div>
      </div>
    </footer>
  )
}
