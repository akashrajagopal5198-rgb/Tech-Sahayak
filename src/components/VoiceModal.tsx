import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { startSpeechRecognition, stopSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speech';
import { Mic, MicOff, RotateCcw, Check, X, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  onConfirmQuery: (query: string) => void;
  onClose: () => void;
}

export const VoiceModal: React.FC<Props> = ({ language, onConfirmQuery, onClose }) => {
  const t = translations[language];
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSupport, setHasSupport] = useState(true);

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      setHasSupport(false);
      setErrorMessage(t.speechNotSupported);
      setIsListening(false);
      return;
    }

    const cleanup = startSpeechRecognition({
      language,
      onResult: (text, isFinal) => {
        setTranscript(text);
      },
      onError: (msg) => {
        setErrorMessage(msg);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    return () => {
      cleanup();
      stopSpeechRecognition();
    };
  }, [language]);

  const handleRetry = () => {
    setErrorMessage(null);
    setTranscript('');
    setIsListening(true);
    startSpeechRecognition({
      language,
      onResult: (text) => setTranscript(text),
      onError: (msg) => {
        setErrorMessage(msg);
        setIsListening(false);
      },
      onEnd: () => setIsListening(false),
    });
  };

  const handleConfirm = () => {
    if (transcript.trim()) {
      stopSpeechRecognition();
      onConfirmQuery(transcript.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2926]/70 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#F5F2ED] border border-[#E5E0D8] rounded-[40px] p-6 sm:p-10 shadow-2xl relative text-center"
      >
        {/* Close Button */}
        <button
          id="voice-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 text-[#6B645D] hover:text-[#2D2926] bg-[#E5E0D8] hover:bg-[#DED9D1] rounded-full transition cursor-pointer"
          title={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Listening Animation Indicator */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute w-32 h-32 rounded-full bg-[#5A5A40]/30"
              />
            )}
            <div className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition ${
              isListening ? 'bg-[#5A5A40] text-white' : 'bg-[#E5E0D8] text-[#5A5A40]'
            }`}>
              {isListening ? (
                <Mic className="w-12 h-12 animate-pulse" />
              ) : (
                <MicOff className="w-12 h-12" />
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2926] mt-4 mb-1">
            {isListening ? t.listening : (transcript ? t.recognizedText : 'Ready')}
          </h2>

          <p className="text-[#6B645D] text-base sm:text-lg font-medium">
            {isListening ? t.listeningHint : (errorMessage || '')}
          </p>
        </div>

        {/* Error / Fallback display */}
        {errorMessage && (
          <div className="p-4 bg-white border border-[#D98C45] text-[#D98C45] rounded-2xl mb-6 text-base font-semibold flex items-center gap-3 text-left">
            <AlertCircle className="w-6 h-6 shrink-0 text-[#D98C45]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Transcript Box */}
        <div className="bg-white border border-[#E5E0D8] rounded-3xl p-6 mb-6 min-h-28 flex items-center justify-center text-center shadow-inner">
          {transcript ? (
            <p className="text-2xl sm:text-3xl font-bold text-[#2D2926] leading-snug">
              “{transcript}”
            </p>
          ) : (
            <p className="text-[#8C867E] text-lg italic font-serif-natural">
              {isListening ? (language === 'ta' ? 'நீங்கள் பேசுவது இங்கே தெரியும்...' : 'Your words will appear here...') : (language === 'ta' ? 'பேச மீண்டும் தொடங்கவும்' : 'Tap Try Again to speak')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {transcript ? (
            <button
              id="voice-confirm-btn"
              onClick={handleConfirm}
              className="w-full py-4 px-6 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xl rounded-2xl shadow-md transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-6 h-6" />
              <span>{t.askThisQuestion}</span>
            </button>
          ) : null}

          <button
            id="voice-retry-btn"
            onClick={handleRetry}
            className={`w-full py-4 px-6 bg-[#E5E0D8] hover:bg-[#DED9D1] text-[#2D2926] font-bold text-xl rounded-2xl shadow-xs transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${
              !transcript ? 'sm:col-span-2' : ''
            }`}
          >
            <RotateCcw className="w-6 h-6 text-[#5A5A40]" />
            <span>{t.tryAgain}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
