export type Language = 'en' | 'ta';

export type DeviceType = 'android' | 'iphone' | 'unknown' | 'not_needed';

export type TextSize = 'normal' | 'large' | 'extralarge';

export type SpeechSpeed = 'normal' | 'slow';

export type AppView = 
  | 'language_select'
  | 'home'
  | 'phone_help'
  | 'device_select'
  | 'guide'
  | 'task_completed'
  | 'scam_safety'
  | 'settings';

export interface GuideStep {
  stepNumber: number;
  instruction: string;
  detailExplanation?: string;
  visualHint?: string;
  iconHint?: string;
  encouragement?: string;
  isRephrased?: boolean;
  isComplete?: boolean;
}

export interface TaskSession {
  originalQuery: string;
  taskTitle: string;
  device: DeviceType;
  needsDevice?: boolean;
  currentStepNumber: number;
  totalEstimatedSteps: number;
  steps: GuideStep[];
  stuckCountForCurrentStep?: number;
  isCompleted: boolean;
  caregiverSummary?: string;
}

export interface ScamCategory {
  id: string;
  titleEn: string;
  titleTa: string;
  icon: string;
  taglineEn: string;
  taglineTa: string;
  whatIsItEn: string;
  whatIsItTa: string;
  scammerSaysEn: string;
  scammerSaysTa: string;
  warningSignsEn: string[];
  warningSignsTa: string[];
  safetyStepsEn: string[];
  safetyStepsTa: string[];
  goldenRuleEn: string;
  goldenRuleTa: string;
}

export interface ScamAnalysisResult {
  riskLevel: 'high_risk' | 'suspicious' | 'unclear';
  categoryEn: string;
  categoryTa: string;
  assessmentEn: string;
  assessmentTa: string;
  warningSignsEn: string[];
  warningSignsTa: string[];
  safeActionsEn: string[];
  safeActionsTa: string[];
  goldenAdviceEn: string;
  goldenAdviceTa: string;
}
