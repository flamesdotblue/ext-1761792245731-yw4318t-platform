import Logo from './Logo';

function LogoShowcase({ title, description, theme = 'dark', svgRef }) {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-slate-300/80 text-sm">{description}</p>
      </div>

      <div
        className={
          'rounded-2xl border overflow-hidden ' +
          (isDark
            ? 'bg-[#0a132b] border-slate-800/70'
            : 'bg-white border-slate-200 text-slate-900')
        }
      >
        <div className={isDark ? 'p-8 sm:p-10' : 'p-8 sm:p-10'}>
          <div className={isDark ? '' : 'mix-blend-normal'}>
            <div className="w-full max-w-3xl">
              <Logo ref={svgRef} theme={isDark ? 'dark' : 'light'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoShowcase;
