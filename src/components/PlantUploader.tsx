import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { IdentifiedPlant } from '../types';
import { SAMPLE_PLANTS } from '../data/samplePlants';

interface PlantUploaderProps {
  onPlantIdentified: (plant: IdentifiedPlant) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (err: string | null) => void;
}

export function PlantUploader({
  onPlantIdentified,
  isLoading,
  setIsLoading,
  error,
  setError,
}: PlantUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [userNote, setUserNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor, envie um arquivo de imagem válido (JPEG, PNG, WEBP).');
      return;
    }

    setError(null);
    setSelectedMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.onerror = () => {
      setError('Falha ao processar a imagem selecionada.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) {
      setError('Por favor, selecione ou tire uma foto da planta primeiro.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/identify-plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: selectedMimeType,
          userPrompt: userNote.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Falha na identificação (status ${res.status})`);
      }

      const identifiedData = await res.json();
      const completePlant: IdentifiedPlant = {
        id: 'plant-' + Date.now(),
        identifiedAt: new Date().toISOString(),
        imageUrl: selectedImage,
        ...identifiedData,
        userNotes: userNote.trim() || undefined,
        lastWatered: new Date().toISOString().split('T')[0],
      };

      onPlantIdentified(completePlant);
    } catch (err: any) {
      console.error('Identification error:', err);
      setError(err?.message || 'Não foi possível identificar a planta. Verifique a imagem e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSample = (sample: IdentifiedPlant) => {
    setError(null);
    onPlantIdentified(sample);
  };

  return (
    <div id="plant-uploader-section" className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 font-serif-heading">
            Identificação de Plantas por Foto
          </h2>
          <p className="text-sm text-stone-600 mt-0.5">
            Envie uma foto nítida de qualquer folha, flor ou vaso para obter diagnóstico de saúde instantâneo e guia completo de cultivo.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Identificação Botânica IA
        </div>
      </div>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Aviso de Identificação: </span>
            {error}
          </div>
        </div>
      )}

      {/* Upload Dropzone */}
      <div
        id="dropzone-container"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 p-6 sm:p-8 text-center flex flex-col items-center justify-center ${
          dragActive
            ? 'border-emerald-600 bg-emerald-50/60'
            : selectedImage
            ? 'border-stone-300 bg-stone-50/50'
            : 'border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/20 bg-stone-50/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/heic"
          className="hidden"
          onChange={handleChange}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleChange}
        />

        {selectedImage ? (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden shadow-md border-2 border-white mb-4 bg-stone-900">
              <img
                src={selectedImage}
                alt="Espécime selecionado"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-sm transition-colors cursor-pointer"
              >
                Trocar Foto
              </button>
            </div>
            <p className="text-xs text-stone-500 mb-2">Imagem do espécime carregada e pronta para análise botânica</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3 shadow-inner">
              <UploadCloud className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 mb-1">
              Arraste e solte a foto da sua planta aqui
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mb-4">
              Suporta JPG, PNG e WEBP. Fotos bem iluminadas e nítidas de folhas ou flores garantem máxima precisão na identificação.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="btn-select-file"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                Escolher Arquivo
              </button>
              <button
                id="btn-open-camera"
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-sm font-medium transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-emerald-700" />
                Tirar Foto
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Note & Analysis Action */}
      {selectedImage && (
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="user-note-input" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Dúvida Específica ou Sintomas Observados (Opcional)
            </label>
            <input
              id="user-note-input"
              type="text"
              placeholder="Ex.: 'Pontas das folhas amareladas', 'Fica perto de janela com sol da tarde', 'Estas manchas são fungos?'"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-stone-800 placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              id="btn-clear-selection"
              type="button"
              onClick={() => {
                setSelectedImage(null);
                setUserNote('');
              }}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-sm font-medium transition-colors cursor-pointer"
            >
              Limpar
            </button>
            <button
              id="btn-analyze-plant"
              type="button"
              onClick={handleIdentify}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm shadow-md shadow-emerald-900/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Identificando Espécime com Inteligência Botânica...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Identificar &amp; Gerar Guia de Cultivo</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Quick Curated Samples for Immediate Testing */}
      <div className="mt-7 pt-6 border-t border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Ou Teste Imediatamente Com Plantas de Exemplo:
          </span>
          <span className="text-xs text-stone-400">Clique para abrir o guia</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PLANTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => loadSample(sample)}
              className="group flex items-center gap-3 p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 cursor-pointer transition-all duration-150"
            >
              <img
                src={sample.imageUrl}
                alt={sample.commonName}
                className="w-12 h-12 rounded-lg object-cover shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-stone-900 truncate group-hover:text-emerald-800">
                  {sample.commonName}
                </div>
                <div className="text-[11px] text-stone-500 italic truncate">
                  {sample.scientificName}
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-stone-300 group-hover:text-emerald-600 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
