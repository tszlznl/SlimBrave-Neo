export function normalizeDomain(input: string) {
  const raw = input.trim()
  if (!raw) return ""

  try {
    const url = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`)
    return url.hostname.replace(/^www\./, "")
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] ?? ""
  }
}

export function buildFaviconUrl(domain: string, opts?: { larger?: boolean }) {
  const clean = normalizeDomain(domain)
  if (!clean) return ""
  const url = new URL(`https://favicon.im/${clean}`)
  if (opts?.larger) url.searchParams.set("larger", "true")
  return url.toString()
}

export async function downloadImageFromUrl(url: string, filename: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(String(res.status))
    const blob = await res.blob()

    const obj = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = obj
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(obj)
    return true
  } catch {
    window.open(url, "_blank", "noopener,noreferrer")
    return false
  }
}

