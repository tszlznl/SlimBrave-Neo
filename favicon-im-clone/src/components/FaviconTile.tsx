import { Link } from "react-router-dom"
import { buildFaviconUrl } from "@/lib/favicon"
import { cn } from "@/lib/utils"

type Props = {
  domain: string
  className?: string
}

export default function FaviconTile({ domain, className }: Props) {
  const src = buildFaviconUrl(domain, { larger: true })

  return (
    <Link
      to={`/domain/${encodeURIComponent(domain)}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/7 hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
          <img
            src={src}
            alt={`${domain} favicon`}
            loading="lazy"
            className="h-6 w-6 rounded-md"
            onError={(e) => {
              const t = e.currentTarget
              t.style.opacity = "0"
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white/90">{domain}</div>
          <div className="text-xs text-white/50 group-hover:text-white/60">查看与下载</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-2xl" />
      </div>
    </Link>
  )
}

