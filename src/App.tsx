import { useState, useCallback } from 'react';
import Toolbar from '@/components/Toolbar';
import CodeEditor from '@/components/CodeEditor';
import PreviewPanel from '@/components/PreviewPanel';
import TemplateModal from '@/components/TemplateModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TEMPLATES } from '@/types';
import type { EditorTab, CodeState, Template } from '@/types';

export default function App() {
  const [code, setCode] = useLocalStorage<CodeState>('html-viewer-code', TEMPLATES[0].code);
  const [activeTab, setActiveTab] = useState<EditorTab>('html');
  const [runKey, setRunKey] = useState(0);
  const [autoRun, setAutoRun] = useLocalStorage<boolean>('html-viewer-autorun', true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [splitRatio, setSplitRatio] = useLocalStorage<number>('html-viewer-split', 0.5);

  const handleRun = useCallback(() => setRunKey((k) => k + 1), []);

  const handleCodeChange = (tab: EditorTab) => (v: string) => {
    setCode((prev) => ({ ...prev, [tab]: v }));
  };

  const handleClear = () => {
    setCode({ html: '', css: '', js: '' });
    handleRun();
  };

  const handleDownload = () => {
    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${code.css}
</style>
</head>
<body>
${code.html}
<script>
${code.js}
</script>
</body>
</html>`;
    const blob = new Blob([fullDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (file.name.endsWith('.css')) {
        setCode((prev) => ({ ...prev, css: text }));
        setActiveTab('css');
      } else if (file.name.endsWith('.js')) {
        setCode((prev) => ({ ...prev, js: text }));
        setActiveTab('js');
      } else {
        // Try to parse a full HTML file
        const styleMatch = text.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        const scriptMatch = text.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

        if (styleMatch || scriptMatch || bodyMatch) {
          setCode({
            html: bodyMatch ? bodyMatch[1].trim() : text,
            css: styleMatch ? styleMatch[1].trim() : '',
            js: scriptMatch ? scriptMatch[1].trim() : '',
          });
        } else {
          setCode((prev) => ({ ...prev, html: text }));
          setActiveTab('html');
        }
      }
      handleRun();
    };
    reader.readAsText(file);
  };

  const handleTemplateSelect = (tpl: Template) => {
    setCode(tpl.code);
    setActiveTab('html');
    handleRun();
  };

  // Split drag handling
  const handleDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const container = e.currentTarget.parentElement;
      if (!container) return;

      const onMove = (ev: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const ratio = (ev.clientX - rect.left) / rect.width;
        setSplitRatio(Math.min(0.8, Math.max(0.2, ratio)));
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [setSplitRatio]
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0d0d14]">
      <Toolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRun={handleRun}
        onClear={handleClear}
        onDownload={handleDownload}
        onUpload={handleUpload}
        autoRun={autoRun}
        onToggleAutoRun={() => setAutoRun(!autoRun)}
        onOpenTemplates={() => setShowTemplates(true)}
      />

      {/* Split view */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Editor side */}
        <div
          className="h-full overflow-hidden"
          style={{ width: `${splitRatio * 100}%` }}
        >
          <CodeEditor
            value={code[activeTab]}
            onChange={handleCodeChange(activeTab)}
            tab={activeTab}
          />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={handleDrag}
          className="group relative w-1 cursor-col-resize bg-[#2a2a3d] transition-colors hover:bg-[#ff7849]/50"
        >
          <div className="absolute inset-y-0 -left-1 -right-1 z-10" />
          <div className="absolute left-1/2 top-1/2 h-8 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#353548] group-hover:bg-[#ff7849]" />
        </div>

        {/* Preview side */}
        <div
          className="h-full flex-1 overflow-hidden"
          style={{ width: `${(1 - splitRatio) * 100}%` }}
        >
          <PreviewPanel code={code} runKey={runKey} autoRun={autoRun} />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-[#2a2a3d] bg-[#14141f] px-4 py-1.5 text-[10px] text-[#6b6b85]">
        <div className="flex items-center gap-3">
          <span className="font-mono">
            {activeTab.toUpperCase()} · {code[activeTab].length} chars
          </span>
          {autoRun && (
            <span className="flex items-center gap-1 text-[#2dd4bf]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" />
              Auto-run
            </span>
          )}
        </div>
        <span className="font-mono">
          {Math.round(splitRatio * 100)}% / {Math.round((1 - splitRatio) * 100)}%
        </span>
      </div>

      <TemplateModal
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
}
