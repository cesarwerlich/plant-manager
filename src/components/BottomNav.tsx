import { BookOpen, MessageSquareQuote, Flower2 } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'identify' | 'chat' | 'garden';
  setActiveTab: (tab: 'identify' | 'chat' | 'garden') => void;
  gardenCount: number;
}

export function BottomNav({ activeTab, setActiveTab, gardenCount }: BottomNavProps) {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegação inferior móvel"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-stone-300 pb-safe shadow-lg"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {/* Identificar Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('identify')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'identify'
              ? 'text-emerald-400 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              activeTab === 'identify' ? 'bg-emerald-950/80 text-emerald-400' : ''
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Identificar</span>
        </button>

        {/* Chat Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'chat'
              ? 'text-emerald-400 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              activeTab === 'chat' ? 'bg-emerald-950/80 text-emerald-400' : ''
            }`}
          >
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Chat Flora</span>
        </button>

        {/* Jardim Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('garden')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'garden'
              ? 'text-emerald-400 font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors relative ${
              activeTab === 'garden' ? 'bg-emerald-950/80 text-emerald-400' : ''
            }`}
          >
            <Flower2 className="w-5 h-5" />
            {gardenCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-400 text-stone-950 ring-1 ring-stone-900">
                {gardenCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Meu Jardim</span>
        </button>
      </div>
    </nav>
  );
}
