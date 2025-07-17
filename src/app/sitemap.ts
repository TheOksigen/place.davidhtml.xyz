import type { MetadataRoute } from "next"
// import { locales } from "@/i18n/navigation" 

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ["en", "az", "ru"]
    const baseUrl = "https://place.davidhtml.xyz" 

    const routes = ["", "/docs"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const, 
        priority: route === "" ? 1 : 0.8, 
    }))

    const localizedRoutes = locales.flatMap((locale) =>
        routes.map((route) => ({
            ...route,
            url: `${baseUrl}/${locale}${route.url.replace(baseUrl, "")}`, 
        })),
    )

    return localizedRoutes
}
