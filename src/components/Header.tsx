import React from 'react';
import { Language, TextSize, AppView } from '../types';
import { translations } from '../data/translations';
import { Settings, Home, Globe, Volume2, Type } from 'lucide-react';

interface Props {
  language: Language;
  textSize: TextSize;
  currentView: AppView;
  onSelectLanguage: (lang: Language) => void;
  onChangeTextSize: (size: TextSize) => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<Props> = ({
  language,
  textSize,
  currentView,
  onSelectLanguage,
  onChangeTextSize,
  onOpenSettings,
  onGoHome,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E0D8] px-4 sm:px-6 py-3.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          id="header-brand-btn"
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group cursor-pointer"
          title={t.backToHome}
        >
          <div className="w-10 h-10 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-[#484833] transition">
            TS
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl text-[#2D2926] tracking-tight leading-tight">
              {language === 'ta' ? 'டெக் சஹாயக்' : 'Tech Sahayak'} <span className="text-[#8C867E] text-sm sm:text-base font-normal hidden sm:inline">| {language === 'ta' ? 'உதவியாளர்' : 'Elderly Helper'}</span>
            </div>
            <div className="text-xs text-[#8C867E] font-medium hidden sm:block">
              {language === 'ta' ? 'முதியோருக்கான எளிய தொழில்நுட்ப வழிகாட்டி' : 'Designed for your comfort & peace of mind'}
            </div>
          </div>
        </button>

        {/* Quick Accessibility & Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Home button if inside nested views */}
          {currentView !== 'home' && currentView !== 'language_select' && (
            <button
              id="header-home-btn"
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#F0EEE9] hover:bg-[#E5E0D8] text-[#5A5A40] rounded-full font-bold text-sm sm:text-base border border-[#E5E0D8] transition active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#5A5A40]" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </button>
          )}

          {/* Quick Language Toggle */}
          <button
            id="header-lang-toggle-btn"
            onClick={() => onSelectLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F0EEE9] text-[#5A5A40] rounded-full font-bold text-sm sm:text-base border-2 border-[#5A5A40] transition active:scale-95 cursor-pointer shadow-2xs"
            title={t.changeLanguage}
          >
            <Globe className="w-4 h-4 text-[#5A5A40]" />
            <span>{language === 'en' ? '🇮🇳 தமிழ்' : '🇬🇧 English'}</span>
          </button>

          {/* Quick Font Size Switcher */}
          <div className="hidden md:flex items-center bg-[#F0EEE9] border border-[#E5E0D8] rounded-xl p-0.5">
            <button
              id="header-text-normal-btn"
              onClick={() => onChangeTextSize('normal')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                textSize === 'normal'
                  ? 'bg-[#5A5A40] text-white shadow-2xs'
                  : 'text-[#6B645D] hover:text-[#2D2926]'
              }`}
              title="Normal Text Size"
            >
              A
            </button>
            <button
              id="header-text-large-btn"
              onClick={() => onChangeTextSize('large')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-bold transition ${
                textSize === 'large'
                  ? 'bg-[#5A5A40] text-white shadow-2xs'
                  : 'text-[#6B645D] hover:text-[#2D2926]'
              }`}
              title="Large Text Size"
            >
              A+
            </button>
            <button
              id="header-text-extralarge-btn"
              onClick={() => onChangeTextSize('extralarge')}
              className={`px-2.5 py-1.5 rounded-lg text-base font-extrabold transition ${
                textSize === 'extralarge'
                  ? 'bg-[#5A5A40] text-white shadow-2xs'
                  : 'text-[#6B645D] hover:text-[#2D2926]'
              }`}
              title="Extra Large Text Size"
            >
              A++
            </button>
          </div>

          {/* Settings Button */}
          <button
            id="header-settings-btn"
            onClick={onOpenSettings}
            className="p-2.5 bg-white hover:bg-[#F0EEE9] text-[#5A5A40] rounded-xl border border-[#E5E0D8] hover:border-[#5A5A40] transition active:scale-95 cursor-pointer shadow-2xs"
            title={t.settings}
          >
            <Settings className="w-5 h-5 text-[#5A5A40]" />
          </button>
        </div>
      </div>
    </header>
  );
};
