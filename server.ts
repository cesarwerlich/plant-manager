import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Support base64 image uploads up to 25MB
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize GoogleGenAI SDK with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    apiKeyConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Plant identification endpoint using gemini-3.1-pro-preview for image understanding
app.post('/api/identify-plant', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    // Clean base64 string if data URL scheme is included
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const promptText = `
Você é uma autoridade em taxonomia vegetal, botânica e jardinagem prática.
Examine a foto desta planta minuciosamente.
1. Identifique a planta com máxima precisão (nome popular comum em Português do Brasil, nome científico binomial em latim botânico, família botânica e tipo de planta).
2. Avalie o estado de saúde visual do espécime (coloração da folhagem, turgidez das folhas, sinais de pragas, fungos, desidratação, excesso de água, deficiência nutricional ou saúde excelente).
3. Forneça instruções de cultivo completas, práticas e personalizadas para esta espécie específica.
${userPrompt ? `Observação enviada pelo usuário: "${userPrompt}"` : ''}

IMPORTANTE: Todos os textos explicativos, nomes populares, descrições, diagnósticos, recomendações de rega, luz, substrato, temperatura, adubação, poda, toxicidade e curiosidades DEVEM estar estritamente em Português do Brasil (pt-BR). Mantenha o nome científico no padrão botânico binomial.

Responda estritamente em formato JSON válido respeitando o schema especificado.
`;

    // Attempt with required gemini-3.1-pro-preview
    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: cleanBase64,
      },
    };

    let resultText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            imagePart,
            { text: promptText },
          ],
        },
        config: {
          systemInstruction: 'Você é uma cientista botânica e especialista hortícola. Você sempre responde em Português do Brasil (pt-BR), com rigor taxonômico e orientações práticas de jardinagem.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              commonName: { type: Type.STRING, description: 'Common popular name of the plant' },
              scientificName: { type: Type.STRING, description: 'Binomial scientific botanical name' },
              family: { type: Type.STRING, description: 'Botanical family (e.g. Araceae, Cactaceae)' },
              confidence: { type: Type.STRING, description: '"high", "medium", or "low"' },
              confidenceScore: { type: Type.NUMBER, description: 'Percentage confidence score from 0 to 100' },
              description: { type: Type.STRING, description: 'A vivid 2-3 sentence overview of this plant' },
              nativeHabitat: { type: Type.STRING, description: 'Geographic origin and natural biome' },
              plantType: { type: Type.STRING, description: 'e.g. Indoor Foliage, Succulent, Flowering Shrub, Herb, Tree, Vine' },
              difficultyLevel: { type: Type.STRING, description: '"Beginner Friendly", "Moderate", or "Advanced / Demanding"' },
              healthAssessment: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING, description: '"Healthy", "Needs Attention", or "Critical / Diseased"' },
                  summary: { type: Type.STRING, description: 'Concise visual health summary of this individual specimen' },
                  diagnoses: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        issue: { type: Type.STRING },
                        severity: { type: Type.STRING, description: '"mild", "moderate", or "severe"' },
                        suggestion: { type: Type.STRING },
                      },
                      required: ['issue', 'severity', 'suggestion'],
                    },
                  },
                },
                required: ['status', 'summary', 'diagnoses'],
              },
              careInstructions: {
                type: Type.OBJECT,
                properties: {
                  watering: {
                    type: Type.OBJECT,
                    properties: {
                      frequency: { type: Type.STRING, description: 'e.g. Every 7-10 days when top 2 inches dry' },
                      summary: { type: Type.STRING, description: 'Quick watering rule' },
                      details: { type: Type.STRING, description: 'In-depth moisture, soak method, and seasonal adjustments' },
                      signsOfUnderWatering: { type: Type.STRING, description: 'Symptoms of thirst' },
                      signsOfOverWatering: { type: Type.STRING, description: 'Symptoms of excess water / root rot' },
                    },
                    required: ['frequency', 'summary', 'details', 'signsOfUnderWatering', 'signsOfOverWatering'],
                  },
                  light: {
                    type: Type.OBJECT,
                    properties: {
                      requirement: { type: Type.STRING, description: 'e.g. Bright Indirect Light' },
                      summary: { type: Type.STRING, description: 'Quick lighting guideline' },
                      details: { type: Type.STRING, description: 'Window placements (East, West, South, North) and foot-candles' },
                      directSunTolerance: { type: Type.STRING, description: 'Direct sun sensitivity' },
                    },
                    required: ['requirement', 'summary', 'details', 'directSunTolerance'],
                  },
                  soilAndPotting: {
                    type: Type.OBJECT,
                    properties: {
                      mixType: { type: Type.STRING, description: 'Recommended soil blend (e.g. chunky aroid mix, succulent mix)' },
                      drainageNeeds: { type: Type.STRING, description: 'Drainage hole and pot material advice' },
                      repottingSchedule: { type: Type.STRING, description: 'When and how often to repot' },
                    },
                    required: ['mixType', 'drainageNeeds', 'repottingSchedule'],
                  },
                  temperatureAndHumidity: {
                    type: Type.OBJECT,
                    properties: {
                      tempRange: { type: Type.STRING, description: 'e.g. 65°F - 85°F (18°C - 29°C)' },
                      humidityNeeds: { type: Type.STRING, description: 'e.g. Moderate to High (50% - 70%)' },
                      coldTolerance: { type: Type.STRING, description: 'Minimum safe temperature' },
                      humidityTips: { type: Type.STRING, description: 'Tips to maintain humidity indoors' },
                    },
                    required: ['tempRange', 'humidityNeeds', 'coldTolerance', 'humidityTips'],
                  },
                  fertilizing: {
                    type: Type.OBJECT,
                    properties: {
                      schedule: { type: Type.STRING, description: 'Feeding frequency' },
                      fertilizerType: { type: Type.STRING, description: 'Recommended NPK balance or organic feed' },
                      winterCare: { type: Type.STRING, description: 'Dormancy instructions' },
                    },
                    required: ['schedule', 'fertilizerType', 'winterCare'],
                  },
                  pruningAndMaintenance: {
                    type: Type.OBJECT,
                    properties: {
                      tips: { type: Type.ARRAY, items: { type: Type.STRING } },
                      propagationMethod: { type: Type.STRING, description: 'How to multiply this plant (stem cutting, division, etc.)' },
                    },
                    required: ['tips', 'propagationMethod'],
                  },
                  toxicity: {
                    type: Type.OBJECT,
                    properties: {
                      toxicToPets: { type: Type.BOOLEAN, description: 'True if toxic to cats or dogs' },
                      petDetails: { type: Type.STRING, description: 'Specific compounds (calcium oxalate crystals, saponins, etc.)' },
                      toxicToHumans: { type: Type.BOOLEAN, description: 'True if ingestion causes irritation' },
                    },
                    required: ['toxicToPets', 'petDetails', 'toxicToHumans'],
                  },
                  seasonalCalendar: {
                    type: Type.OBJECT,
                    properties: {
                      springSummer: { type: Type.STRING, description: 'Active growth phase maintenance' },
                      fallWinter: { type: Type.STRING, description: 'Cooler month dormant adjustments' },
                    },
                    required: ['springSummer', 'fallWinter'],
                  },
                },
                required: [
                  'watering',
                  'light',
                  'soilAndPotting',
                  'temperatureAndHumidity',
                  'fertilizing',
                  'pruningAndMaintenance',
                  'toxicity',
                  'seasonalCalendar',
                ],
              },
              funFacts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 fascinating botanical or folklore trivia points',
              },
            },
            required: [
              'commonName',
              'scientificName',
              'family',
              'confidence',
              'confidenceScore',
              'description',
              'nativeHabitat',
              'plantType',
              'difficultyLevel',
              'healthAssessment',
              'careInstructions',
              'funFacts',
            ],
          },
        },
      });
      resultText = response.text || '';
    } catch (primaryError: any) {
      console.warn('gemini-3.1-pro-preview error, attempting fallback:', primaryError?.message);
      // Fallback to gemini-3.5-flash if needed
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: {
          parts: [
            imagePart,
            { text: promptText + '\nRespond with JSON only.' },
          ],
        },
        config: {
          responseMimeType: 'application/json',
        },
      });
      resultText = fallbackResponse.text || '';
    }

    const parsed = JSON.parse(resultText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/identify-plant:', error);
    res.status(500).json({
      error: error?.message || 'Failed to identify plant. Please check your image and try again.',
    });
  }
});

