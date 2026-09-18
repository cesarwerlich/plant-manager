import React from 'react';
import {
  Droplets,
  Flower2,
  Trash2,
  MessageSquareQuote,
  ArrowRight,
  Plus,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { IdentifiedPlant } from '../types';
import { SAMPLE_PLANTS } from '../data/samplePlants';

interface MyGardenProps {
  garden: IdentifiedPlant[];
  onSelectPlant: (plant: IdentifiedPlant) => void;
  onRemovePlant: (plantId: string) => void;
  onWaterPlant: (plantId: string) => void;
  onConsultPlant: (plant: IdentifiedPlant) => void;
  onAddSamplePlants: (samples: IdentifiedPlant[]) => void;
  onGoToIdentify: () => void;
}

export function MyGarden({
  garden,
  onSelectPlant,
  onRemovePlant,
  onWaterPlant,
  onConsultPlant,
  onAddSamplePlants,
  onGoToIdentify,
}: MyGardenProps) {
  const calculateDaysSinceWatered = (lastWateredDate?: string) => {
    if (!lastWateredDate) return null;
    const last = new Date(lastWateredDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - last.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatStatus = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('healthy') || s.includes('saudável') || s.includes('saudavel')) return 'Saudável';
    if (s.includes('attention') || s.includes('atenção') || s.includes('atencao')) return 'Requer Atenção';
    return 'Crítico / Doente';
  };

  return (
    <div id="my-garden-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 font-serif-heading">
            Meu Jardim Botânico
          </h2>
          <p className="text-sm text-stone-600 mt-0.5">
            Acompanhe suas plantas cultivadas, controle intervalos de rega e acesse guias de cuidados rápidos.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToIdentify}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Identificar Nova Planta
        </button>
      </div>

      {garden.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <Flower2 className="w-8 h-8 text-emerald-700" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900 font-serif-heading mb-1">
            Seu Jardim Está Vazio
          </h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Envie uma foto de qualquer folhagem, flor ou vaso para identificar a espécie, receber o diagnóstico de saúde e começar seu controle de regas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGoToIdentify}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
            >
              Identificar Planta por Foto
            </button>
            <button
              type="button"
              onClick={() => onAddSamplePlants(SAMPLE_PLANTS)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium transition-colors cursor-pointer"
            >
              Carregar Plantas de Exemplo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {garden.map((plant) => {
            const daysSince = calculateDaysSinceWatered(plant.lastWatered);
            const statusLabel = formatStatus(plant.healthAssessment.status);
            const isHealthy = statusLabel === 'Saudável';

            return (
              <div
                key={plant.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-500/80 transition-all duration-200 group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 bg-stone-900 overflow-hidden">
                    <img
                      src={plant.imageUrl}
                      alt={plant.commonName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/50 backdrop-blur-xs text-white border border-white/20">
                          {plant.plantType}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Deseja remover ${plant.commonName} do seu jardim?`)) {
                              onRemovePlant(plant.id);
                            }
                          }}
                          title="Remover do jardim"
                          className="p-1.5 rounded-lg bg-black/40 hover:bg-rose-600 text-stone-200 hover:text-white backdrop-blur-xs transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 className="text-white font-bold font-serif-heading text-lg leading-tight truncate">
                          {plant.commonName}
                        </h4>
                        <p className="text-stone-300 italic text-xs truncate">
                          {plant.scientificName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-4 space-y-3">
                    {/* Status badges */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-medium text-stone-700">
                        {isHealthy ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        )}
                        {statusLabel}
                      </span>
                      <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
                        {plant.difficultyLevel}
                      </span>
                    </div>

                    {/* Watering Tracker */}
                    <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-sky-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                        <div>
                          <div className="font-semibold">
                            {daysSince === 0
                              ? 'Regada hoje'
                              : daysSince === 1
                              ? 'Regada ontem'
                              : daysSince !== null
                              ? `Regada há ${daysSince} dias`
                              : 'Nenhuma rega registrada'}
                          </div>
                          <div className="text-[11px] text-sky-700">
                            Frequência: {plant.careInstructions.watering.frequency}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onWaterPlant(plant.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium text-[11px] transition-colors shadow-2xs shrink-0 cursor-pointer"
                      >
                        Regar Agora
                      </button>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {plant.description}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onSelectPlant(plant)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Ver Guia Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onConsultPlant(plant)}
                    title="Consultar Flora sobre esta planta"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <MessageSquareQuote className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
