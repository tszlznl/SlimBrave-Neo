import FaqAccordion from "@/components/FaqAccordion"
import FaviconPreviewCard from "@/components/FaviconPreviewCard"
import FaviconTile from "@/components/FaviconTile"
import PageShell from "@/components/PageShell"
import TopNav from "@/components/TopNav"
import { blogLinks, faqs, featuredDomains, products } from "@/data/content"
import { normalizeDomain } from "@/lib/favicon"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  const [value, setValue] = useState("hey.com")

  const domain = useMemo(() => normalizeDomain(value), [value])

  return (
    <PageShell>
      <TopNav />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/70">
              <span className="text-white/90">Favicon download service</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>即时获取与下载任何网站图标</span>
            </div>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
              Favicon.im/<span className="text-cyan-200">{`{domain}`}</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/70">
              输入域名或网址，立刻得到可直接引用的图标 URL，并支持复制代码与一键下载。此项目仅复刻前端交互，图标由 favicon.im
              提供。
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#api"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-cyan-300/90 to-blue-500/90 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(34,211,238,0.20)] transition hover:brightness-105 active:brightness-95"
              >
                开始使用 <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/generator"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
              >
                图片转图标
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <Metric label="每月服务请求" value="30M+" />
            <Metric label="可直接引用" value="URL" />
            <Metric label="两种尺寸" value="Default/Large" />
            <Metric label="复制与下载" value="1-click" />
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-white/90">热门示例</h2>
            <div className="text-sm text-white/55">点击任意卡片进入详情页</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDomains.map((d) => (
              <FaviconTile key={d} domain={d} />
            ))}
          </div>
        </section>

        <section id="api" className="mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-white/90">图标 API 使用</h2>
            <a
              href="https://favicon.im/zh/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-cyan-200/90 transition hover:text-cyan-200"
            >
              原站参考
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <label className="text-sm font-semibold text-white/70">输入网址或域名：</label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="例如：hey.com 或 https://hey.com"
                className="w-full flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-black/40"
              />
              <Link
                to={domain ? `/domain/${encodeURIComponent(domain)}` : "#"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white sm:w-48"
              >
                打开详情 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <FaviconPreviewCard domain={domain} />
            <FaviconPreviewCard domain={domain} larger />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white/85">额外参数</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-white/65">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="font-mono text-xs text-white/80">default-avatar=URL</div>
                  <div className="mt-1">未找到图标时重定向到该 URL，而不是返回默认图标（需 URL 编码）。</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="font-mono text-xs text-white/80">throw-error-on-404=true</div>
                  <div className="mt-1">未找到图标时返回 404，便于使用 onerror 自定义替代图片。</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white/85">提示</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
                <li>建议在页面与应用中直接引用图标 URL。</li>
                <li>在 Next.js 中需要将 favicon.im 加入受信任的图片域名。</li>
                <li>推荐使用 loading="lazy" 避免一次性加载过多图标。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white/90">博客</h2>
            <div className="space-y-2">
              {blogLinks.map((b) => (
                <a
                  key={b.href}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/7 hover:text-white"
                >
                  <span className="leading-6">{b.title}</span>
                  <ArrowRight className="mt-0.5 h-4 w-4 text-white/40 transition group-hover:text-white/70" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white/90">产品</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/7 hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-white/90">{p.name}</div>
                    <ExternalLink className="h-4 w-4 text-white/35 transition group-hover:text-white/70" />
                  </div>
                  <div className="mt-1 text-sm leading-6 text-white/60">{p.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-lg font-semibold text-white/90">常见问题</h2>
          <FaqAccordion items={faqs} />
        </section>

        <footer className="mt-16 border-t border-white/10 pt-8">
          <div className="grid gap-8 md:grid-cols-3">
            <FooterCol
              title="工具"
              links={[
                { title: "Memocat", href: "https://memocat.com/" },
                { title: "Datetime", href: "https://datetime.app/" },
                { title: "QRCode.fun", href: "https://qrcode.fun/" },
                { title: "Logo.Surf", href: "https://www.logo.surf/" },
              ]}
            />
            <FooterCol
              title="Format Converters"
              links={[
                { title: "PNG to Favicon", href: "/generator" },
                { title: "JPG/JPEG to Favicon", href: "/generator" },
                { title: "SVG to Favicon", href: "/generator" },
                { title: "GIF to Favicon", href: "/generator" },
              ]}
            />
            <FooterCol
              title="Available Languages"
              links={[
                { title: "English", href: "https://favicon.im/" },
                { title: "简体中文", href: "https://favicon.im/zh/" },
                { title: "日本語", href: "https://favicon.im/ja/" },
                { title: "한국어", href: "https://favicon.im/ko/" },
              ]}
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-white/45">
            <div>仅用于学习与复刻演示 · 图标资源归原站与各自域名所有</div>
            <div className="flex items-center gap-3">
              <a className="hover:text-white/70" href="https://favicon.im/zh/" target="_blank" rel="noreferrer">
                Free Favicon API
              </a>
              <a className="hover:text-white/70" href="https://favicon.im/zh/changelog" target="_blank" rel="noreferrer">
                Changelog
              </a>
            </div>
          </div>
        </footer>
      </main>
    </PageShell>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs font-semibold text-white/55">{label}</div>
      <div className="mt-2 font-display text-xl tracking-tight text-white">{value}</div>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white/80">{title}</div>
      <div className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <a
            key={l.title}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="block text-white/55 transition hover:text-white/80"
          >
            {l.title}
          </a>
        ))}
      </div>
    </div>
  )
}
