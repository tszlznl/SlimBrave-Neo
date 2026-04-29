import { Check, Copy } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  text: string
  label?: string
  className?: string
}

export default function CopyButton({ text, label = "复制", className }: Props) {
  const [copied, setCopied] = useState(false)

  const disabled = useMemo(() => !text.trim(), [text])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1200)
    return () => window.clearTimeout(t)
  }, [copied])

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={async () => {
        if (disabled) return
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
        } catch {
          const el = document.createElement("textarea")
          el.value = text
          document.body.appendChild(el)
          el.select()
          document.execCommand("copy")
          el.remove()
          setCopied(true)
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      aria-label={label}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? "已复制" : label}</span>
    </button>
  )
}

