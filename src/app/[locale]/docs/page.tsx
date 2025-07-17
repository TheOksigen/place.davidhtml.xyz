"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Copy, Check, Code2, Palette, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "@/i18n/navigation"
import { ColorInput } from "@/components/ui/color-input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer" // Footer import edildi

export default function DocsPage() {
  const t = useTranslations("docs")
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [previewParams, setPreviewParams] = useState({
    width: "400",
    height: "200",
    bg: "f0f0f0",
    color: "333333",
    format: "png",
  })
  const router = useRouter()
  const pathname = usePathname()

  const copyToClipboard = async (text: string, id: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id) // Kopyalandığını qeyd et
      setTimeout(() => setCopiedCode(null), 2000) // 2 saniyə sonra sıfırla
    } else {
      // Fallback for browsers that don't support navigator.clipboard
      console.error("Clipboard API not available or not supported.")
      // Optionally, you could implement a fallback here, e.g., using document.execCommand('copy')
      // but it's deprecated and less reliable. For most modern browsers, navigator.clipboard is preferred.
      alert("Kopyalama funksiyası brauzerinizdə dəstəklənmir.") // İstifadəçiyə məlumat ver
    }
  }

  const generatePreviewUrl = () => {
    const params = new URLSearchParams({
      w: previewParams.width,
      h: previewParams.height,
      bg: previewParams.bg,
      color: previewParams.color,
      format: previewParams.format,
    })
    return `/api/image?${params.toString()}`
  }

  const switchLanguage = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale })
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">{t("hero.title")}</h1>
            <p className="text-xl text-muted-foreground mb-6">{t("hero.description")}</p>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {t("hero.badges.free")}
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {t("hero.badges.fast")}
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {t("hero.badges.customizable")}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12">
              <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
              <TabsTrigger value="parameters">{t("tabs.parameters")}</TabsTrigger>
              <TabsTrigger value="examples">{t("tabs.examples")}</TabsTrigger>
              <TabsTrigger value="playground">{t("tabs.playground")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Code2 className="h-5 w-5" />
                    {t("overview.quickStart.title")}
                  </CardTitle>
                  <CardDescription>{t("overview.quickStart.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg relative border border-border">
                    <code className="text-sm text-foreground break-all">
                      {t("overview.quickStart.baseUrl")}/api/image?w=400&h=200&bg=f0f0f0&color=333333
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/api/image?w=400&h=200&bg=f0f0f0&color=333333`,
                          "quick-start",
                        )
                      }
                    >
                      {copiedCode === "quick-start" ? (
                        <Check className="h-4 w-4 transition-all duration-200" />
                      ) : (
                        <Copy className="h-4 w-4 transition-all duration-200" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <img
                      src="/api/image?w=400&h=200&bg=f0f0f0&color=333333"
                      alt="Example placeholder"
                      className="border border-border rounded-lg shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t("overview.features.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Palette className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("overview.features.customizable.title")}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t("overview.features.customizable.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ImageIcon className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("overview.features.formats.title")}</h4>
                        <p className="text-sm text-muted-foreground">{t("overview.features.formats.description")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parameters" className="space-y-8 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t("parameters.title")}</CardTitle>
                  <CardDescription>{t("parameters.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { param: "w", type: "number", default: "300", description: t("parameters.width") },
                      { param: "h", type: "number", default: "150", description: t("parameters.height") },
                      { param: "bg", type: "string", default: "cccccc", description: t("parameters.background") },
                      { param: "color", type: "string", default: "333333", description: t("parameters.textColor") },
                      { param: "format", type: "string", default: "png", description: t("parameters.format") },
                    ].map((param) => (
                      <div key={param.param} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">
                            {param.param}
                          </code>
                          <Badge variant="outline" className="text-muted-foreground">
                            {param.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {t("parameters.default")}: <code className="font-mono">{param.default}</code>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-8 py-4">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: t("examples.basic.title"),
                    url: "/api/image?w=300&h=200",
                    description: t("examples.basic.description"),
                  },
                  {
                    title: t("examples.colored.title"),
                    url: "/api/image?w=400&h=300&bg=3b82f6&color=ffffff",
                    description: t("examples.colored.description"),
                  },
                  {
                    title: t("examples.square.title"),
                    url: "/api/image?w=250&h=250&bg=10b981&color=ffffff",
                    description: t("examples.square.description"),
                  },
                  {
                    title: t("examples.wide.title"),
                    url: "/api/image?w=600&h=200&bg=f59e0b&color=000000",
                    description: t("examples.wide.description"),
                  },
                ].map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg relative border border-border">
                          <code className="text-sm break-all text-foreground">
                            {window.location?.origin || ""}
                            {example.url}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                            onClick={() =>
                              copyToClipboard(`${window.location.origin}${example.url}`, `example-${index}`)
                            }
                          >
                            {copiedCode === `example-${index}` ? (
                              <Check className="h-4 w-4 transition-all duration-200" />
                            ) : (
                              <Copy className="h-4 w-4 transition-all duration-200" />
                            )}
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <img
                            src={example.url || "/placeholder.svg"}
                            alt={example.title}
                            className="border border-border rounded-lg max-w-full h-auto shadow-md"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playground" className="space-y-8 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t("playground.title")}</CardTitle>
                  <CardDescription>{t("playground.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="width">{t("playground.width")}</Label>
                          <Input
                            id="width"
                            type="number"
                            value={previewParams.width}
                            onChange={(e) => setPreviewParams((prev) => ({ ...prev, width: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">{t("playground.height")}</Label>
                          <Input
                            id="height"
                            type="number"
                            value={previewParams.height}
                            onChange={(e) => setPreviewParams((prev) => ({ ...prev, height: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bg">{t("playground.background")}</Label>
                        <ColorInput
                          id="bg"
                          value={previewParams.bg}
                          onChange={(e) => setPreviewParams((prev) => ({ ...prev, bg: e.target.value }))}
                          placeholder="f0f0f0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="color">{t("playground.textColor")}</Label>
                        <ColorInput
                          id="color"
                          value={previewParams.color}
                          onChange={(e) => setPreviewParams((prev) => ({ ...prev, color: e.target.value }))}
                          placeholder="333333"
                        />
                      </div>
                      <div>
                        <Label htmlFor="format">{t("playground.format")}</Label>
                        <Select
                          value={previewParams.format}
                          onValueChange={(value) => setPreviewParams((prev) => ({ ...prev, format: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="bg-muted p-4 rounded-lg relative border border-border">
                        <code className="text-sm break-all text-foreground">{generatePreviewUrl()}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                          onClick={() => copyToClipboard(generatePreviewUrl(), "playground")}
                        >
                          {copiedCode === "playground" ? (
                            <Check className="h-4 w-4 transition-all duration-200" />
                          ) : (
                            <Copy className="h-4 w-4 transition-all duration-200" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 bg-muted/20">
                      <img
                        src={generatePreviewUrl() || "/placeholder.svg"}
                        alt="Live preview"
                        className="max-w-full max-h-full border border-border rounded shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer /> {/* Footer komponenti istifadə edildi */}
    </div>
  )
}
