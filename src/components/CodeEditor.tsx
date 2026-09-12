import { useRef, useEffect, useCallback } from 'react';
import type { EditorTab } from '@/types';

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  tab: EditorTab;
}

const TAB_CONFIG: Record<EditorTab, { label: string; lang: string; color: string }> = {
  html: { label: 'HTML', lang: 'html', color: '#ff7849' },
  css: { label: 'CSS', lang: 'css', color: '#2dd4bf' },
  js: { label: 'JS', lang: 'javascript', color: '#fbbf24' },
};

export default function CodeEditor({ value, onChange, tab }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const config = TAB_CONFIG[tab];

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  useEffect(() => {
    syncScroll();
  }, [value, syncScroll]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#14141f]">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-[#2a2a3d] px-4 py-2">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: config.color }}
          />
          <span className="text-xs font-medium uppercase tracking-wider text-[#9999b0]">
            {config.label}
          </span>
        </div>
        <span className="text-[10px] text-[#6b6b85] font-mono">
          {value.length} chars · {lineCount} lines
        </span>
      </div>

      {/* Editor body */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="code-scroll select-none overflow-hidden py-3 text-right font-mono text-xs leading-[1.6] text-[#444458]"
          style={{ width: '48px', minWidth: '48px' }}
        >
          {lineNumbers.map((n) => (
            <div key={n} className="px-2">
              {n}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="code-scroll flex-1 resize-none overflow-auto py-3 px-3 font-mono text-sm leading-[1.6] text-[#e8e8f0] placeholder:text-[#444458]"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            whiteSpace: 'pre',
            tabSize: 2,
          }}
          placeholder={`Enter your ${config.label} code here...`}
        />
      </div>
    </div>
  );
}
