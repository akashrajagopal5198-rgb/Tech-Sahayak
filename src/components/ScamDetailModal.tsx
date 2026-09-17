import React, { useState } from 'react';
import { Language, ScamCategory, SpeechSpeed } from '../types';
import { translations } from '../data/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { X, Volume2, VolumeX, AlertTriangle, ShieldCheck, Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  scam: ScamCategory;
  language: Language;
  speechSpeed: SpeechSpeed;
  onClose: () => void;
}

export const ScamDetailModal: React.FC<Props> = ({
  scam,
  language,
  speechSpeed,
  onClose,
}) => {
  const t = translations[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  const title = language === 'ta' ? scam.titleTa : scam.titleEn;
  const whatIsIt = language === 'ta' ? scam.whatIsItTa : scam.whatIsItEn;
  const scammerSays = language === 'ta' ? scam.scammerSaysTa : scam.scammerSaysEn;
  const warningSigns = language === 'ta' ? scam.warningSignsTa : scam.warningSignsEn;
  const safetySteps = language === 'ta' ? scam.safetyStepsTa : scam.safetyStepsEn;
  const goldenRule = language === 'ta' ? scam.goldenRuleTa : scam.goldenRuleEn;

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const fullNarration = `${title}. ${whatIsIt}. ${t.whatScammerSays}: ${scammerSays}. ${t.rememberThis}: ${goldenRule}`;
    speakText({
      text: fullNarration,
      language,
      speed: speechSpeed,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2D2926]/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#F5F2ED] border border-[#E5E0D8] rounded-[40px] p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E0D8] mb-6">
          <button
            id="scam-detail-listen-btn"
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              isSpeaking
                ? 'bg-[#5A5A40] text-white'
                : 'bg-[#E5E0D8] hover:bg-[#DED9D1] text-[#2D2926]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#5A5A40]" />}
            <span>{isSpeaking ? 'Stop' : t.listen}</span>
          </button>

          <button
            id="scam-detail-close-btn"
            onClick={onClose}
            className="p-2.5 text-[#6B645D] hover:text-[#2D2926] bg-[#E5E0D8] hover:bg-[#DED9D1] rounded-full transition cursor-pointer"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2926] mb-6 leading-tight">
          {title}
        </h2>

        {/* 1. What is this scam? */}
        <div className="mb-6 bg-white border border-[#E5E0D8] rounded-3xl p-5 shadow-xs">
          <h3 className="text-xs font-bold text-[#8C867E] uppercase tracking-wider mb-2">
            {t.whatIsThisScam}
          </h3>
          <p className="text-[#4A443F] text-base sm:text-lg font-medium leading-relaxed">
            {whatIsIt}
          </p>
        </div>

        {/* 2. What might the scammer say? */}
        <div className="mb-6 bg-[#F0EEE9] border border-[#E5E0D8] rounded-3xl p-5">
          <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider mb-2 flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#5A5A40]" />
            <span>{t.whatScammerSays}</span>
          </h3>
          <p className="text-[#2D2926] text-base sm:text-lg italic font-serif-natural font-medium leading-relaxed">
            {scammerSays}
          </p>
        </div>

        {/* 3. Warning signs */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[#2D2926] mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#D98C45]" />
            <span>{t.warningSigns}</span>
          </h3>
          <ul className="space-y-2.5">
            {warningSigns.map((sign, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-white border border-[#E5E0D8] rounded-2xl text-[#4A443F] text-sm sm:text-base font-medium shadow-2xs"
              >
                <span className="text-[#D98C45] font-black text-base">•</span>
                <span className="leading-snug">{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. How can I stay safe? */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[#2D2926] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />
            <span>{t.howToStaySafe}</span>
          </h3>
          <ul className="space-y-2.5">
            {safetySteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-white border border-[#E5E0D8] rounded-2xl text-[#4A443F] text-sm sm:text-base font-medium shadow-2xs"
              >
                <CheckCircle2 className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Golden Rule */}
        <div className="p-6 bg-[#5A5A40] text-white rounded-3xl shadow-sm mb-6">
          <div className="flex items-center gap-2 text-[#E5E0D8] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1">
            <Star className="w-4 h-4 fill-[#E5E0D8] text-[#E5E0D8]" />
            <span>{t.rememberThis}</span>
          </div>
          <div className="text-lg sm:text-xl font-bold leading-snug font-serif-natural">
            {goldenRule}
          </div>
        </div>

        {/* Close Button */}
        <button
          id="scam-detail-bottom-close-btn"
          onClick={onClose}
          className="w-full py-4 bg-[#2D2926] hover:bg-black text-white font-bold text-lg rounded-2xl transition cursor-pointer"
        >
          {t.close}
        </button>
      </motion.div>
    </div>
  );
};
