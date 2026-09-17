import React, { useState } from 'react';
import { Language, ScamAnalysisResult, SpeechSpeed } from '../types';
import { translations } from '../data/translations';
import { startSpeechRecognition, stopSpeechRecognition, isSpeechRecognitionSupported, speakText, stopSpeaking } from '../utils/speech';
import { ShieldAlert, Mic, MicOff, Send, X, AlertTriangle, ShieldCheck, Star, RotateCcw, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  language: Language;
  speechSpeed: SpeechSpeed;
  onClose: () => void;
}

export const SuspiciousCheckerModal: React.FC<Props> = ({
  language,
  speechSpeed,
  onClose,
}) => {
  const t = translations[language];
  const [messageInput, setMessageInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleVoice = () => {
    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setErrorMessage(t.speechNotSupported);
      return;
    }

    setErrorMessage(null);
    setIsListening(true);
    startSpeechRecognition({
      language,
      onResult: (text) => {
        setMessageInput(text);
      },
      onError: (msg) => {
        setErrorMessage(msg);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });
  };

  const handleAnalyze = async () => {
    if (!messageInput.trim()) return;
    stopSpeechRecognition();
    setIsListening(false);
    setIsAnalyzing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch('/api/scam/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageText: messageInput.trim(), language }),
      });

      const data = await res.json();
      if (data && data.success) {
        setResult(data);
      } else {
        setErrorMessage(t.errorTryAgain);
      }
    } catch (err) {
      console.error('Error analyzing message:', err);
      // Fallback
      setResult({
        riskLevel: 'suspicious',
        categoryEn: '⚠️ Possible Banking or Digital Fraud Message',
        categoryTa: '⚠️ சாத்தியமான வங்கி அல்லது டிஜிட்டல் மோசடி செய்தி',
        assessmentEn: 'This message has warning signs commonly associated with digital scams. Legitimate banks and organizations never ask for OTP or urgent money transfers.',
        assessmentTa: 'இந்த செய்தியில் டிஜிட்டல் மோசடிகளில் காணப்படும் எச்சரிக்கை அறிகுறிகள் உள்ளன. வங்கிகள் ஒருபோதும் OTP அல்லது அவசர பணப் பரிமாற்றம் கேட்காது.',
        warningSignsEn: [
          'Urgent demand for money, OTP, or PIN',
          'Threat of account closure, electricity cut, or arrest',
          'Asking to click unknown web links or download apps'
        ],
        warningSignsTa: [
          'உடனடி பணம், OTP அல்லது PIN கோருவது',
          'கணக்கு முடக்கம் அல்லது சேவை துண்டிப்பு மிரட்டல்',
          'தெரியாத இணைப்புகளை கிளிக் செய்ய அல்லது ஆப் ஏற்றச் சொல்வது'
        ],
        safeActionsEn: [
          'Do NOT click any link or send money',
          'Do NOT share your OTP, UPI PIN, or ATM PIN',
          'Call your bank or local office using their official number'
        ],
        safeActionsTa: [
          'எந்த இணைப்பையும் கிளிக் செய்யாதீர்கள், பணம் அனுப்பாதீர்கள்',
          'உங்கள் OTP அல்லது PIN எண்களை பகிராதீர்கள்',
          'வங்கி பாஸ்புக்கில் உள்ள உண்மையான வாடிக்கையாளர் சேவை எண்ணை அழைக்கவும்'
        ],
        goldenAdviceEn: 'When in doubt, show this message to a family member or visit your local branch in person.',
        goldenAdviceTa: 'சந்தேகம் இருந்தால் குடும்பத்தினரிடம் காட்டுங்கள் அல்லது நேரில் சென்று விசாரியுங்கள்.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReadResult = () => {
    if (!result) return;
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const category = language === 'ta' ? result.categoryTa : result.categoryEn;
    const assessment = language === 'ta' ? result.assessmentTa : result.assessmentEn;
    const advice = language === 'ta' ? result.goldenAdviceTa : result.goldenAdviceEn;

    const fullNarration = `${category}. ${assessment}. ${advice}`;
    speakText({
      text: fullNarration,
      language,
      speed: speechSpeed,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleReset = () => {
    setMessageInput('');
    setResult(null);
    setErrorMessage(null);
    stopSpeaking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2D2926]/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#F5F2ED] border border-[#E5E0D8] rounded-[40px] p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E0D8] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0EEE9] text-[#5A5A40] border border-[#E5E0D8] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D2926] leading-tight">
                {t.checkSuspiciousMessage}
              </h2>
            </div>
          </div>

          <button
            id="checker-close-btn"
            onClick={onClose}
            className="p-2.5 text-[#6B645D] hover:text-[#2D2926] bg-[#E5E0D8] hover:bg-[#DED9D1] rounded-full transition cursor-pointer"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-[#6B645D] text-base sm:text-lg font-medium mb-6">
          {t.checkSuspiciousSubtitle}
        </p>

        {/* Input Area (if not showing result) */}
        {!result && (
          <div className="space-y-4 mb-6">
            <div className="relative">
              <label className="block text-[#2D2926] font-bold text-base mb-2">
                {t.tellAboutMessage}
              </label>

              <textarea
                id="checker-message-input"
                rows={4}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={t.describeMessagePlaceholder}
                className="w-full p-4 text-lg bg-white border border-[#E5E0D8] focus:border-[#5A5A40] rounded-2xl outline-none text-[#2D2926] placeholder:text-[#8C867E] font-medium"
              />

              {/* Voice button within input */}
              <div className="mt-2 flex items-center justify-between">
                <button
                  id="checker-mic-toggle-btn"
                  type="button"
                  onClick={handleToggleVoice}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    isListening
                      ? 'bg-[#D98C45] text-white animate-pulse'
                      : 'bg-[#F0EEE9] hover:bg-[#E5E0D8] text-[#5A5A40] border border-[#E5E0D8]'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#5A5A40]" />}
                  <span>{isListening ? t.stopListening : (language === 'ta' ? '🎤 குரல் மூலம் சொல்லுங்கள்' : '🎤 Speak Message')}</span>
                </button>

                <span className="text-xs sm:text-sm text-[#8C867E] font-medium">
                  {messageInput ? `${messageInput.length} chars` : ''}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-white border border-[#D98C45] text-[#D98C45] rounded-xl text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#D98C45] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Demo Pre-fill for demonstration */}
            <div className="pt-2">
              <div className="text-xs font-bold text-[#8C867E] uppercase tracking-wider mb-2">
                {language === 'ta' ? 'உதாரண செய்தியைப் பாருங்கள்:' : 'Example suspicious message:'}
              </div>
              <button
                id="checker-example-prefill-btn"
                type="button"
                onClick={() => setMessageInput(
                  language === 'ta'
                    ? 'மின்சார கட்டணம் செலுத்தவில்லை என்று கூறி இன்றிரவு மின்சாரம் துண்டிக்கப்படும் என்று OTP கேட்டார்கள்.'
                    : 'Someone sent a message saying my bank account will be blocked unless I give them my OTP.'
                )}
                className="w-full p-3 bg-white hover:bg-[#F0EEE9] border border-[#E5E0D8] rounded-xl text-[#2D2926] text-xs sm:text-sm text-left font-medium transition cursor-pointer"
              >
                “{language === 'ta' ? 'மின்சார கட்டணம் செலுத்தவில்லை, OTP தாருங்கள்...' : 'Someone sent a message saying my bank account will be blocked unless I give them my OTP.'}”
              </button>
            </div>

            {/* Check Button */}
            <motion.button
              id="checker-submit-btn"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isAnalyzing || !messageInput.trim()}
              onClick={handleAnalyze}
              className="w-full py-5 bg-[#5A5A40] hover:bg-[#484833] disabled:opacity-50 text-white font-bold text-xl rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{t.analyzingSafety}</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-6 h-6" />
                  <span>{t.checkSafetyButton}</span>
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-5">
            {/* Audio Read Result Button */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <button
                id="checker-speak-result-btn"
                onClick={handleReadResult}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#5A5A40] text-white'
                    : 'bg-[#E5E0D8] hover:bg-[#DED9D1] text-[#2D2926]'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#5A5A40]" />}
                <span>{isSpeaking ? 'Stop Voice' : t.listen}</span>
              </button>

              <button
                id="checker-check-another-btn"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[#5A5A40] hover:text-[#2D2926] font-bold text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'ta' ? 'மற்றொரு செய்தியைப் பார்க்க' : 'Check Another'}</span>
              </button>
            </div>

            {/* Cautious Assessment Classification */}
            <div className="p-5 bg-white border border-[#E5E0D8] rounded-3xl shadow-xs">
              <div className="text-xs font-bold text-[#D98C45] uppercase tracking-wider mb-1">
                {t.safetyAssessment}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#2D2926] mb-2">
                {language === 'ta' ? result.categoryTa : result.categoryEn}
              </div>
              <p className="text-[#4A443F] text-base sm:text-lg font-medium leading-relaxed">
                {language === 'ta' ? result.assessmentTa : result.assessmentEn}
              </p>
            </div>

            {/* Warning Signs */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2D2926] mb-2.5 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#D98C45]" />
                <span>{t.warningSigns}</span>
              </h3>
              <ul className="space-y-2">
                {(language === 'ta' ? result.warningSignsTa : result.warningSignsEn).map((sign, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#4A443F] text-sm sm:text-base font-medium flex items-start gap-2.5"
                  >
                    <span className="text-[#D98C45] font-black">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Safe Actions */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2D2926] mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />
                <span>{t.howToStaySafe}</span>
              </h3>
              <ul className="space-y-2">
                {(language === 'ta' ? result.safeActionsTa : result.safeActionsEn).map((action, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#4A443F] text-sm sm:text-base font-medium flex items-start gap-2.5"
                  >
                    <span className="text-[#5A5A40] font-black">✓</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Golden Advice */}
            <div className="p-4 bg-[#F0EEE9] border border-[#E5E0D8] rounded-2xl text-[#2D2926] font-bold text-base flex items-start gap-3">
              <Star className="w-5 h-5 text-[#5A5A40] fill-[#5A5A40] shrink-0 mt-0.5" />
              <span className="font-serif-natural">{language === 'ta' ? result.goldenAdviceTa : result.goldenAdviceEn}</span>
            </div>

            {/* Cautious Note */}
            <p className="text-xs text-[#8C867E] italic text-center px-4 font-serif-natural">
              {t.cautiousNote}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
