import Header from './components/Header';
import LogoShowcase from './components/LogoShowcase';
import Palette from './components/Palette';
import DownloadButtons from './components/DownloadButtons';
import { useRef } from 'react';

function App() {
  const svgRefDark = useRef(null);
  const svgRefLight = useRef(null);

  return (
    <div className="min-h-screen bg-[#0b1530] text-slate-100">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LogoShowcase title="Primary (Dark)" description="Optimized for dark backgrounds." theme="dark" svgRef={svgRefDark} />
          <LogoShowcase title="Secondary (Light)" description="Transparent logo on light surface." theme="light" svgRef={svgRefLight} />
        </section>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Palette />
          <div className="bg-[#0d1a36]/60 rounded-xl border border-slate-800/60 p-6">
            <h3 className="text-lg font-semibold tracking-tight">Download Assets</h3>
            <p className="text-slate-300/80 text-sm mt-1 mb-4">Export the logo in SVG or high-resolution PNG.</p>
            <div className="space-y-6">
              <DownloadButtons svgRef={svgRefDark} filenamePrefix="mindforge-logo-dark" pngBackground="dark" />
              <DownloadButtons svgRef={svgRefLight} filenamePrefix="mindforge-logo-transparent" pngBackground="transparent" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} MindForge. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
