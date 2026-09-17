import React from 'react';
import { Language, DeviceType } from '../types';
import { translations } from '../data/translations';
import { Smartphone, Apple, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  onSelectDevice: (device: DeviceType) => void;
}

export const DeviceSelector: React.FC<Props> = ({ language, onSelectDevice }) => {
  const t = translations[language];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E5E0D8] rounded-[40px] p-6 sm:p-10 shadow-sm text-center"
      >
        <div className="w-16 h-16 bg-[#F0EEE9] text-[#5A5A40] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#E5E0D8]">
          <Smartphone className="w-9 h-9" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2926] mb-2">
          {t.whichPhone}
        </h2>
        <p className="text-[#6B645D] text-base sm:text-lg mb-8 font-medium">
          {language === 'ta'
            ? 'உங்கள் போனுக்கு ஏற்ற சரியான வழிகாட்டலைத் தர இது உதவும்.'
            : 'This helps us give you the right instructions for your screen.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Android Option */}
          <button
            id="device-select-android-btn"
            onClick={() => onSelectDevice('android')}
            className="flex flex-col items-center justify-center p-6 bg-[#F5F2ED] hover:bg-[#E9E5DE] border-2 border-[#5A5A40] rounded-3xl transition active:scale-98 text-center cursor-pointer group shadow-xs"
          >
            <div className="text-4xl mb-2">📱</div>
            <div className="text-xl sm:text-2xl font-bold text-[#2D2926]">
              {t.androidPhone}
            </div>
            <div className="text-xs sm:text-sm text-[#6B645D] font-medium mt-1">
              Samsung, Vivo, Oppo, Redmi, Realme, OnePlus
            </div>
          </button>

          {/* iPhone Option */}
          <button
            id="device-select-iphone-btn"
            onClick={() => onSelectDevice('iphone')}
            className="flex flex-col items-center justify-center p-6 bg-[#F5F2ED] hover:bg-[#E9E5DE] border-2 border-[#5A5A40] rounded-3xl transition active:scale-98 text-center cursor-pointer group shadow-xs"
          >
            <div className="text-4xl mb-2">🍎</div>
            <div className="text-xl sm:text-2xl font-bold text-[#2D2926]">
              {t.iphone}
            </div>
            <div className="text-xs sm:text-sm text-[#6B645D] font-medium mt-1">
              Apple iPhone
            </div>
          </button>
        </div>

        {/* Android Disclaimer Note */}
        <div className="p-4 bg-[#F0EEE9] border border-[#E5E0D8] rounded-2xl flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#5A5A40] font-medium leading-relaxed">
            {t.androidDisclaimer}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