// Multi-turn Chatbot endpoint
// Uses gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general tasks, and gemini-3.1-flash-lite for fast tasks
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      plantContext,
      taskType = 'general', // 'complex' | 'general' | 'fast'
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Select model strictly based on the user requirement:
    // - gemini-3.1-pro-preview for particularly complex tasks
    // - gemini-3.5-flash for general tasks
    // - gemini-3.1-flash-lite for tasks that should happen fast
    let selectedModel = 'gemini-3.5-flash';
    if (taskType === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (taskType === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else {
      selectedModel = 'gemini-3.5-flash';
    }

    let systemInstruction = `Você é Flora, Mestra em Botânica, Horticultora Certificada e Especialista Sênior em Cuidados de Plantas.
Você tem mais de 20 anos de experiência em pesquisa botânica, propagação vegetal e cultivo prático em estufas e jardins residenciais.
Sua missão é orientar pessoas apaixonadas por plantas em todos os níveis — desde quem acabou de comprar sua primeira suculenta até cultivadores experientes.
Forneça sempre conselhos claros, acionáveis, calorosos, encorajadores e rigorosamente fundamentados na ciência botânica.
Responda SEMPRE em Português do Brasil (pt-BR).
Utilize formatação Markdown elegante com marcadores e destaques em negrito para facilitar a leitura.
Nunca cite nomes técnicos de modelos ou códigos de software de IA; apresente-se sempre como Flora, sua assistente botânica.`;

    if (plantContext) {
      systemInstruction += `\n\nCONTEXTO DO ESPÉCIME ATIVO NO MOMENTO:
A pessoa está consultando você especificamente sobre esta planta identificada:
- Nome: ${plantContext.commonName || 'Desconhecida'} (${plantContext.scientificName || 'Não informado'})
- Família: ${plantContext.family || 'N/A'}
- Visão geral de cuidados: Rega ${plantContext.careInstructions?.watering?.frequency || 'regular'}, Luz: ${plantContext.careInstructions?.light?.requirement || 'indireta brilhante'}, Temperatura: ${plantContext.careInstructions?.temperatureAndHumidity?.tempRange || 'ambiente'}.
- Estado de Saúde: ${plantContext.healthAssessment?.status || 'Normal'} - ${plantContext.healthAssessment?.summary || ''}
Leve em consideração e cite as características biológicas dessa espécie sempre que pertinente!`;
    }

    // Map conversation history to Gemini contents format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    let responseText = '';

    try {
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction,
        },
      });
      responseText = response.text || '';
    } catch (modelErr: any) {
      console.warn(`Error with ${selectedModel}, trying fallback to gemini-3.5-flash:`, modelErr?.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
        },
      });
      responseText = fallbackResponse.text || '';
    }

    const modeLabels: Record<string, string> = {
      complex: 'Diagnóstico Aprofundado',
      fast: 'Dicas Rápidas',
      general: 'Cuidados Gerais',
    };

    res.json({
      role: 'model',
      content: responseText,
      modelUsed: modeLabels[taskType] || 'Assistente Flora',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'A assistente botânica encontrou uma instabilidade. Por favor, tente novamente.',
    });
  }
});

// Fast Quick Tips endpoint using gemini-3.1-flash-lite
app.post('/api/quick-tips', async (req, res) => {
  try {
    const { plantName, topic = 'general' } = req.body;
    if (!plantName) {
      return res.status(400).json({ error: 'O nome da planta é obrigatório.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Forneça 3 dicas práticas imediatas e de alto impacto para a planta ${plantName} sobre o tema ${topic}. Responda em Português do Brasil em tópicos concisos de 1-2 frases cada.`,
      config: {
        systemInstruction: 'Você é um índice botânico rápido de consulta prática. Responda estritamente em Português do Brasil (pt-BR).',
      },
    });

    res.json({
      tips: response.text || '',
      engine: 'Guia Rápido Botânico',
    });
  } catch (error: any) {
    console.error('Error in /api/quick-tips:', error);
    res.status(500).json({ error: error?.message || 'Falha ao buscar dicas rápidas.' });
  }
});

// Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gardening Assistant server running on http://localhost:${PORT}`);
  });
}

startServer();
