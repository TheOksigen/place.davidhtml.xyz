import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server" // getTranslations əlavə edildi
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
import type { Metadata } from "next" // Metadata tipi əlavə edildi

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" })

  return {
    metadataBase: new URL("https://place.davidhtml.xyz"), // Saytınızın əsas domenini buraya yazın
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Your Company Name" }],
    creator: "Your Company Name",
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: `https://place.davidhtml.xyz/${locale}`,
      siteName: t("og.siteName"),
      images: [
        {
          url: "https://place.davidhtml.xyz/og-image.png", // Open Graph şəklinizin URL-i
          width: 1200,
          height: 630,
          alt: t("og.imageAlt"),
        },
      ],
      locale: locale,
      type: "website",
    },
 
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://place.davidhtml.xyz/${locale}`,
      languages: {
        en: "https://place.davidhtml.xyz/en",
        az: "https://place.davidhtml.xyz/az",
        ru: "https://place.davidhtml.xyz/ru",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
