import { Sprout, MessageSquareQuote, Flower2, Sparkles, BookOpen, Crown } from 'lucide-react';

type Tab = 'identify' | 'chat' | 'garden';

const TABS = [
  { id: 'identify', icon: BookOpen, label: 'Identificar & Cuidados', short: 'Identificar' },
  { id: 'chat', icon: MessageSquareQuote, label: 'Chat Botânico', short: 'Chat' },
  { id: 'garden', icon: Flower2, label: 'Meu Jardim', short: 'Jardim' },
] as const;

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  gardenCount: number;
  onOpenSubscriptionModal?: () => void;
}

export function Navbar({ activeTab, setActiveTab, gardenCount, onOpenSubscriptionModal }: NavbarProps) {
  return (
    <>
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
            <nav className="hidden sm:flex items-center gap-2">
              {TABS.map(({ id, icon: Icon, label, short }) => (
                <button
                  key={id}
                  id={`tab-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                  <span className="md:hidden">{short}</span>
                  {id === 'garden' && gardenCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950">
                      {gardenCount}
                    </span>
                  )}
                </button>
              ))}
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

    <nav
      id="app-bottom-tabs"
      className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 pb-safe"
    >
      <div className="flex">
        {TABS.map(({ id, icon: Icon, short }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            aria-current={activeTab === id ? 'page' : undefined}
            className={`relative flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
              activeTab === id ? 'text-emerald-400' : 'text-stone-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{short}</span>
            {id === 'garden' && gardenCount > 0 && (
              <span className="absolute top-1 left-1/2 ml-1.5 px-1.5 rounded-full text-[10px] font-semibold bg-emerald-400 text-emerald-950">
                {gardenCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
    </>
  );
}
