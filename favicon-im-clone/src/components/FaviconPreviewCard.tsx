import CopyButton from "@/components/CopyButton"
import { buildFaviconUrl, downloadImageFromUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"
import { useMemo } from "react"

type Props = {
  domain: string
  larger?: boolean
  className?: string
}

export default function FaviconPreviewCard({ domain, larger, className }: Props) {
  const url = useMemo(() => buildFaviconUrl(domain, { larger }), [domain, larger])
  const alt = useMemo(() => {
    const clean = domain.trim() || "domain"
    return `${clean} favicon${larger ? " (large)" : ""}`
  }, [domain, larger])

  const code = useMemo(() => {
    if (!url) return ""
    return `<img src="${url}" alt="${alt}" loading="lazy" />`
  }, [url, alt])

  const filename = useMemo(() => {
    const safe = domain.trim().replace(/[^a-zA-Z0-9.-]+/g, "_") || "favicon"
    return `${safe}${larger ? "-large" : ""}.png`
  }, [domain, larger])

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/3 p-5 shadow-[0_22px_80px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white/80">{larger ? "大尺寸" : "默认尺寸"}</h3>
        <CopyButton text={code} />
      </div>

      <pre className="mb-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/75">
        <code>{code || "在上方输入域名或 URL"}</code>
      </pre>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
            {url ? (
              <img
                src={url}
                alt={alt}
                loading="lazy"
                className="h-8 w-8 rounded-md"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.opacity = "0"
                }}
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white/90">{url ? domain : "—"}</div>
            <div className="text-xs text-white/55">{url ? "渲染图像" : "等待输入"}</div>
          </div>
        </div>

        <button
          type="button"
          disabled={!url}
          onClick={() => {
            if (!url) return
            void downloadImageFromUrl(url, filename)
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-cyan-300/90 to-blue-500/90 px-4 py-2 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(34,211,238,0.22)] transition hover:brightness-105 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          下载
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </section>
  )
}

