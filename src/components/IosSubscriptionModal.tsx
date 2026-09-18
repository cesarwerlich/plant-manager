import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  Shield,
  Smartphone,
  Info,
  Apple,
  Zap,
  Leaf
} from 'lucide-react';

interface IosSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IosSubscriptionModal({ isOpen, onClose }: IosSubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [activeTab, setActiveTab] = useState<'paywall' | 'storeGuide'>('paywall');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-stone-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base font-serif-heading">
                Ecossistema iOS &amp; App Store
              </h3>
              <p className="text-xs text-stone-400">
                Diretrizes de publicação e simulação de assinatura StoreKit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Paywall Preview vs Dúvidas da App Store */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('paywall')}
            className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer ${
              activeTab === 'paywall'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📱 Tela de Assinatura iOS (Paywall)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('storeGuide')}
            className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer ${
              activeTab === 'storeGuide'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🍎 Como Publicar na Apple Store
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-5">
          {activeTab === 'paywall' ? (
            <div className="space-y-5">
              {/* Paywall Banner */}
              <div className="text-center space-y-1.5 py-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  FloraGuia Premium iOS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900">
                  Cuide do seu jardim como um botânico profissional
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  Acesso ilimitado à inteligência botânica, diagnósticos profundos de pragas e lembretes automáticos no iPhone.
                </p>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">Identificações fotográficas ilimitadas por IA</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">Diagnóstico aprofundado de doenças e pragas</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">Notificações de rega no iOS e widgets de tela</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">Chat botânico ilimitado 24/7 com a Flora</span>
                </div>
              </div>

              {/* Subscription Options (Apple StoreKit pattern) */}
              <div className="space-y-3">
                <div
                  onClick={() => setSelectedPlan('yearly')}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'yearly'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                    Mais Popular • Economize 50%
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm sm:text-base">Plano Anual</div>
                    <div className="text-xs text-stone-500">3 dias grátis, depois R$ 89,90/ano (apenas R$ 7,49/mês)</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-800">R$ 89,90</span>
                    <span className="text-xs text-stone-500 block">/ano</span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'monthly'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-stone-900 text-sm sm:text-base">Plano Mensal</div>
                    <div className="text-xs text-stone-500">Cobrança mês a mês, cancele a qualquer momento</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-stone-800">R$ 14,90</span>
                    <span className="text-xs text-stone-500 block">/mês</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => {
                  alert('Demonstração StoreKit: Em produção no iOS, este botão aciona o Apple In-App Purchase nativo com Touch ID / Face ID.');
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Iniciar Teste Grátis de 3 Dias</span>
              </button>

              <div className="text-center space-y-1 text-[11px] text-stone-400">
                <p>Renovação automática via conta Apple ID. Cancele até 24h antes do término sem cobrança.</p>
                <div className="flex items-center justify-center gap-3 underline text-stone-500">
                  <a href="#termos" onClick={(e) => e.preventDefault()}>Termos de Uso</a>
                  <span>•</span>
                  <a href="#privacidade" onClick={(e) => e.preventDefault()}>Política de Privacidade</a>
                  <span>•</span>
                  <a href="#restaurar" onClick={(e) => { e.preventDefault(); alert('Compras restauradas.'); }}>Restaurar Compras</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              {/* Apple Store Clarification */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Preciso de assinatura para publicar na App Store?</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Sim e Não, dependendo do que você quer dizer com "sub":</strong>
                </p>
              </div>

              {/* Point 1 */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Apple className="w-4 h-4 text-stone-900" />
                  <span>1. Conta Apple Developer (Obrigatória para você, o criador)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Para colocar qualquer app na Apple App Store pública, você precisa de uma assinatura do <strong>Apple Developer Program</strong>, que custa <strong>US$ 99 por ano</strong> (aproximadamente R$ 550/ano). Sem ela, a Apple não permite publicar no App Store Connect.
                </p>
              </div>

              {/* Point 2 */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>2. Assinatura Cobrada do Usuário (In-App Purchase / StoreKit)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Se o seu aplicativo for <strong>100% gratuito</strong> para o usuário final, você <strong>NÃO</strong> precisa criar cobrança de assinatura no app. Mas se quiser monetizar (como fazem apps tipo PictureThis e Planta cobrando semanal ou anualmente), a Apple <strong>exige obrigatoriamente</strong> o uso do <strong>Apple In-App Purchase (StoreKit)</strong>, e a Apple retém de 15% a 30% da receita.
                </p>
              </div>

              {/* Point 3 */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Smartphone className="w-4 h-4 text-sky-700" />
                  <span>3. Como transformar este app em app nativo iOS:</span>
                </div>
                <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                  <li><strong>Como PWA (Grátis, sem loja):</strong> O usuário pode abrir este app no Safari do iPhone e tocar em "Compartilhar &gt; Adicionar à Tela de Início". Ele roda em tela cheia como app nativo!</li>
                  <li><strong>Empacotamento com Capacitor:</strong> Podemos adicionar o Capacitor iOS para gerar o projeto Xcode com 1 comando, pronto para compilar e subir no App Store Connect.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>FloraGuia • Otimizado para iOS &amp; Web</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
