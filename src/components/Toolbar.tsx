import { useRef } from 'react';
import { Play, Zap, Trash2, Download, Upload, Code2, Sparkles } from 'lucide-react';
import type { EditorTab } from '@/types';

interface ToolbarProps {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  onRun: () => void;
  onClear: () => void;
  onDownload: () => void;
  onUpload: (file: File) => void;
  autoRun: boolean;
  onToggleAutoRun: () => void;
  onOpenTemplates: () => void;
}

const TABS: { id: EditorTab; label: string; color: string }[] = [
  { id: 'html', label: 'HTML', color: '#ff7849' },
  { id: 'css', label: 'CSS', color: '#2dd4bf' },
  { id: 'js', label: 'JS', color: '#fbbf24' },
];

export default function Toolbar({
  activeTab,
  onTabChange,
  onRun,
  onClear,
  onDownload,
  onUpload,
  autoRun,
  onToggleAutoRun,
  onOpenTemplates,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2a3d] bg-[#14141f] px-4 py-2.5">
      {/* Left: Logo + tabs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff7849] to-[#ff4d6d]">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[#e8e8f0]">Sandbox.js</span>
        </div>

        <div className="flex items-center gap-0.5 rounded-lg bg-[#0d0d14] p-0.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#22222f] text-[#e8e8f0]'
                  : 'text-[#6b6b85] hover:text-[#9999b0]'
              }`}
            >
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ background: tab.color }}
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
        >
          <Sparkles size={14} />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <button
          onClick={onToggleAutoRun}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
            autoRun
              ? 'bg-[rgba(45,212,191,0.12)] text-[#2dd4bf]'
              : 'text-[#9999b0] hover:bg-[#22222f] hover:text-[#e8e8f0]'
          }`}
          title="Toggle auto-run"
        >
          <Zap size={14} className={autoRun ? 'fill-[#2dd4bf]' : ''} />
          <span className="hidden sm:inline">Auto</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.css,.js,.htm"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
          title="Upload HTML file"
        >
          <Upload size={14} />
        </button>

        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
          title="Download as HTML"
        >
          <Download size={14} />
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[#9999b0] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
          title="Clear all"
        >
          <Trash2 size={14} />
        </button>

        <div className="mx-1 h-5 w-px bg-[#2a2a3d]" />

        <button
          onClick={onRun}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ff7849] to-[#ff4d6d] px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#ff7849]/20 transition-all hover:shadow-[#ff7849]/30 hover:brightness-110 active:scale-95"
        >
          <Play size={14} className="fill-white" />
          <span>Run</span>
        </button>
      </div>
    </div>
  );
}
