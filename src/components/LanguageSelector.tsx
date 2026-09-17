import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake } from 'lucide-react';

interface Props {
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ onSelectLanguage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F5F2ED]">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white border border-[#E5E0D8] rounded-[40px] p-6 sm:p-10 shadow-sm text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F0EEE9] text-[#5A5A40] rounded-3xl mb-6 shadow-inner border border-[#E5E0D8]">
          <HeartHandshake className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3 tracking-tight">
          Tech Sahayak 👋
        </h1>

        <p className="text-xl sm:text-2xl text-[#6B645D] mb-8 font-medium">
          Which language would you like to use?
          <span className="block text-lg sm:text-xl text-[#8C867E] mt-1 font-tamil">
            நீங்கள் எந்த மொழியில் பயன்படுத்த விரும்புகிறீர்கள்?
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <button
            id="lang-select-en-btn"
            onClick={() => onSelectLanguage('en')}
            className="group relative flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F5F2ED] hover:bg-[#E9E5DE] border-2 border-[#5A5A40] rounded-3xl transition-all duration-200 active:scale-[0.98] shadow-xs text-center cursor-pointer"
          >
            <span className="text-4xl mb-3">🇬🇧</span>
            <span className="text-2xl font-bold text-[#2D2926]">English</span>
            <span className="text-sm font-medium text-[#6B645D] mt-1">Simple English</span>
          </button>

          <button
            id="lang-select-ta-btn"
            onClick={() => onSelectLanguage('ta')}
            className="group relative flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F5F2ED] hover:bg-[#E9E5DE] border-2 border-[#5A5A40] rounded-3xl transition-all duration-200 active:scale-[0.98] shadow-xs text-center cursor-pointer font-tamil"
          >
            <span className="text-4xl mb-3">🇮🇳</span>
            <span className="text-2xl font-bold text-[#2D2926]">தமிழ்</span>
            <span className="text-sm font-medium text-[#6B645D] mt-1">எளிய தமிழ்</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[#8C867E] text-sm sm:text-base font-medium">
          <Sparkles className="w-5 h-5 text-[#5A5A40]" />
          <span>Patient step-by-step smartphone guidance</span>
        </div>
      </motion.div>
    </div>
  );
};
