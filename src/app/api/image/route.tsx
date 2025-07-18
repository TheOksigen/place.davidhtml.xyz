import { ImageResponse } from "@vercel/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const width = Number.parseInt(searchParams.get("w") || "400")
    const height = Number.parseInt(searchParams.get("h") || "200")
    const bgColor = searchParams.get("bg") || "cccccc"
    const textColor = searchParams.get("color") || "333333"
    const format = searchParams.get("format") || "png"

    const finalWidth = Math.max(1, Math.min(width, 2000))
    const finalHeight = Math.max(1, Math.min(height, 2000))


    let contentType = "image/png"
    if (format === "jpeg") {
      contentType = "image/jpeg"
    } else if (format === "webp") {
      contentType = "image/webp"
    }

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: `#${textColor}`,
          background: `#${bgColor}`,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {`${finalWidth}x${finalHeight}`}
      </div>,
      {
        width: finalWidth,
        height: finalHeight,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    )
  } catch (e: any) {
    console.error(e)
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    })
  }
}
