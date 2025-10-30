function Header() {
  return (
    <header className="border-b border-slate-800/60 bg-[#0b1530]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1530]/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#0a2540] to-[#081a2f] border border-slate-700/70 grid place-items-center">
            <div className="h-3 w-3 rounded-sm bg-[#ff7a00]" />
          </div>
          <div className="text-lg font-bold tracking-tight">MindForge</div>
        </div>
        <div className="text-xs sm:text-sm text-slate-400">Knowledge That Pays</div>
      </div>
    </header>
  );
}

export default Header;
