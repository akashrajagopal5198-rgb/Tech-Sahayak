import React, { useState } from 'react';
import { Language, ScamCategory, SpeechSpeed } from '../types';
import { translations } from '../data/translations';
import { scamCategories } from '../data/scamsData';
import { ScamDetailModal } from './ScamDetailModal';
import { SuspiciousCheckerModal } from './SuspiciousCheckerModal';
import { ShieldAlert, ShieldCheck, ArrowRight, Star, AlertTriangle, ArrowLeft, Lock, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  speechSpeed: SpeechSpeed;
  onBackToHome: () => void;
}

export const ScamSafetyHub: React.FC<Props> = ({
  language,
  speechSpeed,
  onBackToHome,
}) => {
  const t = translations[language];
  const [selectedScam, setSelectedScam] = useState<ScamCategory | null>(null);
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="scam-hub-back-btn"
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EEE9] hover:bg-[#E5E0D8] text-[#5A5A40] font-bold rounded-full text-base transition cursor-pointer border border-[#E5E0D8]"
        >
          <ArrowLeft className="w-5 h-5 text-[#5A5A40]" />
          <span>{t.backToHome}</span>
        </button>

        <span className="px-4 py-1.5 bg-[#E9E5DE] text-[#D98C45] border border-[#DED9D1] rounded-full font-bold text-sm flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-[#D98C45]" />
          <span>{language === 'ta' ? 'பாதுகாப்பு மையம்' : 'Safety Guide'}</span>
        </span>
      </div>

      {/* Main Title & Intro */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3 tracking-tight">
          {t.scamHubTitle}
        </h1>
        <p className="text-lg sm:text-xl text-[#6B645D] font-medium max-w-2xl mx-auto">
          {t.scamHubSubtitle}
        </p>
      </div>

      {/* Prominent Action Banner: Check a Suspicious Message */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-[#5A5A40] text-white rounded-[32px] p-6 sm:p-8 shadow-sm mb-10 border-2 border-[#E5E0D8] relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs sm:text-sm font-bold uppercase mb-2">
              <AlertTriangle className="w-4 h-4 text-[#E5E0D8]" />
              <span>{language === 'ta' ? 'உடனடி பாதுகாப்பு உதவி' : 'Instant AI Safety Check'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
              {t.checkSuspiciousMessage}
            </h2>
            <p className="text-[#E5E0D8] text-base sm:text-lg font-medium max-w-lg">
              {t.checkSuspiciousSubtitle}
            </p>
          </div>

          <button
            id="scam-hub-open-checker-btn"
            onClick={() => setIsCheckerOpen(true)}
            className="w-full sm:w-auto px-7 py-4 bg-[#D98C45] hover:bg-[#C27A38] text-white font-bold text-lg sm:text-xl rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#E5E0D8]/40"
          >
            <ShieldCheck className="w-6 h-6 text-white" />
            <span>{language === 'ta' ? 'செய்தியை சரிபார்க்க' : 'Check Now'}</span>
          </button>
        </div>
      </motion.div>

      {/* Common Scam Categories */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#2D2926] mb-6 flex items-center gap-2">
          <span>{t.commonScamsTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {scamCategories.map((scam) => {
            const title = language === 'ta' ? scam.titleTa : scam.titleEn;
            const whatIsIt = language === 'ta' ? scam.whatIsItTa : scam.whatIsItEn;

            return (
              <motion.button
                key={scam.id}
                id={`scam-card-${scam.id}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedScam(scam)}
                className="p-6 sm:p-7 bg-white hover:bg-[#F0EEE9]/70 border border-[#E5E0D8] rounded-[32px] text-left shadow-xs hover:shadow-sm transition flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="text-4xl mb-3">{scam.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2D2926] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[#6B645D] text-sm sm:text-base font-medium leading-relaxed line-clamp-3 mb-4">
                    {whatIsIt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold text-sm sm:text-base pt-3 border-t border-[#E5E0D8]">
                  <span>{t.learnMore}</span>
                  <ArrowRight className="w-4 h-4 text-[#5A5A40] group-hover:translate-x-1 transition" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Senior Citizens 3 Golden Safety Rules */}
      <div className="bg-[#E9E5DE] border border-[#DED9D1] rounded-[32px] p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[#2D2926] font-bold text-xl sm:text-2xl mb-4">
          <Star className="w-6 h-6 fill-[#D98C45] text-[#D98C45]" />
          <span>{language === 'ta' ? 'முதியோருக்கான 3 முக்கிய பாதுகாப்பு விதிகள்' : '3 Golden Safety Rules for Seniors'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-bold text-[#2D2926] text-base mb-1">
              {language === 'ta' ? '1. OTP அல்லது PIN பகிராதீர்கள்' : '1. Never Share OTP or PIN'}
            </div>
            <div className="text-[#6B645D] text-sm font-medium">
              {language === 'ta' ? 'வங்கிகள் ஒருபோதும் உங்கள் போனில் OTP கேட்காது.' : 'No bank or police officer will ever ask for your PIN or OTP over the phone.'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs">
            <div className="text-2xl mb-2">🛑</div>
            <div className="font-bold text-[#2D2926] text-base mb-1">
              {language === 'ta' ? '2. அவசரப்பட்டு பணம் அனுப்பாதீர்கள்' : '2. Never Rush Money Transfers'}
            </div>
            <div className="text-[#6B645D] text-sm font-medium">
              {language === 'ta' ? 'யாராவது அவசரப்படுத்தினால் உடனே அழைப்பைத் துண்டியுங்கள்.' : 'Scammers use fear and urgency. Hang up and check calmly.'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs">
            <div className="text-2xl mb-2">👨‍👩‍👧</div>
            <div className="font-bold text-[#2D2926] text-base mb-1">
              {language === 'ta' ? '3. குடும்பத்தினரிடம் கேளுங்கள்' : '3. Ask a Family Member'}
            </div>
            <div className="text-[#6B645D] text-sm font-medium">
              {language === 'ta' ? 'சந்தேகம் வரும்போது உங்கள் பிள்ளைகள் அல்லது நண்பரிடம் காட்டுங்கள்.' : 'When in doubt, show the message to your children or trusted relatives.'}
            </div>
          </div>
        </div>
      </div>

      {/* Scam Detail Modal */}
      {selectedScam && (
        <ScamDetailModal
          scam={selectedScam}
          language={language}
          speechSpeed={speechSpeed}
          onClose={() => setSelectedScam(null)}
        />
      )}

      {/* Suspicious Checker Modal */}
      {isCheckerOpen && (
        <SuspiciousCheckerModal
          language={language}
          speechSpeed={speechSpeed}
          onClose={() => setIsCheckerOpen(false)}
        />
      )}
    </div>
  );
};
