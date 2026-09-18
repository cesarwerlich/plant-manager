import { IdentifiedPlant } from '../types';

export const SAMPLE_PLANTS: IdentifiedPlant[] = [
  {
    id: 'sample-monstera',
    identifiedAt: '2026-09-08T10:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    commonName: 'Costela-de-Adão (Monstera)',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    confidence: 'high',
    confidenceScore: 98,
    description: 'Uma imponente planta tropical nativa das florestas úmidas da América Central, famosa por suas folhas verdes brilhantes em formato de coração que desenvolvem fenestrações (recortes naturais) conforme amadurece.',
    nativeHabitat: 'Florestas tropicais do sul do México até o Panamá',
    plantType: 'Folhagem de Interior / Trepadeira Epífita',
    difficultyLevel: 'Fácil (Iniciante)',
    healthAssessment: {
      status: 'Saudável',
      summary: 'Folhagem viçosa em verde esmeralda com nova folha jovem desabrochando. Sem sinais de pragas ou clorose.',
      diagnoses: [
        {
          issue: 'Desenvolvimento natural de raízes aéreas',
          severity: 'leve',
          suggestion: 'Comportamento biológico perfeitamente normal. Direcione as raízes aéreas para dentro do substrato ou conduza-as por um tutor de musgo para sustentação.'
        }
      ]
    },
    careInstructions: {
      watering: {
        frequency: 'A cada 7 a 10 dias',
        summary: 'Aguarde os primeiros 5 cm de solo secarem antes de regar novamente.',
        details: 'Regue abundantemente até a água escorrer pelos furos do vaso. Esvazie o pratinho após 15 minutos para prevenir o apodrecimento radicular. Reduza a frequência no inverno.',
        signsOfUnderWatering: 'Folhas caídas e murchas, bordas das folhas enrolando para dentro e pontas marrons ressecadas.',
        signsOfOverWatering: 'Folhas inferiores amareladas, manchas castanhas amolecidas com halo amarelo e cheiro de mofo no solo.'
      },
      light: {
        requirement: 'Luz Indireta Abundante (Meia-sombra)',
        summary: 'Desenvolve-se plenamente com claridade filtrada intensa; evite sol direto nas horas mais quentes.',
        details: 'Posicione a cerca de 1 a 2 metros de janelas voltadas para o leste ou norte. Sol suave do início da manhã estimula os recortes das folhas, mas o sol forte da tarde queima a folhagem.',
        directSunTolerance: 'Baixa a Moderada (máximo 1 a 2 horas de sol matinal muito suave)'
      },
      soilAndPotting: {
        mixType: 'Substrato aerado e drenante para aráceas (casca de pinus, perlita, turfa/fibra de coco e húmus de minhoca)',
        drainageNeeds: 'Fundamental possuir orifícios de drenagem. Vasos de barro ou vasos plásticos com furos generosos funcionam muito bem.',
        repottingSchedule: 'A cada 18 a 24 meses durante a primavera, quando as raízes preencherem totalmente o recipiente.'
      },
      temperatureAndHumidity: {
        tempRange: '20°C a 30°C',
        humidityNeeds: '60% ou superior ideal; tolera a umidade média residencial (45-55%).',
        coldTolerance: 'Sensível ao frio extremo; não expor a temperaturas abaixo de 13°C ou a correntes de ar condicionado.',
        humidityTips: 'Agrupe com outras plantas tropicais, utilize prato com pedras úmidas ou umidificador de ambiente em épocas de estiagem.'
      },
      fertilizing: {
        schedule: 'Mensalmente durante a primavera e verão',
        fertilizerType: 'Adubo líquido equilibrado (NPK 10-10-10 ou biofertilizante orgânico) diluído na metade da dose indicada pelo fabricante.',
        winterCare: 'Suspenda a adubação no outono e inverno, período em que a planta reduz seu ritmo vegetativo.'
      },
      pruningAndMaintenance: {
        tips: [
          'Limpe as folhas largas mensalmente com pano macio umedecido em água para remover poeira e potencializar a fotossíntese.',
          'Instale um tutor de fibra de coco ou musgo sphagnum para apoiar o hábito natural trepador da planta.',
          'Remova folhas velhas ou danificadas cortando rente à base com tesoura de poda esterilizada.'
        ],
        propagationMethod: 'Estaca de caule cortada logo abaixo de um nó com pelo menos uma raiz aérea; enraíze na água ou em musgo úmido.'
      },
      toxicity: {
        toxicToPets: true,
        petDetails: 'Contém cristais de oxalato de cálcio insolúveis que provocam irritação na mucosa oral, salivação intensa e desconforto digestivo em cães e gatos.',
        toxicToHumans: true
      },
      seasonalCalendar: {
        springSummer: 'Fase de crescimento acelerado: regue com regularidade, fertilize mensalmente e amarre novos brotos no tutor.',
        fallWinter: 'Espace mais as regas, cesse a fertilização e aproxime o vaso da janela caso os dias fiquem mais escuros.'
      }
    },
    funFacts: [
      'Na natureza, a Monstera deliciosa produz uma fruta comestível que, quando completamente madura, tem sabor que lembra uma mistura de banana com abacaxi!',
      'As aberturas e fendas das folhas surgiram na evolução para permitir que ventanias de tempestades tropicais atravessem a folhagem sem rasgá-la.',
      'Suas raízes aéreas são tão fortes que povos indígenas tradicionalmente as usavam para tecer cestos e amarrações.'
    ],
    lastWatered: '2026-09-06'
  },
  {
    id: 'sample-snake-plant',
    identifiedAt: '2026-09-08T10:15:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=1000&q=80',
    commonName: 'Espada-de-São-Jorge / Sanseviéria',
    scientificName: 'Dracaena trifasciata (Sansevieria)',
    family: 'Asparagaceae',
    confidence: 'high',
    confidenceScore: 99,
    description: 'Uma suculenta excepcionalmente resistente com folhas eretas em formato de espada, exibindo belas margens marmorizadas em tons de verde e dourado. Famosa pela extrema resiliência e capacidade de purificação do ar.',
    nativeHabitat: 'África Ocidental tropical, da Nigéria até o Congo',
    plantType: 'Suculenta Tolerante à Seca / Folhagem Arquitetônica',
    difficultyLevel: 'Fácil (Iniciante)',
    healthAssessment: {
      status: 'Saudável',
      summary: 'Lanças eretas e rígidas com bordas douradas nítidas. Nível hídrico e vigor celular ideais.',
      diagnoses: []
    },
    careInstructions: {
      watering: {
        frequency: 'A cada 2 a 4 semanas',
        summary: 'Deixe o substrato secar por completo antes de regar. Na dúvida, espere mais alguns dias.',
        details: 'Regue profundamente até drenar e esvazie qualquer excesso de água. Durante o inverno, regar uma vez ao mês costuma ser mais que suficiente.',
        signsOfUnderWatering: 'Leve enrugamento ao longo das folhas verticais e curvatura para dentro.',
        signsOfOverWatering: 'Folhas amolecidas, translúcidas ou tombando na base do solo com cheiro de podridão.'
      },
      light: {
        requirement: 'De Pouca a Muita Luz Indireta (Extremamente Adaptável)',
        summary: 'Tolera cantos sombreados de interiores e também janelas bastante iluminadas.',
        details: 'Cresce com maior rapidez sob boa claridade, mas é uma das raras plantas capazes de sobreviver bem em ambientes com apenas iluminação artificial.',
        directSunTolerance: 'Alta (tolera sol pleno se adaptada gradativamente)'
      },
      soilAndPotting: {
        mixType: 'Substrato bem drenante para cactos e suculentas com areia grossa, perlita e terra vegetal.',
        drainageNeeds: 'Essencial. Vasos pesados de cerâmica ou barro evitam o tombamento das folhas pesadas e ajudam a evaporar umidade excessiva.',
        repottingSchedule: 'Apenas quando os fortes rizomas deformarem ou quebrarem o vaso (a cada 3 a 4 anos).'
      },
      temperatureAndHumidity: {
        tempRange: '18°C a 35°C',
        humidityNeeds: 'Baixa a média (30% a 50%). Altamente tolerante ao ar seco.',
        coldTolerance: 'Sensível a geadas severas; manter preferencialmente acima de 12°C.',
        humidityTips: 'Não borrife água nas folhas da sanseviéria. Água acumulada no miolo central pode causar podridão da roseta.'
      },
      fertilizing: {
        schedule: 'Duas vezes ao ano (início da primavera e meados do verão)',
        fertilizerType: 'Fertilizante para cactos e suculentas em concentração bem suave.',
        winterCare: 'Não fertilize durante o período de dormência no inverno.'
      },
      pruningAndMaintenance: {
        tips: [
          'Limpe a poeira das folhas verticais com pano seco macio.',
          'Corte folhas velhas ou danificadas bem rente à base do solo.',
          'Nunca corte ou quebre a pontinha apical da folha, pois isso paralisa o crescimento vertical daquela haste.'
        ],
        propagationMethod: 'Divisão de touceiras e rizomas durante o replantio, ou estaquia de pedaços de folha na terra úmida ou água.'
      },
      toxicity: {
        toxicToPets: true,
        petDetails: 'Contém saponinas que podem provocar salivação e desconforto gastrointestinal se ingeridas por cães ou gatos.',
        toxicToHumans: true
      },
      seasonalCalendar: {
        springSummer: 'Período vegetativo ativo: regue a cada 2-3 semanas e mantenha em local bem iluminado.',
        fallWinter: 'Dormência: reduza a rega para no máximo uma vez ao mês e afaste de correntes de ar gelado.'
      }
    },
    funFacts: [
      'Foi destaque nos estudos de ar limpo da NASA por sua eficiência em filtrar poluentes voláteis como benzeno, xileno e formaldeído.',
      'Ao contrário da maioria das plantas, realiza fotossíntese CAM (Metabolismo Ácido das Crassuláceas), liberando oxigênio durante a noite.',
      'Suas fibras vegetais de alta resistência eram historicamente utilizadas na confecção de cordas de arco na África.'
    ],
    lastWatered: '2026-08-28'
  },
  {
    id: 'sample-fiddle-leaf',
    identifiedAt: '2026-09-08T09:30:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
    commonName: 'Figueira-lira (Ficus lyrata)',
    scientificName: 'Ficus lyrata',
    family: 'Moraceae',
    confidence: 'high',
    confidenceScore: 96,
    description: 'Uma árvore ornamental clássica para interiores, com folhas imponentes em formato de violino, nervuras esculpidas e aspecto couro acetinado.',
    nativeHabitat: 'Florestas tropicais de planície da África Ocidental',
    plantType: 'Árvore de Interior / Planta de Destaque',
    difficultyLevel: 'Moderado',
    healthAssessment: {
      status: 'Requer Atenção',
      summary: 'Edema leve (pontinhos avermelhados nas folhas jovens recém-nascidas) decorrente de oscilações na rotina de rega.',
      diagnoses: [
        {
          issue: 'Oscilação hídrica celular / Edema',
          severity: 'leve',
          suggestion: 'Mantenha um cronograma de regas constante para que as células das raízes não absorvam água em excesso após períodos de seca.'
        }
      ]
    },
    careInstructions: {
      watering: {
        frequency: 'A cada 7 a 10 dias',
        summary: 'Regue quando os primeiros 50% do substrato estiverem secos ao toque.',
        details: 'Regue de forma uniforme com água em temperatura ambiente até escorrer. Evite água com excesso de cloro deixando-a descansar 24 horas antes de aplicar.',
        signsOfUnderWatering: 'Folhas inferiores caídas e pontas secas e crocantes no centro do limbo foliar.',
        signsOfOverWatering: 'Bordas das folhas com manchas escuras, queda repentina de folhas verdes e caule amolecido.'
      },
      light: {
        requirement: 'Claridade Intensa e Filtrada',
        summary: 'Necessita de várias horas diárias de luz brilhante indireta ou sol matinal ameno.',
        details: 'Coloque bem perto de janelas grandes e sem obstrução. Gire o vaso 90 graus semanalmente para que a copa cresça ereta e uniforme.',
        directSunTolerance: 'Moderada (sol da manhã é excelente; sol tórrido do meio-dia deve ser filtrado por cortinas leves)'
      },
      soilAndPotting: {
        mixType: 'Substrato fértil e bem aerado com fibra de coco, perlita e casca de pinus.',
        drainageNeeds: 'Drenagem excelente é indispensável. As raízes do ficus são muito suscetíveis a fungos de podridão radicular.',
        repottingSchedule: 'A cada 2 anos na primavera para um vaso 5 cm maior em diâmetro.'
      },
      temperatureAndHumidity: {
        tempRange: '18°C a 28°C',
        humidityNeeds: '50% a 65% de umidade relativa do ar.',
        coldTolerance: 'Muito sensível a rajadas frias e mudanças bruscas de lugar.',
        humidityTips: 'Borrife a copa em dias secos ou use umidificador de ar no cômodo durante o inverno.'
      },
      fertilizing: {
        schedule: 'A cada 15 a 30 dias na primavera e verão',
        fertilizerType: 'Adubo específico para folhagens rico em nitrogênio ou NPK 10-10-10 diluído.',
        winterCare: 'Interrompa a fertilização no outono e inverno.'
      },
      pruningAndMaintenance: {
        tips: [
          'Gire o vaso um quarto de volta por semana para manter o tronco reto e a copa simétrica.',
          'Limpe as folhas suavemente com pano úmido ou óleo de neem para prevenir ácaros e devolver o brilho.',
          'Pode a gema apical na primavera se desejar estimular a ramificação lateral.'
        ],
        propagationMethod: 'Estacas de galho com folhas na água ou alporquia em ramos semilenhosos.'
      },
      toxicity: {
        toxicToPets: true,
        petDetails: 'A seiva leitosa contém látex e compostos que provocam dermatite de contato e vômitos se ingerida por animais domésticos.',
        toxicToHumans: true
      },
      seasonalCalendar: {
        springSummer: 'Pico de crescimento: gire o vaso, adube quinzenalmente e inspecione o verso das folhas.',
        fallWinter: 'Espace mais a rega, suspenda o adubo e garanta o máximo de luminosidade diurna.'
      }
    },
    funFacts: [
      'Nas florestas tropicais da África Ocidental, o Ficus lyrata muitas vezes começa sua vida como uma epífita na copa de outra árvore antes de estender raízes até o solo!',
      'Os ficus adoram estabilidade: mudá-los constantemente de lugar na casa frequentemente causa estresse e queda de folhas.',
      'A textura grossa das folhas é uma adaptação natural para suportar fortes ventos tropicais sem desidratar.'
    ],
    lastWatered: '2026-09-02'
  }
];
