import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 id="confirm-dialog-title" className="font-semibold text-stone-900">{title}</h3>
            <p className="text-sm text-stone-600 mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-sm font-medium transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium shadow-xs transition-colors cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
