/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PlantUploader } from './components/PlantUploader';
import { PlantCareView } from './components/PlantCareView';
import { GardeningChatbot } from './components/GardeningChatbot';
import { MyGarden } from './components/MyGarden';
import { IosSubscriptionModal } from './components/IosSubscriptionModal';
import { IdentifiedPlant, ChatMessage } from './types';
import { SAMPLE_PLANTS } from './data/samplePlants';
import { CheckCircle, ArrowLeft, Smartphone, Crown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'identify' | 'chat' | 'garden'>('identify');
  const [currentPlant, setCurrentPlant] = useState<IdentifiedPlant | null>(SAMPLE_PLANTS[0]);
  const [activeChatPlant, setActiveChatPlant] = useState<IdentifiedPlant | null>(SAMPLE_PLANTS[0]);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isIosModalOpen, setIsIosModalOpen] = useState<boolean>(false);

  // Persistent garden collection
  const [garden, setGarden] = useState<IdentifiedPlant[]>(() => {
    try {
      const saved = localStorage.getItem('flora_garden');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse garden storage:', e);
    }
    // Default initial collection with our first sample
    return [SAMPLE_PLANTS[0]];
  });

  // Persistent chat history
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('flora_chat');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse chat storage:', e);
    }
    return [
      {
        id: 'welcome-bot-msg',
        role: 'model',
        content: `👋 **Olá, jardineiro(a)!** Sou a Flora, sua especialista em botânica e companheira de jardinagem.\n\nSeja para diagnosticar folhas amareladas, ajustar a rotina de rega, preparar substratos ideais ou propagar mudas, estou aqui para orientar você. Você também pode enviar a foto de qualquer planta na aba **Identificar & Cuidados** para identificação botânica instantânea com inteligência artificial!`,
        timestamp: new Date().toISOString(),
        modelUsed: 'Assistente Flora',
      },
    ];
  });

  // Save garden to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flora_garden', JSON.stringify(garden));
    } catch (e) {
      console.error('Failed to save garden to localStorage:', e);
    }
  }, [garden]);

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flora_chat', JSON.stringify(chatMessages));
    } catch (e) {
      console.error('Failed to save chat to localStorage:', e);
    }
  }, [chatMessages]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handlePlantIdentified = (plant: IdentifiedPlant) => {
    setCurrentPlant(plant);
    setActiveChatPlant(plant);
    showToast(`Identificada: "${plant.commonName}"!`);
  };

  const handleSaveToGarden = (plant: IdentifiedPlant) => {
    setGarden((prev) => {
      const exists = prev.some((p) => p.id === plant.id || (p.scientificName === plant.scientificName && p.commonName === plant.commonName));
      if (exists) {
        showToast(`"${plant.commonName}" já está no seu jardim.`);
        return prev;
      }
      showToast(`"${plant.commonName}" salva no Meu Jardim!`);
      return [plant, ...prev];
    });
  };

  const handleRemoveFromGarden = (plantId: string) => {
    setGarden((prev) => prev.filter((p) => p.id !== plantId));
    showToast('Planta removida do jardim.');
  };

  const handleWaterPlant = (plantId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setGarden((prev) =>
      prev.map((p) => (p.id === plantId ? { ...p, lastWatered: today } : p))
    );
    if (currentPlant && currentPlant.id === plantId) {
      setCurrentPlant({ ...currentPlant, lastWatered: today });
    }
    showToast('Data de rega atualizada para hoje! 💧');
  };

  const handleAskChatbot = (prompt?: string) => {
    if (currentPlant) {
      setActiveChatPlant(currentPlant);
    }
    if (prompt) {
      setChatInitialPrompt(prompt);
    }
    setActiveTab('chat');
  };

  const handleConsultFromGarden = (plant: IdentifiedPlant) => {
    setActiveChatPlant(plant);
    setActiveTab('chat');
  };

  const handleSelectFromGarden = (plant: IdentifiedPlant) => {
    setCurrentPlant(plant);
    setActiveChatPlant(plant);
    setActiveTab('identify');
  };

  const handleAddSamplePlants = (samples: IdentifiedPlant[]) => {
    setGarden(samples);
    showToast('3 plantas de exemplo carregadas no seu jardim.');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gardenCount={garden.length}
        onOpenSubscriptionModal={() => setIsIosModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* iOS Store / PWA Banner */}
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-stone-900 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base flex items-center gap-2">
                <span>Versão iOS &amp; Publicação na App Store</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Dúvidas Frequentes
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Saiba tudo sobre taxa da conta Apple (US$ 99/ano), assinaturas no app (StoreKit) e PWA gratuito no iPhone.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsIosModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs self-start sm:self-auto transition-colors cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Ver Guia &amp; Assinatura iOS</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium shadow-xl border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Identify & Care */}
        {activeTab === 'identify' && (
          <div className="space-y-8">
            <PlantUploader
              onPlantIdentified={handlePlantIdentified}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />

            {currentPlant && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Espécime Analisado &amp; Guia de Cultivo
                  </span>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                    Enviar Outra Foto
                  </button>
                </div>

                <PlantCareView
                  plant={currentPlant}
                  onAskChatbot={handleAskChatbot}
                  onSaveToGarden={handleSaveToGarden}
                  isSavedInGarden={garden.some(
                    (p) => p.id === currentPlant.id || p.scientificName === currentPlant.scientificName
                  )}
                  onWaterPlant={handleWaterPlant}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Botanist Chat */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <GardeningChatbot
              messages={chatMessages}
              setMessages={setChatMessages}
              activePlant={activeChatPlant}
              setActivePlant={setActiveChatPlant}
              initialPrompt={chatInitialPrompt}
              onClearInitialPrompt={() => setChatInitialPrompt('')}
            />
          </div>
        )}

        {/* Tab 3: My Garden */}
        {activeTab === 'garden' && (
          <MyGarden
            garden={garden}
            onSelectPlant={handleSelectFromGarden}
            onRemovePlant={handleRemoveFromGarden}
            onWaterPlant={handleWaterPlant}
            onConsultPlant={handleConsultFromGarden}
            onAddSamplePlants={handleAddSamplePlants}
            onGoToIdentify={() => setActiveTab('identify')}
          />
        )}
      </main>

      {/* iOS Subscription & Store Guide Modal */}
      <IosSubscriptionModal
        isOpen={isIosModalOpen}
        onClose={() => setIsIosModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200/90 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">FloraGuia</span>
            <span>•</span>
            <span>Inteligência Artificial Botânica Especializada</span>
          </div>
          <div>Cultivo Botânico Certificado &amp; Diagnóstico de Plantas</div>
        </div>
      </footer>
    </div>
  );
}
