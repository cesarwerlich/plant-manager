import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Leaf,
  Zap,
  Microscope
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage, IdentifiedPlant, TaskMode } from '../types';

interface GardeningChatbotProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activePlant: IdentifiedPlant | null;
  setActivePlant: (plant: IdentifiedPlant | null) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export function GardeningChatbot({
  messages,
  setMessages,
  activePlant,
  setActivePlant,
  initialPrompt,
  onClearInitialPrompt,
}: GardeningChatbotProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskMode, setTaskMode] = useState<TaskMode>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initial prompt from parent view (e.g., from PlantCareView suggestion click)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = 'user-' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...messages, newUserMessage];
    setMessages(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      let currentTaskType: TaskMode = taskMode;
      const lower = textToSend.toLowerCase();
      if (
        taskMode === 'general' &&
        (lower.includes('diagnos') ||
          lower.includes('doenç') ||
          lower.includes('doenc') ||
          lower.includes('fung') ||
          lower.includes('podr') ||
          lower.includes('raiz') ||
          lower.includes('praga') ||
          lower.includes('morren') ||
          lower.includes('salvar'))
      ) {
        currentTaskType = 'complex';
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          plantContext: activePlant
            ? {
                commonName: activePlant.commonName,
                scientificName: activePlant.scientificName,
                family: activePlant.family,
                healthAssessment: activePlant.healthAssessment,
                careInstructions: activePlant.careInstructions,
              }
            : null,
          taskType: currentTaskType,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Servidor respondeu com status ${res.status}`);
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: data.content,
        timestamp: data.timestamp || new Date().toISOString(),
        modelUsed: data.modelUsed || (currentTaskType === 'complex' ? 'Diagnóstico Aprofundado' : currentTaskType === 'fast' ? 'Dica Rápida' : 'Consulta Botânica'),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        content: `⚠️ **Erro de Comunicação:** Não foi possível obter resposta no momento (${err.message}). Por favor, tente reenviar sua pergunta.`,
        timestamp: new Date().toISOString(),
        modelUsed: 'Assistente Flora',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (confirm('Tem certeza de que deseja limpar todo o histórico desta conversa com a Flora?')) {
      setMessages([]);
    }
  };

  const sampleQuestions = [
    'Como salvar uma planta que está com as folhas amareladas e moles?',
    'Qual é a melhor maneira de preparar substrato aerado para folhagens tropicais?',
    'Como combater cochonilhas e pulgões com receitas caseiras naturais?',
    'Quais plantas ornamentais de interior exigem menos luz e pouca rega?',
  ];

  return (
    <div id="gardening-chatbot-container" className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[740px] max-h-[85vh] overflow-hidden">
      {/* Chat Header */}
      <div className="px-5 py-4 bg-stone-900 text-white border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base sm:text-lg font-serif-heading">
                Flora: Assistente Botânica Especialista
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                Online
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Diagnósticos botânicos, ciência do cultivo e soluções orgânicas
            </p>
          </div>
        </div>

        {/* Task Mode Selector */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="flex items-center bg-stone-800 rounded-xl p-1 border border-stone-700 text-xs">
            <button
              type="button"
              onClick={() => setTaskMode('complex')}
              title="Modo Avançado: Análise aprofundada de sintomas, substrato e patologias"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                taskMode === 'complex'
                  ? 'bg-emerald-600 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Diagnóstico Aprofundado</span>
              <span className="md:hidden">Avançado</span>
            </button>

            <button
              type="button"
              onClick={() => setTaskMode('general')}
              title="Modo Geral: Orientações completas de cultivo, luz e rotina de rega"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                taskMode === 'general'
                  ? 'bg-emerald-600 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cuidados Gerais</span>
              <span className="md:hidden">Geral</span>
            </button>

            <button
              type="button"
              onClick={() => setTaskMode('fast')}
              title="Modo Rápido: Respostas práticas e resumidas"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                taskMode === 'fast'
                  ? 'bg-emerald-600 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dicas Rápidas</span>
              <span className="md:hidden">Rápido</span>
            </button>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClearChat}
              title="Limpar conversa"
              className="p-2 rounded-xl text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Specimen Context Bar */}
      {activePlant && (
        <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-2 text-xs text-emerald-900 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold shrink-0">Planta em análise no momento:</span>
            <span className="truncate">
              <strong>{activePlant.commonName}</strong> ({activePlant.scientificName})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActivePlant(null)}
            className="text-emerald-700 hover:text-emerald-900 underline text-[11px] shrink-0 font-medium cursor-pointer"
          >
            Remover contexto
          </button>
        </div>
      )}

      {/* Message Thread (Scrollable) */}
      <div
        id="chat-message-thread"
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/60"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Leaf className="w-7 h-7 text-emerald-700" />
            </div>
            <h4 className="text-lg font-semibold text-stone-900 font-serif-heading mb-1">
              Tire Qualquer Dúvida Botânica com a Flora
            </h4>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              Dúvidas sobre folhas amareladas, replantio, controle de pragas ou frequência de rega? Flora oferece conselhos botânicos cientificamente embasados.
            </p>

            <div className="w-full space-y-2 text-left">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Sugestões de perguntas para começar:
              </span>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs text-stone-700 font-medium transition-all shadow-xs flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate mr-2">{q}</span>
                  <Sparkles className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-sm shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                }`}
              >
                {msg.role === 'model' ? (
                  <div>
                    <div className="prose prose-stone prose-sm max-w-none prose-headings:font-serif-heading prose-headings:font-semibold prose-headings:text-stone-900 prose-p:leading-relaxed prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-stone-900">
                      <Markdown>{msg.content}</Markdown>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                          {msg.modelUsed || 'Flora IA'}
                        </span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Copiar texto"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-[10px] text-emerald-600">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    <div className="text-[10px] text-stone-400 text-right mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4 text-stone-300" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs p-4 border border-stone-200 shadow-xs flex items-center gap-2.5 text-xs text-stone-600">
              <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Flora está formulando conselhos botânicos personalizados...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activePlant
                  ? `Pergunte à Flora sobre a ${activePlant.commonName}... (Shift+Enter para pular linha)`
                  : 'Pergunte sobre rega, luz, substrato, podas ou pragas... (Shift+Enter para pular linha)'
              }
              className="w-full px-3.5 py-2.5 text-sm text-stone-800 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none placeholder:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="h-11 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-stone-400">
          <span>Modo ativo: <strong>{taskMode === 'complex' ? 'Diagnóstico Aprofundado' : taskMode === 'fast' ? 'Dicas Rápidas' : 'Cuidados Gerais'}</strong></span>
          <span>Pressione Enter para enviar, Shift+Enter para quebra de linha</span>
        </div>
      </div>
    </div>
  );
}
