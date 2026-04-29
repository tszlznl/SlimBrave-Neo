import { PropsWithChildren } from "react"

export default function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-[#05070B] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-60 -top-72 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-72 -top-56 h-[620px] w-[620px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-[40vh] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_95%_15%,rgba(34,211,238,0.07),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(59,130,246,0.06),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(closest-side,rgba(0,0,0,0.95),transparent)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

