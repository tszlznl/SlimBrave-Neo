import PageShell from "@/components/PageShell"
import TopNav from "@/components/TopNav"
import { cn } from "@/lib/utils"
import { Download, Upload } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type Output = {
  size: number
  url: string
}

const sizes = [16, 32, 48, 64, 128, 256]

export default function Generator() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string>("")
  const [outputs, setOutputs] = useState<Output[]>([])
  const [busy, setBusy] = useState(false)

  const hasSource = !!sourceUrl
  const title = useMemo(() => (hasSource ? "已就绪：多尺寸 PNG" : "上传图片并生成多尺寸 PNG"), [hasSource])

  useEffect(() => {
    return () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl)
      outputs.forEach((o) => URL.revokeObjectURL(o.url))
    }
  }, [sourceUrl, outputs])

  async function generate(file: File) {
    setBusy(true)
    outputs.forEach((o) => URL.revokeObjectURL(o.url))
    setOutputs([])

    const src = URL.createObjectURL(file)
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)
    setSourceUrl(src)

    try {
      const img = await loadImage(src)
      const next: Output[] = []

      for (const s of sizes) {
        const blob = await renderToPng(img, s)
        next.push({ size: s, url: URL.createObjectURL(blob) })
      }

      setOutputs(next)
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageShell>
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">Convert Image to Favicon</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
          这里提供一个轻量版生成器：上传任意图片后，会输出多个常用尺寸的 PNG。若需要 ICO 多分辨率封装，可在此基础上继续扩展。
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-start">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/85">{title}</div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
              >
                <Upload className="h-4 w-4" />
                选择图片
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                aria-label="上传图片"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) void generate(f)
                }}
              />
            </div>

            <div
              className={cn(
                "mt-4 grid place-items-center overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6",
                busy && "opacity-70"
              )}
            >
              {hasSource ? (
                <img src={sourceUrl} alt="source" className="max-h-[320px] w-auto rounded-2xl" />
              ) : (
                <div className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Upload className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white/80">拖拽或点击上传</div>
                  <div className="mt-1 text-sm text-white/55">建议使用 512x512 或更大的源图</div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white/85">输出</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {sizes.map((s) => {
                const out = outputs.find((o) => o.size === s)
                const disabled = !out || busy
                const filename = `favicon-${s}x${s}.png`
                return (
                  <div key={s} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white/80">{s}×{s}</div>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (!out) return
                          const a = document.createElement("a")
                          a.href = out.url
                          a.download = filename
                          document.body.appendChild(a)
                          a.click()
                          a.remove()
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-cyan-300/90 to-blue-500/90 px-3 py-1.5 text-sm font-semibold text-black transition hover:brightness-105 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Download className="h-4 w-4" />
                        下载
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        {out ? <img src={out.url} alt={`${s}x${s}`} className="h-7 w-7 rounded-md" /> : null}
                      </div>
                      <div className="text-xs leading-5 text-white/55">
                        {busy ? "生成中…" : out ? "已生成" : hasSource ? "等待生成" : "等待上传"}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  )
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("load_failed"))
    img.src = src
  })
}

async function renderToPng(img: HTMLImageElement, size: number) {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("no_ctx")

  const iw = img.naturalWidth || img.width
  const ih = img.naturalHeight || img.height
  const scale = Math.max(size / iw, size / ih)
  const w = iw * scale
  const h = ih * scale
  const x = (size - w) / 2
  const y = (size - h) / 2

  ctx.clearRect(0, 0, size, size)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, x, y, w, h)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("blob_failed"))), "image/png")
  })

  return blob
}
