import FaviconPreviewCard from "@/components/FaviconPreviewCard"
import PageShell from "@/components/PageShell"
import TopNav from "@/components/TopNav"
import { normalizeDomain } from "@/lib/favicon"
import { ArrowLeft } from "lucide-react"
import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"

export default function Domain() {
  const params = useParams()
  const domain = useMemo(() => normalizeDomain(params.domain ?? ""), [params.domain])

  return (
    <PageShell>
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/8 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <div className="mt-6 flex flex-col gap-2">
          <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">{domain || "—"}</h1>
          <p className="text-sm leading-6 text-white/65">复制代码或下载图标。默认与大尺寸两种 URL 仅通过查询参数区分。</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <FaviconPreviewCard domain={domain} />
          <FaviconPreviewCard domain={domain} larger />
        </div>
      </main>
    </PageShell>
  )
}

