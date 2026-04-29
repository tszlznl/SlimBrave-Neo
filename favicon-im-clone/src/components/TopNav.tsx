import { Link, NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight text-white">Favicon.im</span>
          <span className="text-xs font-semibold text-white/60 group-hover:text-white/80">复刻</span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              cn(
                "rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white",
                isActive && "bg-white/8 text-white"
              )
            }
          >
            Convert Image to Favicon
          </NavLink>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/80">
            ZH
          </span>
        </nav>
      </div>
    </header>
  )
}

