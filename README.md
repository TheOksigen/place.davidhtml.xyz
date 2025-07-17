
# 📦 Placeholder Image Generator

**place.davidhtml.xyz** — a simple and lightweight service to generate dynamic placeholder images on the fly. 

---

## 🌐 Live Demo

🔗 [https://place.davidhtml.xyz](https://place.davidhtml.xyz)

---

## 🧠 How It Works

The API generates an image based on the following `query` parameters:

| Parameter | Description               | Example      |
|-----------|---------------------------|--------------|
| `width`   | Image width in pixels     | `300`        |
| `height`  | Image height in pixels    | `200`        |
| `bg`      | Background color (hex)    | `cccccc`     |
| `color`   | Text color (hex)          | `333333`     |
| `format`  | Image format              | `png`, `jpeg` |

---

## 🖼 Usage Examples

- Basic placeholder image (300×200):

```

https://place.davidhtml.xyz/api/image?width=300\&height=200

```

- Red background, white text in JPEG format:

```

https://place.davidhtml.xyz/api/image?width=400\&height=300\&bg=ff0000\&color=ffffff\&format=jpeg

```


---

## 🚀 Built With

- [Next.js 14](https://nextjs.org/)
- App Router
- `canvas` for image generation on the server
- Deployable via [Vercel](https://vercel.com/) or other platforms

---

## 📁 Project Structure

```

app/
├─ api/
│  └─ image/route.ts     → Image generator API route
├─ page.tsx              → Main page (documentation)
public/
styles/

```

---

## 🧪 Roadmap

- ✅ Support for multiple formats (`png`, `jpeg`)
- ✅ Custom background and text color
<!-- - ⏳ Support for custom text (`?text=Hello`) -->
<!-- - ⏳ Font size control -->
<!-- - ⏳ Emoji support -->
<!-- - ⏳ CORS headers and CDN optimization -->

---

## 📜 License

MIT License. Free for personal and commercial use.

---

> ✨ Created by [David](https://t.me/theoksigen)