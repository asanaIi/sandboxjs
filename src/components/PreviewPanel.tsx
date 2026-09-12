import { useEffect, useRef, useState } from 'react';
import { RefreshCw, ExternalLink, Loader2 } from 'lucide-react';
import type { CodeState } from '@/types';

interface PreviewPanelProps {
  code: CodeState;
  runKey: number;
  autoRun: boolean;
}

export default function PreviewPanel({ code, runKey, autoRun }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildSrcDoc = (c: CodeState) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
${c.css}
</style>
</head>
<body>
${c.html}
<script>
try {
${c.js}
} catch(e) {
  console.error(e);
  document.body.insertAdjacentHTML('beforeend',
    '<div style="position:fixed;bottom:0;left:0;right:0;background:#1a0d0d;color:#ff6b6b;padding:12px 16px;font-family:monospace;font-size:13px;border-top:1px solid #ff6b6b33;">' +
    'JS Error: ' + e.message + '</div>');
}
<\/script>
</body>
</html>`;

  const runPreview = (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = buildSrcDoc(code);
      }
    } catch {
      setError('Failed to render preview');
    }

    setTimeout(() => setLoading(false), 400);
  };

  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(() => runPreview(false), 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, autoRun]);

  useEffect(() => {
    runPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);

  const openInNewTab = () => {
    const blob = new Blob([buildSrcDoc(code)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="flex h-full flex-col bg-[#0d0d14]">
      {/* Preview header */}
      <div className="flex items-center justify-between border-b border-[#2a2a3d] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 text-xs font-medium text-[#9999b0]">Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => runPreview()}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
            title="Reload preview"
          >
            <RefreshCw size={13} className={loading ? 'spinner' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={openInNewTab}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
            title="Open in new tab"
          >
            <ExternalLink size={13} />
            <span>Open</span>
          </button>
        </div>
      </div>

      {/* Preview body */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0d14]">
            <Loader2 size={24} className="spinner text-[#ff7849]" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d0d14] text-center">
            <p className="text-sm text-[#ff6b6b]">{error}</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title="preview"
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-modals"
        />
      </div>
    </div>
  );
}
