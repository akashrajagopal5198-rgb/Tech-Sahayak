import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Mic, Keyboard, Smartphone, ShieldAlert, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  onStartVoice: () => void;
  onSubmitQuery: (query: string) => void;
  onOpenPhoneHelp: () => void;
  onOpenScamSafety: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  language,
  onStartVoice,
  onSubmitQuery,
  onOpenPhoneHelp,
  onOpenScamSafety,
}) => {
  const t = translations[language];
  const [typedText, setTypedText] = useState('');
  const [showTypeBox, setShowTypeBox] = useState(false);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedText.trim()) {
      onSubmitQuery(typedText.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Primary Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0EEE9] text-[#5A5A40] font-bold text-sm sm:text-base mb-3 border border-[#E5E0D8]">
          <Sparkles className="w-4 h-4 text-[#5A5A40]" />
          <span>{t.tagline}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D2926] tracking-tight">
          {t.howCanIHelp}
        </h1>
      </motion.div>

      {/* Main Dominant Element: GIANT Microphone Button */}
      <div className="flex flex-col items-center justify-center mb-10">
        <motion.button
          id="home-giant-mic-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartVoice}
          className="w-full max-w-md py-8 sm:py-10 px-6 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-[36px] shadow-lg hover:shadow-xl border-4 border-[#E5E0D8] transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 rounded-full flex items-center justify-center shadow-inner group-hover:scale-105 transition">
            <Mic className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
          </div>

          <div className="text-2xl sm:text-3xl font-black tracking-wide uppercase">
            {t.tapToSpeak}
          </div>

          <div className="text-[#E5E0D8] font-medium text-sm sm:text-base">
            {language === 'ta' ? 'குரல் மூலம் எளிதாக கேளுங்கள்' : 'Just say what you need help with'}
          </div>
        </motion.button>

        {/* Type Alternative Toggle */}
        {!showTypeBox ? (
          <button
            id="home-toggle-type-btn"
            onClick={() => setShowTypeBox(true)}
            className="mt-4 flex items-center gap-2 px-4 py-2.5 text-[#6B645D] hover:text-[#2D2926] hover:bg-[#E5E0D8]/60 rounded-full font-bold text-base transition cursor-pointer"
          >
            <Keyboard className="w-5 h-5 text-[#8C867E]" />
            <span>{t.typeQuestion}</span>
          </button>
        ) : (
          <form onSubmit={handleTextSubmit} className="w-full max-w-md mt-4">
            <div className="flex flex-col gap-2 bg-white p-3.5 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <input
                id="home-typed-input"
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder={t.typePlaceholder}
                className="w-full px-3 py-2 text-lg text-[#2D2926] placeholder:text-[#8C867E] focus:outline-none font-medium"
                autoFocus
              />
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setShowTypeBox(false)}
                  className="text-[#8C867E] hover:text-[#2D2926] text-sm font-medium px-2 py-1"
                >
                  {t.close}
                </button>
                <button
                  id="home-submit-typed-btn"
                  type="submit"
                  disabled={!typedText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] disabled:opacity-50 text-white font-bold rounded-xl text-base transition cursor-pointer"
                >
                  <span>{t.askButton}</span>
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Two Major Pathways: Phone Help & Scam Safety */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
        {/* Phone Help Card */}
        <motion.button
          id="home-phone-help-btn"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenPhoneHelp}
          className="flex flex-col items-start p-6 sm:p-7 bg-white hover:bg-[#F0EEE9]/80 border border-[#E5E0D8] rounded-[32px] text-left shadow-xs hover:shadow-sm transition group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F0EEE9] text-[#5A5A40] flex items-center justify-center mb-4 group-hover:scale-105 transition">
            <Smartphone className="w-7 h-7" />
          </div>

          <div className="text-xl sm:text-2xl font-bold text-[#2D2926] mb-1 flex items-center justify-between w-full">
            <span>{t.phoneHelp}</span>
            <ArrowRight className="w-5 h-5 text-[#5A5A40] group-hover:translate-x-1 transition" />
          </div>

          <div className="text-[#6B645D] text-sm sm:text-base leading-relaxed font-medium">
            {t.phoneHelpDesc}
          </div>
        </motion.button>

        {/* Scam Safety Card */}
        <motion.button
          id="home-scam-safety-btn"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenScamSafety}
          className="flex flex-col items-start p-6 sm:p-7 bg-[#E9E5DE] hover:bg-[#E0DBD2] border border-[#DED9D1] rounded-[32px] text-left shadow-xs hover:shadow-sm transition group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-[#D98C45] flex items-center justify-center mb-4 group-hover:scale-105 transition shadow-2xs">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="text-xl sm:text-2xl font-bold text-[#2D2926] mb-1 flex items-center justify-between w-full">
            <span>{t.scamSafety}</span>
            <ArrowRight className="w-5 h-5 text-[#D98C45] group-hover:translate-x-1 transition" />
          </div>

          <div className="text-[#6B645D] text-sm sm:text-base leading-relaxed font-medium">
            {t.scamSafetyDesc}
          </div>
        </motion.button>
      </div>

      {/* Example Questions / Common Tasks */}
      <div className="bg-white border border-[#E5E0D8] rounded-[32px] p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-[#2D2926] mb-4 flex items-center gap-2">
          <span>{t.popularQuestions}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.exampleQuestions.map((question, idx) => (
            <button
              key={idx}
              id={`example-question-btn-${idx}`}
              onClick={() => onSubmitQuery(question)}
              className="p-3.5 sm:p-4 text-left bg-[#F5F2ED] hover:bg-[#E9E5DE] border border-[#E5E0D8] rounded-2xl text-[#2D2926] font-semibold text-sm sm:text-base transition active:scale-98 flex items-start gap-3 cursor-pointer"
            >
              <span className="text-[#5A5A40] font-black mt-0.5">•</span>
              <span className="leading-snug">{question}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
