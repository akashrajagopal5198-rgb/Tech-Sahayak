import React, { useEffect, useState } from 'react';
import { Language, SpeechSpeed } from '../types';
import { translations } from '../data/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { PartyPopper, RotateCcw, Heart, Users, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  taskTitle: string;
  caregiverSummary?: string;
  speechSpeed: SpeechSpeed;
  isVoiceEnabled: boolean;
  onHelpWithSomethingElse: () => void;
}

export const TaskCompleted: React.FC<Props> = ({
  language,
  taskTitle,
  caregiverSummary,
  speechSpeed,
  isVoiceEnabled,
  onHelpWithSomethingElse,
}) => {
  const t = translations[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isVoiceEnabled) {
      const completionText = `${t.youDidIt}. ${t.greatJob}`;
      speakText({
        text: completionText,
        language,
        speed: speechSpeed,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
    return () => {
      stopSpeaking();
    };
  }, [isVoiceEnabled]);

  const handleReadSummary = () => {
    if (!caregiverSummary) return;
    speakText({
      text: caregiverSummary,
      language,
      speed: speechSpeed,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-[#E5E0D8] rounded-[40px] p-6 sm:p-10 shadow-sm text-center"
      >
        {/* Confetti / Celebration Icon */}
        <div className="w-24 h-24 bg-[#F0EEE9] text-[#5A5A40] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-[#E5E0D8]">
          <PartyPopper className="w-14 h-14" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3 tracking-tight">
          {t.youDidIt}
        </h1>

        <p className="text-xl sm:text-2xl text-[#6B645D] font-bold mb-6 font-serif-natural italic">
          {t.greatJob}
        </p>

        {/* Task completed badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F0EEE9] border border-[#E5E0D8] text-[#5A5A40] rounded-2xl font-bold text-base sm:text-lg mb-8">
          <CheckCircle2 className="w-5 h-5 text-[#5A5A40]" />
          <span>{taskTitle}</span>
        </div>

        {/* Optional Caregiver Session Summary */}
        {caregiverSummary && (
          <div className="bg-[#F5F2ED] border border-[#E5E0D8] rounded-2xl p-5 mb-8 text-left shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-[#2D2926] font-bold text-base">
                <Users className="w-5 h-5 text-[#5A5A40]" />
                <span>{t.sessionSummary}</span>
              </div>
              <button
                id="task-speak-summary-btn"
                onClick={handleReadSummary}
                className="p-1.5 text-[#5A5A40] hover:text-[#2D2926] bg-white border border-[#E5E0D8] rounded-lg hover:bg-[#F0EEE9] transition cursor-pointer"
                title="Read summary"
              >
                <Volume2 className="w-4 h-4 text-[#5A5A40]" />
              </button>
            </div>
            <p className="text-[#4A443F] text-base font-medium leading-relaxed">
              {caregiverSummary}
            </p>
          </div>
        )}

        {/* Big Help with Something Else Button */}
        <motion.button
          id="task-complete-home-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHelpWithSomethingElse}
          className="w-full py-5 sm:py-6 px-6 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xl sm:text-2xl rounded-3xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3 cursor-pointer border-2 border-[#5A5A40]"
        >
          <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />
          <span>{t.helpWithSomethingElse}</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
