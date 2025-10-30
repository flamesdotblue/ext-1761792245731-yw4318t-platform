function Swatch({ color, name, text = 'white' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-md border shadow-inner" style={{ backgroundColor: color, borderColor: 'rgba(15,23,42,0.2)' }} />
      <div>
        <div className="text-sm font-semibold" style={{ color: text === 'white' ? 'white' : '#0a2540' }}>{name}</div>
        <div className="text-xs text-slate-400 font-mono">{color}</div>
      </div>
    </div>
  );
}

function Palette() {
  return (
    <div className="bg-[#0d1a36]/60 rounded-xl border border-slate-800/60 p-6">
      <h3 className="text-lg font-semibold tracking-tight">Brand Palette</h3>
      <p className="text-slate-300/80 text-sm mt-1">Deep blue, bright orange, and gray.
      </p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Swatch color="#0a2540" name="Deep Blue" />
        <Swatch color="#ff7a00" name="Bright Orange" />
        <Swatch color="#94a3b8" name="Slate Gray" text="dark" />
      </div>
    </div>
  );
}

export default Palette;
