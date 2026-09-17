import React, { useEffect, useState } from 'react';
import { Language, GuideStep, SpeechSpeed, DeviceType } from '../types';
import { translations } from '../data/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { Volume2, VolumeX, Check, HelpCircle, Loader2, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  language: Language;
  taskTitle: string;
  originalQuery: string;
  device: DeviceType;
  currentStep: GuideStep;
  totalEstimatedSteps: number;
  speechSpeed: SpeechSpeed;
  isVoiceEnabled: boolean;
  isLoading: boolean;
  onNextStep: () => void;
  onStuck: () => void;
  onBackToHome: () => void;
}

export const StepByStepGuide: React.FC<Props> = ({
  language,
  taskTitle,
  originalQuery,
  device,
  currentStep,
  totalEstimatedSteps,
  speechSpeed,
  isVoiceEnabled,
  isLoading,
  onNextStep,
  onStuck,
  onBackToHome,
}) => {
  const t = translations[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-speak current instruction if voice is enabled
  useEffect(() => {
    if (isVoiceEnabled && currentStep.instruction && !isLoading) {
      handleSpeak();
    }
    return () => {
      stopSpeaking();
    };
  }, [currentStep.stepNumber, currentStep.instruction, isVoiceEnabled, currentStep.isRephrased]);

  const handleSpeak = () => {
    stopSpeaking();
    const textToSpeak = `${t.step} ${currentStep.stepNumber}. ${currentStep.instruction} ${
      currentStep.detailExplanation ? currentStep.detailExplanation : ''
    }`;

    speakText({
      text: textToSpeak,
      language,
      speed: speechSpeed,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Bar with Task Title & Step Badge */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          id="guide-back-home-btn"
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EEE9] hover:bg-[#E5E0D8] text-[#5A5A40] font-bold rounded-full text-sm sm:text-base transition cursor-pointer border border-[#E5E0D8]"
        >
          <ArrowLeft className="w-4 h-4 text-[#5A5A40]" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          {device !== 'not_needed' && (
            <span className="px-3.5 py-1 bg-[#E5E0D8] text-[#5A5A40] rounded-full text-xs font-extrabold uppercase">
              {device === 'android' ? '📱 Android' : '🍎 iPhone'}
            </span>
          )}
          <span className="px-4 py-1 bg-[#F0EEE9] text-[#5A5A40] border border-[#E5E0D8] rounded-full text-sm font-extrabold uppercase tracking-wider">
            {t.step} {currentStep.stepNumber} {t.of} {Math.max(totalEstimatedSteps, currentStep.stepNumber)}
          </span>
        </div>
      </div>

      {/* Task Banner Card */}
      <div className="bg-white border border-[#E5E0D8] rounded-[40px] p-6 sm:p-10 shadow-sm mb-6">
        <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-base sm:text-lg mb-2">
          <Sparkles className="w-5 h-5 text-[#5A5A40]" />
          <span className="italic font-serif-natural text-lg sm:text-xl">{t.letsDoItTogether}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2926] mb-6 leading-snug">
          {taskTitle}
        </h1>

        {/* Step Progression Visual Bar */}
        <div className="w-full bg-[#F0EEE9] h-3 rounded-full overflow-hidden mb-8 border border-[#E5E0D8]">
          <div
            className="bg-[#5A5A40] h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(100, (currentStep.stepNumber / Math.max(totalEstimatedSteps, currentStep.stepNumber)) * 100)}%`,
            }}
          />
        </div>

        {/* The Current Step Instruction Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep.stepNumber}-${currentStep.isRephrased ? 'rephrased' : 'normal'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-[32px] border mb-6 ${
              currentStep.isRephrased
                ? 'bg-[#FAF7F2] border-[#D98C45]'
                : 'bg-[#F5F2ED] border-[#E5E0D8]'
            }`}
          >
            {/* If Rephrased after "I'm Stuck" */}
            {currentStep.isRephrased && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D98C45]/15 text-[#D98C45] rounded-full font-bold text-sm mb-4 border border-[#D98C45]/30">
                <HelpCircle className="w-4 h-4" />
                <span>{t.simplifiedExplanation}</span>
              </div>
            )}

            <div className="text-xs sm:text-sm font-extrabold text-[#8C867E] uppercase tracking-widest mb-2">
              {t.step} {currentStep.stepNumber}
            </div>

            {/* Instruction Main Text */}
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2D2926] leading-relaxed mb-4">
              {currentStep.instruction}
            </div>

            {/* Detail Explanation / Visual Clue */}
            {currentStep.detailExplanation && (
              <p className="text-[#4A443F] text-lg sm:text-xl font-medium leading-relaxed mb-4 font-serif-natural italic">
                {currentStep.detailExplanation}
              </p>
            )}

            {/* Visual Hint Pill */}
            {currentStep.visualHint && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E0D8] rounded-2xl text-[#2D2926] font-bold text-sm sm:text-base shadow-2xs">
                <span>🔍 {currentStep.visualHint}</span>
              </div>
            )}

            {/* Listen / Replay Audio Button */}
            <div className="mt-6 pt-5 border-t border-[#E5E0D8] flex items-center justify-between">
              <button
                id="guide-listen-replay-btn"
                onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-base transition active:scale-95 cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F0EEE9] text-[#5A5A40] border border-[#E5E0D8]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5 animate-pulse" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-[#5A5A40]" />
                    <span>{t.replay}</span>
                  </>
                )}
              </button>

              <span className="text-[#8C867E] text-xs sm:text-sm font-medium">
                {speechSpeed === 'slow' ? '🐢 Slow voice' : 'Normal voice'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-5 bg-[#F0EEE9] border border-[#E5E0D8] rounded-2xl mb-6 flex items-center justify-center gap-3 text-[#5A5A40] font-bold text-lg">
            <Loader2 className="w-6 h-6 animate-spin text-[#5A5A40]" />
            <span>{t.thinking}</span>
          </div>
        )}

        {/* TWO GIANT ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* I DID IT (Primary Olive Success Action) */}
          <motion.button
            id="guide-i-did-it-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            onClick={onNextStep}
            className="py-6 px-6 bg-[#5A5A40] hover:bg-[#484833] disabled:opacity-50 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3 cursor-pointer border-2 border-[#5A5A40]"
          >
            <Check className="w-7 h-7 sm:w-8 sm:h-8" />
            <span>{t.iDidIt}</span>
          </motion.button>

          {/* I'M STUCK (Patient Ochre/Terracotta Help Action) */}
          <motion.button
            id="guide-im-stuck-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            onClick={onStuck}
            className="py-6 px-6 bg-[#D98C45] hover:bg-[#C27A38] disabled:opacity-50 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3 cursor-pointer border-2 border-[#D98C45]"
          >
            <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <span>{t.imStuck}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
