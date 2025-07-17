"use client"

import { useTranslations } from "next-intl"
import { Zap, Palette, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header" // Header import edildi
import { Footer } from "@/components/layout/footer" // Footer import edildi

export default function IndexPage() {
  const t = useTranslations("main")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header /> {/* Header komponenti istifadə edildi */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 bg-[length:200%_200%] animate-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">{t("hero.description")}</p>
            <Link href="/docs">
              <Button size="lg" className="px-8 py-3 text-lg">
                {t("hero.cta")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">{t("features.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Palette className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {t("features.customizable.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("features.customizable.description")}</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Zap className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{t("features.fast.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("features.fast.description")}</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <ImageIcon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {t("features.flexible.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("features.flexible.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{t("callToAction.title")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              {t("callToAction.description")}
            </p>
            <Link href="/docs">
              <Button size="lg" className="px-8 py-3 text-lg">
                {t("callToAction.button")}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer /> {/* Footer komponenti istifadə edildi */}
    </div>
  )
}
