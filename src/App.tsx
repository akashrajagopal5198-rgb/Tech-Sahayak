import React, { useState } from 'react';
import {
  Language,
  DeviceType,
  TextSize,
  SpeechSpeed,
  AppView,
  GuideStep,
  TaskSession,
} from './types';
import { translations } from './data/translations';
import { findFallbackGuide } from './data/fallbackGuides';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { HomeScreen } from './components/HomeScreen';
import { PhoneHelpHub } from './components/PhoneHelpHub';
import { ScamSafetyHub } from './components/ScamSafetyHub';
import { DeviceSelector } from './components/DeviceSelector';
import { StepByStepGuide } from './components/StepByStepGuide';
import { TaskCompleted } from './components/TaskCompleted';
import { VoiceModal } from './components/VoiceModal';
import { SettingsModal } from './components/SettingsModal';
import { stopSpeaking } from './utils/speech';

export function App() {
  // Localization & Accessibility State
  const [language, setLanguage] = useState<Language>('en');
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('large'); // default to large for elderly comfort
  const [speechSpeed, setSpeechSpeed] = useState<SpeechSpeed>('normal');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [device, setDevice] = useState<DeviceType>('unknown');

  // Navigation View
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Active Task Guidance State
  const [pendingQuery, setPendingQuery] = useState<string>('');
  const [taskSession, setTaskSession] = useState<TaskSession | null>(null);
  const [currentStep, setCurrentStep] = useState<GuideStep | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stuckCount, setStuckCount] = useState(0);

  // Language Selection Handler
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setHasChosenLanguage(true);
    setCurrentView('home');
  };

  // Start Query Handler (from Voice, Typing, Example chip, or Phone Help topic)
  const handleStartQuery = async (query: string, overrideDevice?: DeviceType) => {
    stopSpeaking();
    setIsVoiceModalOpen(false);

    const activeDevice = overrideDevice || device;

    // Check if we need to ask for device first
    const fallbackMatch = findFallbackGuide(query, language, activeDevice);

    if (activeDevice === 'unknown' && (!fallbackMatch || fallbackMatch.needsDevice)) {
      setPendingQuery(query);
      setCurrentView('device_select');
      return;
    }

    setIsLoading(true);
    setStuckCount(0);

    // If matching pre-baked guide exists, use it instantly with zero latency
    if (fallbackMatch) {
      const firstStep = fallbackMatch.steps[0];
      const session: TaskSession = {
        taskTitle: fallbackMatch.title,
        originalQuery: query,
        device: activeDevice,
        currentStepNumber: 1,
        totalEstimatedSteps: fallbackMatch.totalSteps,
        steps: [firstStep],
        isCompleted: false,
      };
      setTaskSession(session);
      setCurrentStep(firstStep);
      setCurrentView('guide');
      setIsLoading(false);
      return;
    }

    // Otherwise, call backend Gemini endpoint
    try {
      const res = await fetch('/api/guide/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          language,
          device: activeDevice,
        }),
      });

      const data = await res.json();

      if (data && data.success) {
        if (data.needsDevice && activeDevice === 'unknown') {
          setPendingQuery(query);
          setCurrentView('device_select');
          setIsLoading(false);
          return;
        }

        const step: GuideStep = {
          stepNumber: data.stepNumber || 1,
          instruction: data.instruction,
          detailExplanation: data.detailExplanation,
          visualHint: data.visualHint,
          iconHint: data.iconHint,
          encouragement: data.encouragement,
          isComplete: data.isComplete || false,
        };

        const session: TaskSession = {
          taskTitle: data.taskTitle || query,
          originalQuery: query,
          device: activeDevice,
          currentStepNumber: 1,
          totalEstimatedSteps: data.totalEstimatedSteps || 4,
          steps: [step],
          isCompleted: false,
        };

        setTaskSession(session);
        setCurrentStep(step);
        setCurrentView('guide');
      }
    } catch (err) {
      console.error('Error starting guide:', err);
      // Fallback generic step 1
      const fallbackStep: GuideStep = {
        stepNumber: 1,
        instruction: language === 'ta'
          ? 'உங்கள் போன் திரையை ஆன் செய்து முகப்புத் திரைக்கு வாருங்கள்.'
          : 'Unlock your phone and go to your home screen.',
        detailExplanation: language === 'ta'
          ? 'நாம் ஒன்றாகப் பார்ப்போம், கவலைப்பட வேண்டாம்.'
          : 'Take your time, let us do this together.',
        visualHint: 'Home Screen',
        iconHint: 'Smartphone',
        encouragement: "Let's do it!",
        isComplete: false,
      };
      setTaskSession({
        taskTitle: query,
        originalQuery: query,
        device: activeDevice,
        currentStepNumber: 1,
        totalEstimatedSteps: 4,
        steps: [fallbackStep],
        isCompleted: false,
      });
      setCurrentStep(fallbackStep);
      setCurrentView('guide');
    } finally {
      setIsLoading(false);
    }
  };

  // Device Selection Confirmation
  const handleSelectDevice = (chosenDevice: DeviceType) => {
    setDevice(chosenDevice);
    if (pendingQuery) {
      const q = pendingQuery;
      setPendingQuery('');
      handleStartQuery(q, chosenDevice);
    } else {
      setCurrentView('home');
    }
  };

  // "I DID IT" -> Advance to Next Step or Completion
  const handleNextStep = async () => {
    if (!taskSession || !currentStep) return;
    stopSpeaking();

    const nextStepNum = currentStep.stepNumber + 1;
    setStuckCount(0);

    // Check pre-baked guide progression
    const fallbackMatch = findFallbackGuide(taskSession.originalQuery, language, taskSession.device);
    if (fallbackMatch && nextStepNum <= fallbackMatch.steps.length) {
      const nextStepData = fallbackMatch.steps[nextStepNum - 1];
      setCurrentStep(nextStepData);
      setTaskSession((prev) => prev ? {
        ...prev,
        currentStepNumber: nextStepNum,
        steps: [...prev.steps, nextStepData],
      } : null);

      if (nextStepData.isComplete || nextStepNum >= fallbackMatch.totalSteps) {
        // Generate summary
        completeSession(taskSession.taskTitle, fallbackMatch.totalSteps);
      }
      return;
    }

    if (currentStep.isComplete || nextStepNum > taskSession.totalEstimatedSteps) {
      completeSession(taskSession.taskTitle, taskSession.totalEstimatedSteps);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/guide/next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalQuery: taskSession.originalQuery,
          taskTitle: taskSession.taskTitle,
          device: taskSession.device,
          currentStep: currentStep.stepNumber,
          totalEstimatedSteps: taskSession.totalEstimatedSteps,
          language,
          previousSteps: taskSession.steps,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        const nextStep: GuideStep = {
          stepNumber: data.stepNumber || nextStepNum,
          instruction: data.instruction,
          detailExplanation: data.detailExplanation,
          visualHint: data.visualHint,
          iconHint: data.iconHint,
          encouragement: data.encouragement,
          isComplete: data.isComplete || false,
        };

        setCurrentStep(nextStep);
        setTaskSession((prev) => prev ? {
          ...prev,
          currentStepNumber: nextStep.stepNumber,
          steps: [...prev.steps, nextStep],
        } : null);

        if (nextStep.isComplete) {
          completeSession(taskSession.taskTitle, nextStep.stepNumber);
        }
      }
    } catch (err) {
      console.error('Error fetching next step:', err);
      // Safe progressive fallback so the senior is never left stuck
      const isFinishing = nextStepNum >= taskSession.totalEstimatedSteps;
      const isTa = language === 'ta';
      const fallbackNext: GuideStep = {
        stepNumber: nextStepNum,
        instruction: isFinishing
          ? (isTa ? 'அருமை! நீங்கள் இந்த பணியை வெற்றிகரமாக முடித்துவிட்டீர்கள்.' : 'Great job! You have successfully completed this task.')
          : (isTa ? `படி ${nextStepNum}: அடுத்த அமைப்பைத் தொட்டு தொடரவும்.` : `Step ${nextStepNum}: Tap the next option on your screen.`),
        detailExplanation: isTa ? 'நிதானமாகப் பின்பற்றுங்கள்.' : 'Take your time, you are doing wonderful.',
        visualHint: isFinishing ? 'Completed' : `Step ${nextStepNum}`,
        iconHint: isFinishing ? 'Check' : 'ArrowRight',
        encouragement: isTa ? 'மிக அருமை!' : 'Wonderful progress!',
        isComplete: isFinishing,
      };

      setCurrentStep(fallbackNext);
      setTaskSession((prev) => prev ? {
        ...prev,
        currentStepNumber: nextStepNum,
        steps: [...prev.steps, fallbackNext],
      } : null);

      if (isFinishing) {
        completeSession(taskSession.taskTitle, taskSession.totalEstimatedSteps);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Complete Session and generate Caregiver summary
  const completeSession = async (title: string, totalSteps: number) => {
    let summaryText = language === 'ta'
      ? `இன்று "${title}" பணியை ${totalSteps} எளிய படிகளில் வெற்றிகரமாக செய்து முடித்துள்ளீர்கள்.`
      : `Today you successfully completed the ${totalSteps}-step guide for "${title}".`;

    try {
      const res = await fetch('/api/guide/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalQuery: taskSession?.originalQuery || title,
          taskTitle: title,
          device: taskSession?.device || device,
          totalSteps,
          language,
        }),
      });
      const data = await res.json();
      if (data && data.summary) {
        summaryText = data.summary;
      }
    } catch (e) {
      // ignore
    }

    setTaskSession((prev) => prev ? { ...prev, isCompleted: true, caregiverSummary: summaryText } : null);
    setCurrentView('task_completed');
  };

  // "I'M STUCK" -> Adaptive Rephrasing
  const handleStuck = async () => {
    if (!taskSession || !currentStep) return;
    stopSpeaking();

    const newStuckCount = stuckCount + 1;
    setStuckCount(newStuckCount);
    setIsLoading(true);

    try {
      const res = await fetch('/api/guide/stuck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalQuery: taskSession.originalQuery,
          taskTitle: taskSession.taskTitle,
          device: taskSession.device,
          stepNumber: currentStep.stepNumber,
          currentInstruction: currentStep.instruction,
          language,
          stuckCount: newStuckCount,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        const rephrasedStep: GuideStep = {
          ...currentStep,
          instruction: data.instruction || currentStep.instruction,
          detailExplanation: data.detailExplanation || currentStep.detailExplanation,
          visualHint: data.visualHint || currentStep.visualHint,
          iconHint: data.iconHint || currentStep.iconHint,
          isRephrased: true,
        };
        setCurrentStep(rephrasedStep);
      }
    } catch (err) {
      console.error('Error handling stuck:', err);
      // Local simplified fallback
      setCurrentStep({
        ...currentStep,
        instruction: language === 'ta'
          ? 'கவலைப்பட வேண்டாம் 😊 திரையில் உள்ள சின்னத்தை மெதுவாகத் தேடி ஒருமுறை தொடுங்கள்.'
          : "That's completely fine 😊 Look gently at the center or bottom of your screen. Tap the icon once.",
        detailExplanation: language === 'ta'
          ? 'நிதானமாகச் செய்யுங்கள்.'
          : 'Take your time. There is no hurry.',
        isRephrased: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Session
  const handleResetSession = () => {
    stopSpeaking();
    setTaskSession(null);
    setCurrentStep(null);
    setPendingQuery('');
    setStuckCount(0);
    setIsSettingsOpen(false);
    setIsVoiceModalOpen(false);
    setCurrentView('home');
  };

  // Text Size CSS Class Multiplier
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'extralarge':
        return 'text-lg sm:text-xl';
      case 'large':
        return 'text-base sm:text-lg';
      case 'normal':
      default:
        return 'text-sm sm:text-base';
    }
  };

  // If first time launching and language is not chosen yet
  if (!hasChosenLanguage) {
    return <LanguageSelector onSelectLanguage={handleSelectLanguage} />;
  }

  return (
    <div
      className={`min-h-screen bg-[#F5F2ED] text-[#2D2926] flex flex-col font-sans transition-all ${
        language === 'ta' ? 'font-tamil' : ''
      } ${getTextSizeClass()}`}
    >
      {/* Header */}
      <Header
        language={language}
        textSize={textSize}
        currentView={currentView}
        onSelectLanguage={setLanguage}
        onChangeTextSize={setTextSize}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={handleResetSession}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-12">
        {currentView === 'home' && (
          <HomeScreen
            language={language}
            onStartVoice={() => setIsVoiceModalOpen(true)}
            onSubmitQuery={(q) => handleStartQuery(q)}
            onOpenPhoneHelp={() => setCurrentView('phone_help')}
            onOpenScamSafety={() => setCurrentView('scam_safety')}
          />
        )}

        {currentView === 'phone_help' && (
          <PhoneHelpHub
            language={language}
            onSelectTask={(q) => handleStartQuery(q)}
            onBackToHome={handleResetSession}
          />
        )}

        {currentView === 'scam_safety' && (
          <ScamSafetyHub
            language={language}
            speechSpeed={speechSpeed}
            onBackToHome={handleResetSession}
          />
        )}

        {currentView === 'device_select' && (
          <DeviceSelector
            language={language}
            onSelectDevice={handleSelectDevice}
          />
        )}

        {currentView === 'guide' && currentStep && taskSession && (
          <StepByStepGuide
            language={language}
            taskTitle={taskSession.taskTitle}
            originalQuery={taskSession.originalQuery}
            device={taskSession.device}
            currentStep={currentStep}
            totalEstimatedSteps={taskSession.totalEstimatedSteps}
            speechSpeed={speechSpeed}
            isVoiceEnabled={isVoiceEnabled}
            isLoading={isLoading}
            onNextStep={handleNextStep}
            onStuck={handleStuck}
            onBackToHome={handleResetSession}
          />
        )}

        {currentView === 'task_completed' && taskSession && (
          <TaskCompleted
            language={language}
            taskTitle={taskSession.taskTitle}
            caregiverSummary={taskSession.caregiverSummary}
            speechSpeed={speechSpeed}
            isVoiceEnabled={isVoiceEnabled}
            onHelpWithSomethingElse={handleResetSession}
          />
        )}
      </main>

      {/* Voice Listening Modal */}
      {isVoiceModalOpen && (
        <VoiceModal
          language={language}
          onConfirmQuery={(q) => handleStartQuery(q)}
          onClose={() => setIsVoiceModalOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          language={language}
          textSize={textSize}
          speechSpeed={speechSpeed}
          isVoiceEnabled={isVoiceEnabled}
          device={device}
          onSelectLanguage={setLanguage}
          onChangeTextSize={setTextSize}
          onChangeSpeechSpeed={setSpeechSpeed}
          onToggleVoice={setIsVoiceEnabled}
          onChangeDevice={setDevice}
          onResetSession={handleResetSession}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
export default App;
