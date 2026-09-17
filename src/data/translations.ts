import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  welcomeHeading: string;
  welcomeSubheading: string;
  chooseLanguage: string;
  howCanIHelp: string;
  tapToSpeak: string;
  listening: string;
  listeningHint: string;
  stopListening: string;
  recognizedText: string;
  askThisQuestion: string;
  tryAgain: string;
  typeQuestion: string;
  typePlaceholder: string;
  askButton: string;
  phoneHelp: string;
  phoneHelpDesc: string;
  scamSafety: string;
  scamSafetyDesc: string;
  popularQuestions: string;
  whichPhone: string;
  androidPhone: string;
  androidDesc: string;
  androidDisclaimer: string;
  iphone: string;
  iphoneDesc: string;
  letsDoItTogether: string;
  step: string;
  of: string;
  iDidIt: string;
  imStuck: string;
  listen: string;
  replay: string;
  simplifiedExplanation: string;
  youDidIt: string;
  greatJob: string;
  helpWithSomethingElse: string;
  sessionSummary: string;
  settings: string;
  textSize: string;
  normal: string;
  large: string;
  extraLarge: string;
  voiceAudio: string;
  voiceOn: string;
  voiceOff: string;
  speechSpeed: string;
  speedNormal: string;
  speedSlow: string;
  back: string;
  backToHome: string;
  scamHubTitle: string;
  scamHubSubtitle: string;
  checkSuspiciousMessage: string;
  checkSuspiciousSubtitle: string;
  tellAboutMessage: string;
  describeMessagePlaceholder: string;
  checkSafetyButton: string;
  analyzingSafety: string;
  whatIsThisScam: string;
  whatScammerSays: string;
  warningSigns: string;
  howToStaySafe: string;
  rememberThis: string;
  goldenRule: string;
  safetyAssessment: string;
  cautiousNote: string;
  speechNotSupported: string;
  errorTryAgain: string;
  close: string;
  changeLanguage: string;
  easyHelp: string;
  thinking: string;
  exampleQuestions: string[];
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Tech Sahayak",
    tagline: "Your patient helper for phones and digital safety",
    welcomeHeading: "Welcome to Tech Sahayak 👋",
    welcomeSubheading: "Which language would you like to use?",
    chooseLanguage: "Choose Language",
    howCanIHelp: "How can I help you?",
    tapToSpeak: "TAP TO SPEAK",
    listening: "Listening to your voice...",
    listeningHint: "Please speak clearly. Take your time.",
    stopListening: "Done Speaking",
    recognizedText: "We heard:",
    askThisQuestion: "Yes, ask this 👍",
    tryAgain: "Try Again 🔄",
    typeQuestion: "Type your question",
    typePlaceholder: "Ask me about your phone...",
    askButton: "Ask Helper",
    phoneHelp: "PHONE HELP",
    phoneHelpDesc: "Step-by-step guidance for WhatsApp, photos, Wi-Fi, and settings",
    scamSafety: "SCAM SAFETY",
    scamSafetyDesc: "Learn common scams and check suspicious calls or messages",
    popularQuestions: "Common things to try:",
    whichPhone: "Which phone do you use?",
    androidPhone: "Android Phone",
    androidDesc: "Samsung, Xiaomi, Vivo, Oppo, Realme, OnePlus, Motorola",
    androidDisclaimer: "These instructions work for most Android phones. Some button names may differ slightly.",
    iphone: "iPhone (Apple)",
    iphoneDesc: "Apple iPhone with iOS",
    letsDoItTogether: "Let's do it together 😊",
    step: "STEP",
    of: "of",
    iDidIt: "I DID IT 👍",
    imStuck: "I'M STUCK ❓",
    listen: "Listen",
    replay: "Replay Voice",
    simplifiedExplanation: "Easier way to do this 👇",
    youDidIt: "YOU DID IT! 🎉",
    greatJob: "Great job! You completed it. 😊",
    helpWithSomethingElse: "HELP WITH SOMETHING ELSE 🔁",
    sessionSummary: "Caregiver Session Summary",
    settings: "Settings",
    textSize: "Text Size",
    normal: "Normal",
    large: "Large",
    extraLarge: "Extra Large",
    voiceAudio: "Voice Narration",
    voiceOn: "On 🔊",
    voiceOff: "Off 🔇",
    speechSpeed: "Speech Speed",
    speedNormal: "Normal Speed",
    speedSlow: "Slow & Patient 🐢",
    back: "Back",
    backToHome: "Back to Home 🏠",
    scamHubTitle: "Digital Scam Safety",
    scamHubSubtitle: "Learn how to spot trick calls, fake messages, and keep your money safe.",
    checkSuspiciousMessage: "Check a Suspicious Message",
    checkSuspiciousSubtitle: "Did someone call or text you asking for money, OTP, or PIN?",
    tellAboutMessage: "Tell or paste the suspicious message here:",
    describeMessagePlaceholder: "e.g. Someone called saying my bank account or electricity will be blocked unless I send money or give OTP...",
    checkSafetyButton: "Check This Message 🛡️",
    analyzingSafety: "Checking safety warning signs...",
    whatIsThisScam: "What is this scam?",
    whatScammerSays: "What might the scammer say?",
    warningSigns: "Warning Signs 🚨",
    howToStaySafe: "How can I stay safe?",
    rememberThis: "Remember This Golden Rule ⭐",
    goldenRule: "Golden Safety Rule",
    safetyAssessment: "Safety Assessment",
    cautiousNote: "Always check with a trusted family member or official bank branch before sending money or clicking links.",
    speechNotSupported: "Voice input is not available in this browser. You can type your question instead.",
    errorTryAgain: "Something went wrong. Don't worry, let's try again.",
    close: "Close",
    changeLanguage: "Language",
    easyHelp: "One step at a time",
    thinking: "Finding simple steps for you...",
    exampleQuestions: [
      "How do I send a photo on WhatsApp?",
      "My Wi-Fi is not working",
      "How do I connect Bluetooth earphones?",
      "How do I make the letters bigger on my screen?",
      "How do I make a video call to my family?",
      "How do I take a screenshot?"
    ]
  },
  ta: {
    appName: "டெக் சஹாயக் (Tech Sahayak)",
    tagline: "ஸ்மார்ட்போன் மற்றும் டிஜிட்டல் பாதுகாப்புக்கான எளிய உதவியாளர்",
    welcomeHeading: "Tech Sahayak-க்கு வரவேற்கிறோம் 👋",
    welcomeSubheading: "நீங்கள் எந்த மொழியில் பயன்படுத்த விரும்புகிறீர்கள்?",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    howCanIHelp: "நான் உங்களுக்கு எப்படி உதவலாம்?",
    tapToSpeak: "பேச தொடவும்",
    listening: "உங்கள் குரலைக் கேட்கிறோம்...",
    listeningHint: "மெதுவாகவும் தெளிவாகவும் பேசுங்கள். அவசரமில்லை.",
    stopListening: "பேசி முடித்தேன்",
    recognizedText: "நாங்கள் கேட்டது:",
    askThisQuestion: "ஆம், இதைக் கேள் 👍",
    tryAgain: "மீண்டும் பேசுங்கள் 🔄",
    typeQuestion: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்",
    typePlaceholder: "உங்கள் தொலைபேசியைப் பற்றி கேளுங்கள்...",
    askButton: "கேளுங்கள்",
    phoneHelp: "போன் உதவி (PHONE HELP)",
    phoneHelpDesc: "வாட்ஸ்அப், புகைப்படங்கள், வைஃபை, அமைப்புகள் பற்றிய படிப்படியான வழிகாட்டல்",
    scamSafety: "மோசடி பாதுகாப்பு (SCAM SAFETY)",
    scamSafetyDesc: "போலி அழைப்புகள், குறுஞ்செய்தி மோசடிகளை அறிந்து பாதுகாப்பாக இருங்கள்",
    popularQuestions: "பொதுவான கேள்விகள்:",
    whichPhone: "நீங்கள் எந்த போனை பயன்படுத்துகிறீர்கள்?",
    androidPhone: "ஆண்ட்ராய்டு போன் (Android)",
    androidDesc: "Samsung, Xiaomi, Vivo, Oppo, Realme, OnePlus, போன்றவை",
    androidDisclaimer: "இந்த வழிமுறைகள் பெரும்பாலான ஆண்ட்ராய்டு போன்களுக்கு பொருந்தும். சில பொத்தான்களின் பெயர்கள் சற்று மாறலாம்.",
    iphone: "ஐபோன் (iPhone / Apple)",
    iphoneDesc: "ஆப்பிள் ஐபோன்",
    letsDoItTogether: "நாம் ஒன்றாகச் செய்வோம் 😊",
    step: "படி",
    of: "/",
    iDidIt: "செய்து முடித்தேன் 👍",
    imStuck: "எனக்கு புரியவில்லை / மாட்டிக்கொண்டேன் ❓",
    listen: "கேளுங்கள்",
    replay: "மீண்டும் கேளுங்கள்",
    simplifiedExplanation: "இதைச் செய்ய இன்னும் எளிய வழி 👇",
    youDidIt: "அருமை! நீங்கள் செய்துவிட்டீர்கள்! 🎉",
    greatJob: "சிறப்பான வேலை! நீங்கள் முழுமையாக முடித்துவிட்டீர்கள். 😊",
    helpWithSomethingElse: "வேறு ஏதேனும் உதவி தேவையா? 🔁",
    sessionSummary: "பராமரிப்பாளர் குறிப்பு (Session Summary)",
    settings: "அமைப்புகள் (Settings)",
    textSize: "எழுத்தின் அளவு",
    normal: "சாதாரண அளவு",
    large: "பெரிய அளவு",
    extraLarge: "மிகப் பெரிய அளவு",
    voiceAudio: "குரல் வாசிப்பு",
    voiceOn: "இயக்கத்தில் 🔊",
    voiceOff: "அணைக்கப்பட்டுள்ளது 🔇",
    speechSpeed: "பேசும் வேகம்",
    speedNormal: "சாதாரண வேகம்",
    speedSlow: "மெதுவாக & பொறுமையாக 🐢",
    back: "பின்னால்",
    backToHome: "முகப்புக்குச் செல் 🏠",
    scamHubTitle: "டிஜிட்டல் மோசடி விழிப்புணர்வு",
    scamHubSubtitle: "போலி அழைப்புகள், வங்கி ஏமாற்று வேலைகளிலிருந்து உங்கள் பணத்தைப் பாதுகாக்கவும்.",
    checkSuspiciousMessage: "சந்தேகத்திற்குரிய செய்தியை சரிபார்க்கவும்",
    checkSuspiciousSubtitle: "யாராவது பணம், OTP அல்லது PIN கேட்டு குறுஞ்செய்தி அனுப்பினார்களா?",
    tellAboutMessage: "வந்த செய்தியைப் பற்றி சொல்லுங்கள் அல்லது தட்டச்சு செய்யுங்கள்:",
    describeMessagePlaceholder: "எ.கா: உங்கள் வங்கி கணக்கு அல்லது மின்சாரம் துண்டிக்கப்படும் என்று OTP அல்லது பணம் கேட்டார்கள்...",
    checkSafetyButton: "பாதுகாப்பை சரிபார்க்கவும் 🛡️",
    analyzingSafety: "பாதுகாப்பு எச்சரிக்கைகளை ஆராய்கிறது...",
    whatIsThisScam: "இந்த மோசடி என்ன?",
    whatScammerSays: "மோசடி செய்பவர் என்ன சொல்லலாம்?",
    warningSigns: "எச்சரிக்கை அறிகுறிகள் 🚨",
    howToStaySafe: "பாதுகாப்பாக இருப்பது எப்படி?",
    rememberThis: "இந்த முக்கியமான விதியை நினைவில் கொள்ளுங்கள் ⭐",
    goldenRule: "முக்கிய பாதுகாப்பு விதி",
    safetyAssessment: "பாதுகாப்பு மதிப்பீடு",
    cautiousNote: "பணம் அனுப்பும் முன் அல்லது இணைப்புகளைத் திறக்கும் முன் குடும்பத்தினர் அல்லது அதிகாரப்பூர்வ வங்கிக் கிளையைத் தொடர்பு கொள்ளவும்.",
    speechNotSupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. நீங்கள் தட்டச்சு செய்யலாம்.",
    errorTryAgain: "ஏதோ தவறு நடந்துவிட்டது. கவலைப்பட வேண்டாம், மீண்டும் முயற்சிப்போம்.",
    close: "மூடு",
    changeLanguage: "மொழி",
    easyHelp: "ஒவ்வொரு படியாக",
    thinking: "எளிய வழிமுறைகளைத் தயாரிக்கிறது...",
    exampleQuestions: [
      "வாட்ஸ்அப்பில் புகைப்படம் அனுப்புவது எப்படி?",
      "என் வைஃபை (Wi-Fi) வேலை செய்யவில்லை",
      "புளூடூத் ஹெட்போனை இணைப்பது எப்படி?",
      "திரையில் உள்ள எழுத்துக்களை பெரிதாக்குவது எப்படி?",
      "குடும்பத்தினருக்கு வீடியோ கால் செய்வது எப்படி?",
      "ஸ்கிரீன்ஷாட் (Screenshot) எடுப்பது எப்படி?"
    ]
  }
};
