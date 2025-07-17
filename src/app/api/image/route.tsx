import { createCanvas } from "canvas";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const width = parseInt(searchParams.get('w') || '300')
    const height = parseInt(searchParams.get('h') || '150')
    const bg = '#' + (searchParams.get('bg') || 'cccccc')
    const color = '#' + (searchParams.get('color') || '333333')
    const format = (searchParams.get('format') || 'png').toLowerCase()


    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    //bg
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    //text
    ctx.fillStyle = color
    ctx.font = `${Math.min(width / 10, 40)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${width}×${height}`, width / 2, height / 2)

    let buffer: BufferSource
    let contentType = 'image/png'

    switch (format) {
        case 'jpeg':
        case 'jpg':
            buffer = canvas.toBuffer('image/jpeg')
            contentType = 'image/jpeg'
            break
        case 'webp':
            buffer = canvas.toBuffer('image/webp')
            contentType = 'image/webp'
            break
        default:
            buffer = canvas.toBuffer('image/png')
            contentType = 'image/png'
            break
    }

    return new Response(buffer, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })

}