import { Language, SpeechSpeed } from '../types';

// Speech Recognition Interface for browser compatibility
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

let activeRecognition: any = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as IWindow;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

export function startSpeechRecognition({
  language,
  onResult,
  onError,
  onEnd,
}: {
  language: Language;
  onResult: (text: string, isFinal: boolean) => void;
  onError: (errorMessage: string) => void;
  onEnd: () => void;
}): () => void {
  const win = window as unknown as IWindow;
  const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    onError('Speech recognition is not supported in this browser.');
    onEnd();
    return () => {};
  }

  try {
    if (activeRecognition) {
      try {
        activeRecognition.abort();
      } catch (e) {
        // ignore
      }
    }

    const recognition = new SpeechRecognitionClass();
    activeRecognition = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    // Set appropriate BCP-47 language tag
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const text = (finalTranscript || interimTranscript).trim();
      if (text) {
        onResult(text, !!finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        onError('Microphone permission was denied. Please allow microphone access in your browser.');
      } else if (event.error === 'no-speech') {
        onError('No speech was detected. Please try tapping and speaking again.');
      } else {
        onError('Speech recognition had an issue. Please try again or type.');
      }
    };

    recognition.onend = () => {
      activeRecognition = null;
      onEnd();
    };

    recognition.start();

    return () => {
      try {
        recognition.abort();
      } catch (e) {
        // ignore
      }
      activeRecognition = null;
    };
  } catch (err: any) {
    console.error('Error starting speech recognition:', err);
    onError('Could not start microphone. Please try typing instead.');
    onEnd();
    return () => {};
  }
}

export function stopSpeechRecognition() {
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch (e) {
      // ignore
    }
    activeRecognition = null;
  }
}

export function speakText({
  text,
  language,
  speed = 'normal',
  onStart,
  onEnd,
  onError,
}: {
  text: string;
  language: Language;
  speed?: SpeechSpeed;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}) {
  if (!isSpeechSynthesisSupported()) {
    onError?.();
    return;
  }

  // Clean emoji and decorative chars for cleaner TTS reading
  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[👉👇👍❓🎉🔊📷📶🎧🔤📞🛡️💳💬🎁🪪💼]/g, '')
    .trim();

  if (!cleanText) {
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    currentUtterance = utterance;

    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = speed === 'slow' ? 0.75 : 0.95; // slightly relaxed rate for elderly clarity
    utterance.pitch = 1.0;

    // Pick best available voice for language if possible
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetLangPrefix = language === 'ta' ? 'ta' : 'en';
      const matchedVoice = voices.find(v => v.lang.startsWith(targetLangPrefix)) ||
        voices.find(v => v.lang.includes(targetLangPrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      currentUtterance = null;
      onError?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('TTS error:', err);
    onError?.();
  }
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    } catch (e) {
      // ignore
    }
  }
}
