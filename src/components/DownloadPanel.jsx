import { useRef } from 'react'
import Logo from './Logo'

export default function DownloadPanel({ bgStyle, setBgStyle, size, setSize }) {
  const svgRef = useRef(null)

  const downloadSVG = () => {
    const node = svgRef.current
    if (!node) return
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(node)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mindforge-logo-${bgStyle}.svg`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const downloadPNG = async () => {
    const node = svgRef.current
    if (!node) return
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(node)
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    const scale = 2
    const width = node.viewBox.baseVal.width || node.width.baseVal.value
    const height = node.viewBox.baseVal.height || node.height.baseVal.value

    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `mindforge-logo-${bgStyle}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
      }, 'image/png')
    }
    img.src = url
  }

  return (
    <aside className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur space-y-5">
      <h3 className="text-lg font-semibold">Export</h3>

      <div className="space-y-3">
        <label className="block text-sm text-white/80">Background</label>
        <div className="flex gap-2">
          <button
            onClick={() => setBgStyle('navy')}
            className={`px-3 py-2 rounded-lg border text-sm ${bgStyle === 'navy' ? 'bg-[#0B1220] border-[#223] text-white' : 'bg-transparent border-white/20 text-white/80'}`}
          >
            Dark Navy
          </button>
          <button
            onClick={() => setBgStyle('transparent')}
            className={`px-3 py-2 rounded-lg border text-sm ${bgStyle === 'transparent' ? 'bg-white/10 border-white/30 text-white' : 'bg-transparent border-white/20 text-white/80'}`}
          >
            Transparent
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-white/80">Size (px)</label>
        <input
          type="range"
          min="320"
          max="800"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-white/70">{size}px width</div>
      </div>

      <div className="flex gap-3">
        <button onClick={downloadSVG} className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90">
          Download SVG
        </button>
        <button onClick={downloadPNG} className="px-4 py-2 rounded-lg bg-[#FF6A00] text-white font-medium hover:opacity-90">
          Download PNG
        </button>
      </div>

      {/* Hidden render for export reference */}
      <div className="sr-only">
        {/* Render a fixed-size SVG for consistent export */}
        <div aria-hidden>
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width={840}
            height={440}
            viewBox="0 0 840 440"
          >
            {/* Background */}
            {bgStyle === 'navy' && (
              <rect x="0" y="0" width="840" height="440" rx="24" fill="#0B1220" />
            )}

            <g transform="translate(40, 60)">
              <circle cx="120" cy="160" r="110" fill="none" stroke="#0A2A6C" strokeWidth="12" />
              <path d="M60 235 V95 l45 68 45-68 v140" fill="none" stroke="#0A2A6C" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M85 120 L195 230" stroke="#FF6A00" strokeWidth="18" strokeLinecap="round" />
              <path d="M145 120 h60" stroke="#94A3B8" strokeWidth="14" strokeLinecap="round" />
              <path d="M145 170 h44" stroke="#94A3B8" strokeWidth="14" strokeLinecap="round" />
            </g>

            <g transform="translate(320, 120)">
              <text x="0" y="0" dominantBaseline="hanging" fontFamily="Inter, Manrope, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" fontSize="88" fontWeight="800" letterSpacing="0.5" fill="#FFFFFF">MindForge</text>
              <text x="2" y="110" dominantBaseline="hanging" fontFamily="Inter, Manrope, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" fontSize="28" fontWeight="600" fill="#94A3B8">Knowledge That Pays</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 p-3 text-xs text-white/70">
        Tip: Use SVG for crisp scaling in print and web. PNG is great for quick previews.
      </div>

      <div className="mt-2 text-[11px] text-white/50">
        © {new Date().getFullYear()} MindForge. All rights reserved.
      </div>
    </aside>
  )
}
