import {
  Droplets,
  Sun,
  Layers,
  Thermometer,
  Zap,
  Scissors,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageSquareQuote,
  BookmarkPlus,
  Check,
  Info,
  HeartHandshake
} from 'lucide-react';
import { IdentifiedPlant } from '../types';

interface PlantCareViewProps {
  plant: IdentifiedPlant;
  onAskChatbot: (initialPrompt?: string) => void;
  onSaveToGarden: (plant: IdentifiedPlant) => void;
  isSavedInGarden: boolean;
  onWaterPlant: (plantId: string) => void;
}

export function PlantCareView({
  plant,
  onAskChatbot,
  onSaveToGarden,
  isSavedInGarden,
  onWaterPlant,
}: PlantCareViewProps) {
  const { careInstructions, healthAssessment } = plant;

  // Formatting difficulty badge color
  const getDifficultyColor = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes('beginner') || l.includes('fácil') || l.includes('facil') || l.includes('iniciante')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    if (l.includes('moderate') || l.includes('moderado')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  // Health status badge
  const getHealthBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('healthy') || s.includes('saudável') || s.includes('saudavel')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Espécime Saudável
        </span>
      );
    }
    if (s.includes('attention') || s.includes('atenção') || s.includes('atencao')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          Requer Atenção
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
        Crítico / Doente
      </span>
    );
  };

  return (
    <div id="plant-care-detail-view" className="space-y-6">
      {/* Specimen Header & Overview Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Plant Image Showcase */}
          <div className="lg:w-2/5 relative bg-stone-900 min-h-[300px] lg:min-h-[420px] max-h-[480px]">
            <img
              src={plant.imageUrl}
              alt={plant.commonName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md border border-white/30">
                  {plant.plantType || 'Planta Ornamental'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/80 backdrop-blur-md text-white">
                  {plant.confidenceScore}% Correspondência
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading leading-tight">
                {plant.commonName}
              </h1>
              <p className="text-sm text-stone-200 italic font-medium mt-0.5">
                {plant.scientificName} • {plant.family}
              </p>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="lg:w-3/5 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(plant.difficultyLevel)}`}>
                    {plant.difficultyLevel}
                  </span>
                  {getHealthBadge(healthAssessment.status)}
                </div>
                <div className="text-xs text-stone-400">
                  Identificada em {new Date(plant.identifiedAt).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4">
                {plant.description}
              </p>

              {/* Native Habitat Info */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 mb-4 text-xs sm:text-sm text-stone-600">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Origem &amp; Bioma Natural: </strong>
                  {plant.nativeHabitat}
                </div>
              </div>

              {/* Health Diagnostics if present */}
              {healthAssessment.diagnoses && healthAssessment.diagnoses.length > 0 && (
                <div className="mb-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    Diagnóstico Visual &amp; Cuidados Preventivos
                  </div>
                  <div className="space-y-2">
                    {healthAssessment.diagnoses.map((diag, i) => (
                      <div key={i} className="text-xs text-amber-950">
                        <span className="font-semibold">• {diag.issue}</span> ({diag.severity}):{' '}
                        <span className="text-stone-700">{diag.suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => onSaveToGarden(plant)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isSavedInGarden
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                }`}
              >
                {isSavedInGarden ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    Salva no Meu Jardim
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4" />
                    Salvar no Meu Jardim
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onWaterPlant(plant.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-sm font-medium transition-colors cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-sky-600" />
                {plant.lastWatered ? `Regada em ${plant.lastWatered}` : 'Registrar Rega Hoje'}
              </button>

              <button
                type="button"
                onClick={() => onAskChatbot(`Olá Flora! Acabei de identificar minha ${plant.commonName}. Pode me dar um plano de cuidados sob medida?`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquareQuote className="w-4 h-4" />
                Consultar Flora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Care Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Watering Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Frequência de Rega</h3>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md inline-block">
            {careInstructions.watering.frequency}
          </div>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            {careInstructions.watering.summary}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            {careInstructions.watering.details}
          </p>
          <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
            <div className="text-stone-600">
              <strong className="text-amber-800">Sinais de sede: </strong>
              {careInstructions.watering.signsOfUnderWatering}
            </div>
            <div className="text-stone-600">
              <strong className="text-rose-800">Sinais de excesso: </strong>
              {careInstructions.watering.signsOfOverWatering}
            </div>
          </div>
        </div>

        {/* Sunlight Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Iluminação &amp; Exposição</h3>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
            {careInstructions.light.requirement}
          </div>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            {careInstructions.light.summary}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            {careInstructions.light.details}
          </p>
          <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
            <strong className="text-stone-800">Tolerância ao sol direto: </strong>
            {careInstructions.light.directSunTolerance}
          </div>
        </div>

        {/* Soil & Potting Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Substrato &amp; Replantio</h3>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed">
            <strong className="text-stone-900 block mb-1">Mistura de Solo Recomendada:</strong>
            {careInstructions.soilAndPotting.mixType}
          </div>
          <div className="text-xs text-stone-600 leading-relaxed">
            <strong className="text-stone-800">Necessidade de Drenagem: </strong>
            {careInstructions.soilAndPotting.drainageNeeds}
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
            <strong className="text-stone-800">Período de Replantio: </strong>
            {careInstructions.soilAndPotting.repottingSchedule}
          </div>
        </div>

        {/* Temperature & Humidity Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Thermometer className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Temperatura &amp; Umidade</h3>
          </div>
          <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50 border border-stone-100">
            <span className="text-stone-600">Faixa Ideal:</span>
            <span className="font-bold text-stone-900">{careInstructions.temperatureAndHumidity.tempRange}</span>
          </div>
          <p className="text-xs text-stone-600">
            <strong className="text-stone-800">Umidade do Ar: </strong>
            {careInstructions.temperatureAndHumidity.humidityNeeds}
          </p>
          <p className="text-xs text-stone-500">
            <strong className="text-stone-800">Resistência ao Frio: </strong>
            {careInstructions.temperatureAndHumidity.coldTolerance}
          </p>
          <div className="pt-2 border-t border-stone-100 text-xs text-teal-900 bg-teal-50/50 p-2 rounded-lg">
            💡 {careInstructions.temperatureAndHumidity.humidityTips}
          </div>
        </div>

        {/* Fertilizing Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Adubação &amp; Nutrição</h3>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md inline-block">
            {careInstructions.fertilizing.schedule}
          </div>
          <p className="text-xs sm:text-sm text-stone-700">
            {careInstructions.fertilizing.fertilizerType}
          </p>
          <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
            <strong className="text-stone-800">Cuidados de Outono/Inverno: </strong>
            {careInstructions.fertilizing.winterCare}
          </div>
        </div>

        {/* Pruning & Propagation Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lime-100 text-lime-800 flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-stone-900 font-serif-heading">Poda &amp; Propagação</h3>
          </div>
          <div className="space-y-1 text-xs text-stone-600">
            {careInstructions.pruningAndMaintenance.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs text-stone-700">
            <strong className="text-stone-900 block mb-0.5">Como Propagar Mudas:</strong>
            {careInstructions.pruningAndMaintenance.propagationMethod}
          </div>
        </div>
      </div>

      {/* Safety & Seasonal Schedule Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Toxicity & Pet Safety */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-stone-900">Segurança para Pets &amp; Família</h4>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                careInstructions.toxicity.toxicToPets
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {careInstructions.toxicity.toxicToPets ? '⚠️ Tóxica para Pets' : '✅ Pet Friendly'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {careInstructions.toxicity.petDetails}
          </p>

          <div className="text-xs text-stone-500 pt-2 border-t border-stone-100">
            <strong>Segurança para crianças/humanos: </strong>
            {careInstructions.toxicity.toxicToHumans
              ? 'Mantenha fora do alcance de crianças pequenas; a seiva ou folhagem pode causar irritação na pele ou desconforto gástrico se ingerida.'
              : 'Espécie segura ao toque e manuseio habitual.'}
          </div>
        </div>

        {/* Seasonal Care Calendar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-stone-900">Calendário Sazonal de Cultivo</h4>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <span className="font-semibold text-amber-900 block mb-0.5">🌱 Primavera &amp; Verão (Crescimento Ativo):</span>
              <span className="text-stone-700">{careInstructions.seasonalCalendar.springSummer}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-100/70 border border-stone-200">
              <span className="font-semibold text-stone-800 block mb-0.5">🍂 Outono &amp; Inverno (Dormência &amp; Descanso):</span>
              <span className="text-stone-600">{careInstructions.seasonalCalendar.fallWinter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Botanical Trivia */}
      {plant.funFacts && plant.funFacts.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 rounded-2xl border border-emerald-200/80 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-semibold text-sm sm:text-base uppercase tracking-wide">
              Curiosidades &amp; História Natural
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-700">
            {plant.funFacts.map((fact, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                "{fact}"
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Follow-up Inquiries (One-click chat launcher) */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold font-serif-heading flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-emerald-400" />
              Pergunte à Flora: Consultoria Botânica
            </h3>
            <p className="text-xs text-stone-400">
              Toque em qualquer pergunta abaixo para consultar Flora, sua assistente botânica especialista, sobre sua {plant.commonName}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onAskChatbot(`Como saber se minha ${plant.commonName} está recebendo a quantidade certa de luz em casa?`)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 hover:border-emerald-500 transition-all text-left cursor-pointer"
          >
            ☀️ Avaliar luminosidade ideal no ambiente
          </button>
          <button
            type="button"
            onClick={() => onAskChatbot(`Pode me dar um passo a passo detalhado de como tirar mudas e propagar minha ${plant.commonName}?`)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 hover:border-emerald-500 transition-all text-left cursor-pointer"
          >
            ✂️ Passo a passo de propagação
          </button>
          <button
            type="button"
            onClick={() => onAskChatbot(`Quais são as principais pragas que atacam a ${plant.commonName} e como prevenir de forma 100% orgânica?`)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 hover:border-emerald-500 transition-all text-left cursor-pointer"
          >
            🐛 Prevenção orgânica de pragas e cochonilhas
          </button>
          <button
            type="button"
            onClick={() => onAskChatbot(`O que fazer se as folhas da minha ${plant.commonName} começarem a amarelar ou ficar marrons?`)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 hover:border-emerald-500 transition-all text-left cursor-pointer"
          >
            🍂 Diagnóstico de folhas amarelas ou secas
          </button>
        </div>
      </div>
    </div>
  );
}
