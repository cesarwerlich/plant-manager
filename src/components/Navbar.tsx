import { Sprout, MessageSquareQuote, Flower2, Sparkles, BookOpen, Crown } from 'lucide-react';

interface NavbarProps {
  activeTab: 'identify' | 'chat' | 'garden';
  setActiveTab: (tab: 'identify' | 'chat' | 'garden') => void;
  gardenCount: number;
  onOpenSubscriptionModal?: () => void;
}

export function Navbar({ activeTab, setActiveTab, gardenCount, onOpenSubscriptionModal }: NavbarProps) {
  return (
    <header id="app-navbar" className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-sm pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('identify')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg sm:text-xl tracking-tight text-white font-serif-heading">
                  FloraGuia
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  IA Botânica Especializada
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">Identificador de Plantas &amp; Guia Completo de Cultivo</p>
            </div>
          </div>

          {/* Nav Tabs & iOS Premium Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                id="tab-identify"
                onClick={() => setActiveTab('identify')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'identify'
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Identificar &amp; Cuidados</span>
                <span className="md:hidden">Identificar</span>
              </button>

              <button
                id="tab-chat"
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span className="hidden md:inline">Chat Botânico</span>
                <span className="md:hidden">Chat</span>
              </button>

              <button
                id="tab-garden"
                onClick={() => setActiveTab('garden')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'garden'
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Flower2 className="w-4 h-4" />
                <span className="hidden md:inline">Meu Jardim</span>
                <span className="md:hidden">Jardim</span>
                {gardenCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950">
                    {gardenCount}
                  </span>
                )}
              </button>
            </nav>

            {/* iOS Store Premium / Assinatura Modal Button */}
            {onOpenSubscriptionModal && (
              <button
                type="button"
                onClick={onOpenSubscriptionModal}
                title="Plano Premium / Assinatura App Store"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 transition-all shadow-sm shadow-amber-950/40 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Assinatura iOS</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
