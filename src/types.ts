export interface PlantHealthAssessment {
  status: 'Healthy' | 'Needs Attention' | 'Critical / Diseased' | 'Saudável' | 'Requer Atenção' | 'Crítico / Doente' | string;
  summary: string;
  diagnoses: Array<{
    issue: string;
    severity: 'mild' | 'moderate' | 'severe' | 'leve' | 'moderada' | 'grave' | string;
    suggestion: string;
  }>;
}

export interface CareInstructions {
  watering: {
    frequency: string;
    summary: string;
    details: string;
    signsOfUnderWatering: string;
    signsOfOverWatering: string;
  };
  light: {
    requirement: string;
    summary: string;
    details: string;
    directSunTolerance: string;
  };
  soilAndPotting: {
    mixType: string;
    drainageNeeds: string;
    repottingSchedule: string;
  };
  temperatureAndHumidity: {
    tempRange: string;
    humidityNeeds: string;
    coldTolerance: string;
    humidityTips: string;
  };
  fertilizing: {
    schedule: string;
    fertilizerType: string;
    winterCare: string;
  };
  pruningAndMaintenance: {
    tips: string[];
    propagationMethod: string;
  };
  toxicity: {
    toxicToPets: boolean;
    petDetails: string;
    toxicToHumans: boolean;
  };
  seasonalCalendar: {
    springSummer: string;
    fallWinter: string;
  };
}

export interface IdentifiedPlant {
  id: string;
  identifiedAt: string;
  imageUrl: string;
  commonName: string;
  scientificName: string;
  family: string;
  confidence: 'high' | 'medium' | 'low';
  confidenceScore: number;
  description: string;
  nativeHabitat: string;
  plantType: string;
  difficultyLevel: 'Beginner Friendly' | 'Moderate' | 'Advanced / Demanding' | 'Fácil (Iniciante)' | 'Moderado' | 'Avançado / Exigente' | string;
  healthAssessment: PlantHealthAssessment;
  careInstructions: CareInstructions;
  funFacts: string[];
  userNotes?: string;
  lastWatered?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export type TaskMode = 'complex' | 'general' | 'fast';
