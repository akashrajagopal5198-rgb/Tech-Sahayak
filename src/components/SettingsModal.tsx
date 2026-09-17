import React from 'react';
import { Language, TextSize, SpeechSpeed, DeviceType } from '../types';
import { translations } from '../data/translations';
import { X, Globe, Type, Volume2, Gauge, Smartphone, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  textSize: TextSize;
  speechSpeed: SpeechSpeed;
  isVoiceEnabled: boolean;
  device: DeviceType;
  onSelectLanguage: (lang: Language) => void;
  onChangeTextSize: (size: TextSize) => void;
  onChangeSpeechSpeed: (speed: SpeechSpeed) => void;
  onToggleVoice: (enabled: boolean) => void;
  onChangeDevice: (dev: DeviceType) => void;
  onResetSession: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  language,
  textSize,
  speechSpeed,
  isVoiceEnabled,
  device,
  onSelectLanguage,
  onChangeTextSize,
  onChangeSpeechSpeed,
  onToggleVoice,
  onChangeDevice,
  onResetSession,
  onClose,
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2D2926]/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-[#F5F2ED] border border-[#E5E0D8] rounded-[40px] p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-6">
          <h2 className="text-2xl font-bold text-[#2D2926] flex items-center gap-2">
            <span>⚙️ {t.settings}</span>
          </h2>
          <button
            id="settings-modal-close-btn"
            onClick={onClose}
            className="p-2.5 text-[#6B645D] hover:text-[#2D2926] bg-[#E5E0D8] hover:bg-[#DED9D1] rounded-full transition cursor-pointer"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 1. Language Preference */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-5 shadow-xs">
            <label className="block text-base font-bold text-[#2D2926] mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#5A5A40]" />
              <span>{t.language} / மொழி</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="settings-lang-en-btn"
                type="button"
                onClick={() => onSelectLanguage('en')}
                className={`py-3 px-4 rounded-2xl font-bold text-base transition border-2 cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E9E5DE] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                id="settings-lang-ta-btn"
                type="button"
                onClick={() => onSelectLanguage('ta')}
                className={`py-3 px-4 rounded-2xl font-bold text-base transition border-2 cursor-pointer ${
                  language === 'ta'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E9E5DE] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                🇮🇳 தமிழ்
              </button>
            </div>
          </div>

          {/* 2. Text Size */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-5 shadow-xs">
            <label className="block text-base font-bold text-[#2D2926] mb-3 flex items-center gap-2">
              <Type className="w-5 h-5 text-[#5A5A40]" />
              <span>{t.textSize}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="settings-text-normal-btn"
                type="button"
                onClick={() => onChangeTextSize('normal')}
                className={`py-3 rounded-2xl font-bold text-sm transition border-2 cursor-pointer ${
                  textSize === 'normal'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E9E5DE] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                {t.textNormal} (A)
              </button>
              <button
                id="settings-text-large-btn"
                type="button"
                onClick={() => onChangeTextSize('large')}
                className={`py-3 rounded-2xl font-bold text-base transition border-2 cursor-pointer ${
                  textSize === 'large'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E9E5DE] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                {t.textLarge} (A+)
              </button>
              <button
                id="settings-text-extralarge-btn"
                type="button"
                onClick={() => onChangeTextSize('extralarge')}
                className={`py-3 rounded-2xl font-bold text-lg transition border-2 cursor-pointer ${
                  textSize === 'extralarge'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E9E5DE] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                {t.textExtraLarge} (A++)
              </button>
            </div>
          </div>

          {/* 3. Voice Guidance & Speed */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-5 shadow-xs">
            <label className="block text-base font-bold text-[#2D2926] mb-3 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#5A5A40]" />
              <span>{t.voiceGuidance}</span>
            </label>

            {/* Enable/Disable Auto-voice */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E0D8]">
              <span className="text-[#4A443F] font-bold text-base">
                {language === 'ta' ? 'தானாக குரலில் படிக்க' : 'Auto Read Steps Aloud'}
              </span>
              <button
                id="settings-toggle-voice-btn"
                type="button"
                onClick={() => onToggleVoice(!isVoiceEnabled)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${
                  isVoiceEnabled
                    ? 'bg-[#5A5A40] text-white'
                    : 'bg-[#E5E0D8] text-[#6B645D]'
                }`}
              >
                {isVoiceEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Voice Speed */}
            <label className="block text-sm font-bold text-[#6B645D] mb-2">
              {t.speechSpeed}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="settings-speed-normal-btn"
                type="button"
                onClick={() => onChangeSpeechSpeed('normal')}
                className={`py-2.5 px-3 rounded-2xl font-bold text-sm transition border-2 cursor-pointer ${
                  speechSpeed === 'normal'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F5F2ED] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                {t.speechNormal}
              </button>
              <button
                id="settings-speed-slow-btn"
                type="button"
                onClick={() => onChangeSpeechSpeed('slow')}
                className={`py-2.5 px-3 rounded-2xl font-bold text-sm transition border-2 cursor-pointer ${
                  speechSpeed === 'slow'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F5F2ED] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                🐢 {t.speechSlow}
              </button>
            </div>
          </div>

          {/* 4. Phone Type Selection */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-5 shadow-xs">
            <label className="block text-base font-bold text-[#2D2926] mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#5A5A40]" />
              <span>{t.deviceType}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="settings-device-android-btn"
                type="button"
                onClick={() => onChangeDevice('android')}
                className={`py-3 px-4 rounded-2xl font-bold text-base transition border-2 cursor-pointer ${
                  device === 'android'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F5F2ED] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                📱 Android
              </button>
              <button
                id="settings-device-iphone-btn"
                type="button"
                onClick={() => onChangeDevice('iphone')}
                className={`py-3 px-4 rounded-2xl font-bold text-base transition border-2 cursor-pointer ${
                  device === 'iphone'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F5F2ED] text-[#2D2926] border-[#E5E0D8]'
                }`}
              >
                🍎 iPhone
              </button>
            </div>
          </div>

          {/* Reset / Start Fresh button */}
          <button
            id="settings-reset-session-btn"
            type="button"
            onClick={onResetSession}
            className="w-full py-3.5 bg-[#E5E0D8] hover:bg-[#DED9D1] text-[#2D2926] font-bold rounded-2xl border border-[#DED9D1] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-[#5A5A40]" />
            <span>{language === 'ta' ? 'அனைத்தையும் புதிதாகத் தொடங்க' : 'Reset Everything & Start Fresh'}</span>
          </button>

          {/* About & Philosophy Note */}
          <div className="p-4 bg-[#F0EEE9] border border-[#E5E0D8] rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[#5A5A40] font-bold text-sm mb-1">
              <Heart className="w-4 h-4 fill-[#5A5A40] text-[#5A5A40]" />
              <span>Tech Sahayak</span>
            </div>
            <p className="text-[#6B645D] text-xs sm:text-sm font-medium italic font-serif-natural">
              “Technology should adapt to people, not people struggle to adapt to technology.”
            </p>
          </div>
        </div>

        {/* Done Button */}
        <button
          id="settings-done-btn"
          onClick={onClose}
          className="w-full mt-6 py-4 bg-[#2D2926] hover:bg-black text-white font-bold text-lg rounded-2xl transition cursor-pointer"
        >
          {t.close}
        </button>
      </motion.div>
    </div>
  );
};
