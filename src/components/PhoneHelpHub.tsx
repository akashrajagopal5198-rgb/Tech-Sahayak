import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Smartphone, Image, Wifi, Bluetooth, Camera, Type, Phone, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  onSelectTask: (taskQuery: string) => void;
  onBackToHome: () => void;
}

export const PhoneHelpHub: React.FC<Props> = ({
  language,
  onSelectTask,
  onBackToHome,
}) => {
  const t = translations[language];

  const commonPhoneTopics = [
    {
      id: 'photo',
      icon: <Image className="w-8 h-8 text-emerald-700" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 hover:border-emerald-400',
      titleEn: 'How to Send a Photo on WhatsApp',
      titleTa: 'வாட்ஸ்அப்பில் புகைப்படம் அனுப்புவது எப்படி',
      descEn: 'Send photos of family or medicines to your loved ones',
      descTa: 'குடும்பத்தினர் அல்லது நண்பர்களுக்கு புகைப்படங்களை பகிரலாம்',
    },
    {
      id: 'wifi',
      icon: <Wifi className="w-8 h-8 text-blue-700" />,
      bg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 hover:border-blue-400',
      titleEn: 'Connect to Wi-Fi at Home',
      titleTa: 'வீட்டு வைஃபை (Wi-Fi) இணைப்பது எப்படி',
      descEn: 'Connect your smartphone to your home wireless internet',
      descTa: 'உங்கள் போனை வீட்டு வைஃபை இண்டர்நெட்டுடன் இணைக்கலாம்',
    },
    {
      id: 'bluetooth',
      icon: <Bluetooth className="w-8 h-8 text-indigo-700" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 hover:border-indigo-400',
      titleEn: 'Connect Bluetooth Earphones or Speaker',
      titleTa: 'புளூடூத் இயர்போன் இணைப்பது எப்படி',
      descEn: 'Pair your wireless headphones, earbuds, or hearing aid',
      descTa: 'வயர்லெஸ் இயர்போன் அல்லது ஸ்பீக்கரை இணைக்கலாம்',
    },
    {
      id: 'screenshot',
      icon: <Camera className="w-8 h-8 text-amber-700" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 hover:border-amber-400',
      titleEn: 'How to Take a Screenshot (Photo of Screen)',
      titleTa: 'திரையை புகைப்படம் (Screenshot) எடுப்பது எப்படி',
      descEn: 'Capture receipt, ticket, or phone screen in a snap',
      descTa: 'ரசீது அல்லது தேவையான தகவலை சேமிக்க படம் எடுக்கலாம்',
    },
    {
      id: 'fontsize',
      icon: <Type className="w-8 h-8 text-purple-700" />,
      bg: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 hover:border-purple-400',
      titleEn: 'Make Letters and Text Bigger on Phone',
      titleTa: 'போனில் எழுத்துக்களை பெரிதாக்குவது எப்படி',
      descEn: 'Increase text size so everything is easy to read',
      descTa: 'போன் எழுத்துக்கள் தெளிவாக தெரிய பெரிதாக்கலாம்',
    },
    {
      id: 'videocall',
      icon: <Phone className="w-8 h-8 text-teal-700" />,
      bg: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200 hover:border-teal-400',
      titleEn: 'How to Make a WhatsApp Video Call',
      titleTa: 'வாட்ஸ்அப் வீடியோ கால் செய்வது எப்படி',
      descEn: 'See and speak to your children or grandchildren clearly',
      descTa: 'பிள்ளைகள் மற்றும் பேரக்குழந்தைகளுடன் முகம் பார்த்து பேசலாம்',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="phone-hub-back-btn"
          onClick={onBackToHome}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EEE9] hover:bg-[#E5E0D8] text-[#5A5A40] font-bold rounded-full text-base transition cursor-pointer border border-[#E5E0D8]"
        >
          <ArrowLeft className="w-5 h-5 text-[#5A5A40]" />
          <span>{t.backToHome}</span>
        </button>

        <span className="px-4 py-1.5 bg-[#F0EEE9] text-[#5A5A40] border border-[#E5E0D8] rounded-full font-bold text-sm flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-[#5A5A40]" />
          <span>{language === 'ta' ? 'ஸ்மார்ட்போன் வழிகாட்டி' : 'Smartphone Guides'}</span>
        </span>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2926] mb-3 tracking-tight">
          {t.phoneHelp}
        </h1>
        <p className="text-lg sm:text-xl text-[#6B645D] font-medium max-w-2xl mx-auto">
          {language === 'ta'
            ? 'நீங்கள் செய்ய விரும்பும் செயலைத் தேர்ந்தெடுங்கள், நாம் ஒன்றாகச் செய்வோம்.'
            : 'Select the smartphone task you would like to do, and we will guide you one step at a time.'}
        </p>
      </div>

      {/* Grid of Phone Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {commonPhoneTopics.map((topic) => {
          const title = language === 'ta' ? topic.titleTa : topic.titleEn;
          const desc = language === 'ta' ? topic.descTa : topic.descEn;

          return (
            <motion.button
              key={topic.id}
              id={`phone-topic-btn-${topic.id}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTask(title)}
              className="p-6 sm:p-7 bg-white hover:bg-[#F0EEE9]/70 border border-[#E5E0D8] rounded-[32px] text-left shadow-xs hover:shadow-sm transition flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="p-3.5 bg-[#F0EEE9] text-[#5A5A40] rounded-2xl w-fit mb-4 shadow-2xs group-hover:scale-105 transition">
                  {topic.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D2926] mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-[#6B645D] text-sm sm:text-base font-medium leading-relaxed mb-4">
                  {desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-sm sm:text-base pt-3 border-t border-[#E5E0D8]">
                <span>{language === 'ta' ? 'வழிகாட்டலைத் தொடங்க' : 'Start Step-by-Step Guide'}</span>
                <ArrowRight className="w-4 h-4 text-[#5A5A40] group-hover:translate-x-1 transition" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
