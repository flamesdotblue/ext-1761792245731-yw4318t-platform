import { useState } from 'react';

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function serializeSvg(svgEl) {
  const clone = svgEl.cloneNode(true);
  // Ensure inline styles/fonts are preserved
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  return svgString;
}

async function svgToPng(svgEl, scale = 4, background = 'transparent') {
  const svgString = serializeSvg(svgEl);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.decoding = 'sync';
  img.crossOrigin = 'anonymous';

  const { width, height } = svgEl.viewBox.baseVal || { width: svgEl.clientWidth, height: svgEl.clientHeight };
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(width * scale));
  canvas.height = Math.max(1, Math.floor(height * scale));
  const ctx = canvas.getContext('2d');

  if (background !== 'transparent') {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  await new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve();
    };
    img.onerror = reject;
    img.src = svgUrl;
  });

  URL.revokeObjectURL(svgUrl);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

function DownloadButtons({ svgRef, filenamePrefix = 'mindforge-logo', pngBackground = 'transparent' }) {
  const [loading, setLoading] = useState(false);

  const onDownloadSvg = () => {
    const svgEl = svgRef?.current;
    if (!svgEl) return;
    const svgString = serializeSvg(svgEl);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `${filenamePrefix}.svg`);
  };

  const onDownloadPng = async () => {
    const svgEl = svgRef?.current;
    if (!svgEl) return;
    try {
      setLoading(true);
      const bg = pngBackground === 'dark' ? '#0a132b' : 'transparent';
      const blob = await svgToPng(svgEl, 4, bg);
      downloadBlob(blob, `${filenamePrefix}.png`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-sm font-medium text-slate-200 mb-2">{filenamePrefix.replaceAll('-', ' ')}</div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onDownloadSvg}
          className="inline-flex items-center px-4 py-2 rounded-md bg-slate-100 text-slate-900 hover:bg-white transition border border-slate-300 text-sm font-semibold"
        >
          Download SVG
        </button>
        <button
          onClick={onDownloadPng}
          className="inline-flex items-center px-4 py-2 rounded-md bg-[#ff7a00] text-white hover:brightness-110 transition border border-orange-500 text-sm font-semibold disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Rendering…' : 'Download PNG'}
        </button>
      </div>
      <div className="text-xs text-slate-400 mt-2">
        PNG background: {pngBackground === 'dark' ? 'Dark Navy' : 'Transparent'}
      </div>
    </div>
  );
}

export default DownloadButtons;
