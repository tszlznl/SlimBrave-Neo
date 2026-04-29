import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Item = {
  q: string
  a: string
}

type Props = {
  items: Item[]
}

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const isOpen = open === idx
        return (
          <div
            key={it.q}
            className={cn(
              "overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition",
              isOpen && "bg-white/7"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen((v) => (v === idx ? null : idx))}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-white/90">{it.q}</span>
              <ChevronDown className={cn("h-5 w-5 text-white/60 transition", isOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0">
                <div className="px-4 pb-4 text-sm leading-6 text-white/70">{it.a}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

