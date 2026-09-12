import { FileCode, CreditCard, Clock, Sparkles, X } from 'lucide-react';
import type { Template } from '@/types';
import { TEMPLATES } from '@/types';

const ICONS: Record<string, typeof FileCode> = {
  FileCode,
  CreditCard,
  Clock,
  Sparkles,
};

interface TemplateModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export default function TemplateModal({ open, onClose, onSelect }: TemplateModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[#2a2a3d] bg-[#14141f] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#e8e8f0]">Choose a Template</h2>
            <p className="mt-0.5 text-sm text-[#6b6b85]">Start with a pre-built example</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#6b6b85] transition-colors hover:bg-[#22222f] hover:text-[#e8e8f0]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TEMPLATES.map((tpl) => {
            const Icon = ICONS[tpl.icon] ?? FileCode;
            return (
              <button
                key={tpl.id}
                onClick={() => {
                  onSelect(tpl);
                  onClose();
                }}
                className="group flex items-start gap-3 rounded-xl border border-[#2a2a3d] bg-[#1c1c2b] p-4 text-left transition-all hover:border-[#ff7849]/40 hover:bg-[#22222f]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0d0d14] text-[#ff7849] transition-colors group-hover:bg-[#ff7849]/10">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#e8e8f0]">{tpl.name}</h3>
                  <p className="mt-0.5 text-xs text-[#6b6b85]">{tpl.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
