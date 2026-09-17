import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Models to try in order when handling requests with automatic fallback on 503 / high demand
const CANDIDATE_MODELS = ['gemini-3.7-flash', 'gemini-3.1-flash-lite'];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Resilient wrapper with model fallbacks and retry for high demand / 503 spikes
async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    systemInstruction?: string;
  }
): Promise<string> {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: {
            ...params.config,
            systemInstruction: params.systemInstruction || params.config?.systemInstruction,
          },
        });
        if (response && response.text) {
          return response.text;
        }
      } catch (error: any) {
        lastError = error;
        console.warn(`[Gemini API] Model ${model} attempt ${attempt + 1} failed: ${error?.message || error}`);
        const isTransient =
          error?.message?.includes('503') ||
          error?.message?.includes('high demand') ||
          error?.message?.includes('UNAVAILABLE') ||
          error?.status === 503 ||
          error?.status === 429;
        if (isTransient && attempt === 0) {
          await sleep(500);
        }
      }
    }
  }

  throw lastError || new Error('All Gemini model candidates failed');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// Helper for contextual starter steps when AI service is unavailable
function getContextualStartFallback(query: string, language: string, device: string) {
  const q = (query || '').toLowerCase();
  const isTa = language === 'ta';

  if (q.includes('wifi') || q.includes('wi-fi') || q.includes('internet') || q.includes('வைஃபை')) {
    return {
      taskTitle: isTa ? 'வைஃபை இணைத்தல்' : 'Connect to Wi-Fi Internet',
      needsDevice: device === 'unknown',
      totalEstimatedSteps: 4,
      stepNumber: 1,
      instruction: isTa
        ? (device === 'iphone' ? 'உங்கள் ஐபோனில் "Settings" ⚙️ அமைப்பைத் திறக்கவும்.' : 'உங்கள் போன் திரையின் மேல் பகுதியிலிருந்து கீழே விரலால் இழுக்கவும்.')
        : (device === 'iphone' ? 'Open the "Settings" ⚙️ app on your iPhone.' : 'Swipe down from the very top of your phone screen.'),
      detailExplanation: isTa ? 'நாம் நிதானமாகப் பார்ப்போம்.' : 'Let us do this one step at a time.',
      visualHint: device === 'iphone' ? 'Settings ⚙️' : 'Swipe down',
      iconHint: 'Wifi',
      encouragement: isTa ? 'நாம் ஒன்றாகச் செய்வோம் 😊' : "Let's do it together 😊",
      isComplete: false,
    };
  }

  if (q.includes('photo') || q.includes('picture') || q.includes('whatsapp') || q.includes('படம்') || q.includes('வாட்ஸ்அப்')) {
    return {
      taskTitle: isTa ? 'வாட்ஸ்அப்பில் புகைப்படம் அனுப்புதல்' : 'Send a Photo on WhatsApp',
      needsDevice: device === 'unknown',
      totalEstimatedSteps: 4,
      stepNumber: 1,
      instruction: isTa
        ? 'உங்கள் போனில் வாட்ஸ்அப் (WhatsApp) செயலியைத் திறக்கவும்.'
        : 'Open the WhatsApp app on your phone.',
      detailExplanation: isTa ? 'வெள்ளை போன் சின்னம் கொண்ட பச்சை நிற ஐகானைத் தொடவும்.' : 'Tap the green icon with the white telephone inside.',
      visualHint: 'WhatsApp icon',
      iconHint: 'MessageSquare',
      encouragement: isTa ? 'நன்றாகச் செய்கிறீர்கள் 😊' : 'You are doing great 😊',
      isComplete: false,
    };
  }

  return {
    taskTitle: isTa ? 'தொலைபேசி உதவி' : 'Smartphone Step-by-Step Guide',
    needsDevice: false,
    totalEstimatedSteps: 4,
    stepNumber: 1,
    instruction: isTa
      ? 'உங்கள் போன் திரையை ஆன் செய்து முகப்புத் திரைக்கு வாருங்கள்.'
      : 'Unlock your phone and go to your home screen.',
    detailExplanation: isTa
      ? 'நாம் ஒன்றாகப் பார்ப்போம், கவலைப்பட வேண்டாம்.'
      : 'Let us do this together one step at a time. Take your time.',
    visualHint: 'Home Screen',
    iconHint: 'Smartphone',
    encouragement: isTa ? 'நாம் ஒன்றாகச் செய்வோம் 😊' : "Let's do it together 😊",
    isComplete: false,
  };
}

// API: Start / Understand Task and Get Step 1
app.post('/api/guide/start', async (req, res) => {
  const { query, language = 'en', device = 'unknown' } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    const fallback = getContextualStartFallback(query, language, device);
    return res.json({ success: true, ...fallback });
  }

  try {
    const systemInstruction = `You are Tech Sahayak, a patient, kind, reassuring technology helper for senior citizens and beginners.
The user is asking for help with their smartphone.
Language requested: ${language === 'ta' ? 'Tamil (தமிழ்)' : 'English'}.
User's device: ${device}.

Rules:
1. Always be gentle, reassuring, and very simple.
2. Provide ONLY Step 1 of the task. Do NOT provide multiple steps.
3. Keep instructions to 1 or 2 short sentences. No technical jargon.
4. If device is 'unknown' and the task behaves differently on Android vs iPhone (e.g. Wi-Fi, settings, screenshot), set needsDevice=true. If the task is universal (e.g. general WhatsApp chat), needsDevice=false.
5. If in Tamil, generate natural, polite, respectful Tamil suitable for Tamil elders (e.g. வாருங்கள், தொடவும்).
6. Return JSON strictly matching the schema.`;

    const prompt = `User asked: "${query}". Determine the task title, estimated total steps (typically 3 to 5), and provide Step 1.`;

    const text = await generateContentWithFallback(ai, {
      contents: prompt,
      systemInstruction,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            taskTitle: { type: Type.STRING, description: 'Short friendly title of the task in selected language' },
            needsDevice: { type: Type.BOOLEAN, description: 'True if knowing Android vs iPhone is crucial' },
            totalEstimatedSteps: { type: Type.INTEGER, description: 'Estimated number of steps (3-5)' },
            stepNumber: { type: Type.INTEGER, description: 'Should be 1' },
            instruction: { type: Type.STRING, description: 'Clear single action instruction for step 1' },
            detailExplanation: { type: Type.STRING, description: 'Reassuring short hint or icon description' },
            visualHint: { type: Type.STRING, description: 'Short visual clue, e.g., Green icon, ⚙️ Settings' },
            iconHint: { type: Type.STRING, description: 'Lucide icon name clue e.g. MessageSquare, Wifi, Settings, Sun, Video, Smartphone' },
            encouragement: { type: Type.STRING, description: 'Friendly encouraging phrase' },
            isComplete: { type: Type.BOOLEAN, description: 'False for step 1' }
          },
          required: ['taskTitle', 'needsDevice', 'totalEstimatedSteps', 'stepNumber', 'instruction', 'encouragement', 'isComplete'],
        },
      },
    });

    const parsed = JSON.parse(text || '{}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.warn('Recovering from Gemini error in /api/guide/start with curated guidance:', error?.message || error);
    const fallback = getContextualStartFallback(query, language, device);
    return res.json({ success: true, ...fallback });
  }
});

// API: Next Step
app.post('/api/guide/next', async (req, res) => {
  const {
    originalQuery,
    taskTitle,
    device,
    currentStep,
    totalEstimatedSteps,
    language = 'en',
    previousSteps = [],
  } = req.body;

  const nextStepNum = (currentStep || 1) + 1;
  const isFinishing = nextStepNum >= (totalEstimatedSteps || 4);
  const isTa = language === 'ta';

  const defaultStep = {
    stepNumber: nextStepNum,
    instruction: isFinishing
      ? (isTa ? 'அருமை! நீங்கள் இந்த பணியை வெற்றிகரமாக முடித்துவிட்டீர்கள்.' : 'Great job! You have successfully completed this task.')
      : (isTa ? `படி ${nextStepNum}: அடுத்த அமைப்பைத் தொட்டு தொடரவும்.` : `Step ${nextStepNum}: Tap the next option on your screen.`),
    detailExplanation: isTa ? 'நிதானமாகப் பின்பற்றுங்கள்.' : 'Take your time, you are doing wonderful.',
    visualHint: isFinishing ? 'Completed' : `Step ${nextStepNum}`,
    iconHint: isFinishing ? 'Check' : 'ArrowRight',
    encouragement: isTa ? 'மிக அருமை! நீங்கள் சிறப்பாகச் செய்கிறீர்கள்.' : 'Wonderful progress!',
    isComplete: isFinishing,
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, ...defaultStep });
  }

  try {
    const systemInstruction = `You are Tech Sahayak, a patient, kind, reassuring helper for senior citizens.
Task: "${taskTitle}" (Original ask: "${originalQuery}")
Device: ${device}
Language: ${isTa ? 'Tamil' : 'English'}
Completed steps: ${JSON.stringify(previousSteps)}

Generate Step ${nextStepNum}.
If this next step completes the task, set isComplete=true.
Keep the instruction to ONE simple, reassuring action. Use visual clues (color of button, icon shape, where it is on screen).
Return JSON strictly matching the schema.`;

    const text = await generateContentWithFallback(ai, {
      contents: `Generate Step ${nextStepNum} for this task.`,
      systemInstruction,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stepNumber: { type: Type.INTEGER },
            instruction: { type: Type.STRING, description: 'Clear single action instruction' },
            detailExplanation: { type: Type.STRING, description: 'Helpful visual location or icon clue' },
            visualHint: { type: Type.STRING, description: 'Short badge clue' },
            iconHint: { type: Type.STRING, description: 'Lucide icon clue' },
            encouragement: { type: Type.STRING },
            isComplete: { type: Type.BOOLEAN },
          },
          required: ['stepNumber', 'instruction', 'encouragement', 'isComplete'],
        },
      },
    });

    const parsed = JSON.parse(text || '{}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.warn('Recovering from Gemini error in /api/guide/next with safe progression:', error?.message || error);
    return res.json({ success: true, ...defaultStep });
  }
});

// API: "I'M STUCK" Adaptive Rephrasing
app.post('/api/guide/stuck', async (req, res) => {
  const {
    originalQuery,
    taskTitle,
    device,
    stepNumber,
    currentInstruction,
    language = 'en',
    stuckCount = 1,
  } = req.body;

  const isTa = language === 'ta';
  const defaultStuckResponse = {
    stepNumber: stepNumber || 1,
    instruction: isTa
      ? 'கவலைப்பட வேண்டாம் 😊 திரையில் உள்ள சின்னத்தை மெதுவாகப் பார்த்து ஒருமுறை லேசாகத் தொடுங்கள்.'
      : "That's completely okay 😊 Take a breath and look gently at your screen. Tap the icon once lightly.",
    detailExplanation: isTa
      ? 'அவசரமில்லை, நிதானமாகச் செய்யுங்கள்.'
      : 'No hurry at all. Look around the center or bottom of your screen.',
    visualHint: isTa ? 'எளிய விளக்கம்' : 'Simplified clue',
    iconHint: 'HelpCircle',
    isRephrased: true,
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, ...defaultStuckResponse });
  }

  try {
    const systemInstruction = `You are Tech Sahayak. The elderly user is STUCK on Step ${stepNumber} of "${taskTitle}".
Previous instruction that confused them: "${currentInstruction}"
Device: ${device}
Language: ${isTa ? 'Tamil' : 'English'}
Times stuck on this step: ${stuckCount}

CRITICAL RULES FOR "I'M STUCK":
1. DO NOT repeat the previous sentence or use identical words.
2. Start with warm reassurance: "That's okay 😊", "Don't worry 😊", "Let's find it together." (or Tamil: "கவலைப்படாதீர்கள் 😊", "நாம் நிதானமாகப் பார்ப்போம்").
3. Explain the SAME action in a MUCH SIMPLER, visual way:
   - Describe the exact icon shape (e.g. "look for a picture that looks like a metal paperclip 📎", "look for a gear ⚙️ with teeth").
   - Describe where it is located on screen (e.g. "look at the very bottom right corner", "slide down from the top edge").
   - Break it into an even smaller physical movement (e.g. "tap once gently with your index finger").
4. Return JSON.`;

    const text = await generateContentWithFallback(ai, {
      contents: `The user said "I'm stuck" on step ${stepNumber}. Rephrase the instruction in a totally different, simpler, visual way.`,
      systemInstruction,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stepNumber: { type: Type.INTEGER },
            instruction: { type: Type.STRING, description: 'Simplified rephrased instruction' },
            detailExplanation: { type: Type.STRING, description: 'Ultra simple visual location clue' },
            visualHint: { type: Type.STRING, description: 'Visual clue badge' },
            iconHint: { type: Type.STRING, description: 'Lucide icon name' },
            isRephrased: { type: Type.BOOLEAN },
          },
          required: ['stepNumber', 'instruction', 'isRephrased'],
        },
      },
    });

    const parsed = JSON.parse(text || '{}');
    return res.json({ success: true, ...parsed, isRephrased: true });
  } catch (error: any) {
    console.warn('Recovering from Gemini error in /api/guide/stuck with simplified guidance:', error?.message || error);
    return res.json({ success: true, ...defaultStuckResponse });
  }
});

// API: Suspicious Message / Scam Safety Checker
app.post('/api/scam/analyze', async (req, res) => {
  const { messageText, language = 'en' } = req.body;
  if (!messageText) {
    return res.status(400).json({ error: 'Message description is required' });
  }

  const defaultSafetyAssessment = {
    riskLevel: 'suspicious',
    categoryEn: '⚠️ Possible Banking or Digital Fraud Message',
    categoryTa: '⚠️ சாத்தியமான வங்கி அல்லது டிஜிட்டல் மோசடி செய்தி',
    assessmentEn: 'This message has warning signs commonly seen in digital scams. Legitimate companies and banks never demand urgent payments, OTPs, or passwords over SMS or phone calls.',
    assessmentTa: 'இந்த செய்தியில் டிஜிட்டல் மோசடிகளில் காணப்படும் எச்சரிக்கை அறிகுறிகள் உள்ளன. வங்கிகள் அல்லது அரசு ஒருபோதும் அவசரமாக OTP அல்லது பணம் கேட்காது.',
    warningSignsEn: [
      'Urgent demand for money, OTP, or PIN',
      'Threat of account closure, electricity cut, or arrest',
      'Asking to click unknown web links or download apps',
    ],
    warningSignsTa: [
      'உடனடி பணம், OTP அல்லது PIN கோருவது',
      'கணக்கு முடக்கம், மின்சார துண்டிப்பு அல்லது கைது மிரட்டல்',
      'தெரியாத இணைப்புகளை கிளிக் செய்ய அல்லது ஆப் ஏற்றச் சொல்வது',
    ],
    safeActionsEn: [
      'Do NOT click any link or send money',
      'Do NOT share your OTP, UPI PIN, or ATM PIN',
      'Call your bank or local office using their official number from a passbook or official website',
    ],
    safeActionsTa: [
      'எந்த இணைப்பையும் கிளிக் செய்யாதீர்கள், பணம் அனுப்பாதீர்கள்',
      'உங்கள் OTP அல்லது PIN எண்களை பகிராதீர்கள்',
      'வங்கி பாஸ்புக்கில் உள்ள உண்மையான வாடிக்கையாளர் சேவை எண்ணை அழைக்கவும்',
    ],
    goldenAdviceEn: 'When in doubt, show this message to a family member or visit your local branch in person.',
    goldenAdviceTa: 'சந்தேகம் இருந்தால் குடும்பத்தினரிடம் காட்டுங்கள் அல்லது நேரில் சென்று விசாரியுங்கள்.',
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, ...defaultSafetyAssessment });
  }

  try {
    const systemInstruction = `You are the Scam Safety Advisor for Tech Sahayak.
Elderly users submit suspicious phone calls, SMS, WhatsApp messages, or situations they encountered.

CRITICAL SAFETY DIRECTIVES:
1. NEVER declare an assessment as "100% definitely a scam" or "100% completely safe". Always use cautious, measured language:
   - "⚠️ Possible UPI / Banking Scam"
   - "⚠️ Possible Fake KYC / Electricity Bill Message"
   - "⚠️ Possible Impersonation Scam"
   - "❓ Unclear / Needs Caution"
2. NEVER ask for the user's OTP, PIN, password, bank account, or private details.
3. Point out 2-3 specific red flags from the message (e.g. artificial urgency, asking for OTP, unfamiliar links, threatening arrest or service cutoff).
4. Give 3 clear, protective action steps (e.g. "Do not click link", "Never share PIN", "Call bank on official passbook number").
5. Provide translations for both English and Tamil in the JSON output.
6. Return JSON strictly matching the schema.`;

    const prompt = `Analyze this message/call described by user: "${messageText}".`;

    const text = await generateContentWithFallback(ai, {
      contents: prompt,
      systemInstruction,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ['high_risk', 'suspicious', 'unclear'] },
            categoryEn: { type: Type.STRING, description: 'Cautious classification in English' },
            categoryTa: { type: Type.STRING, description: 'Cautious classification in Tamil' },
            assessmentEn: { type: Type.STRING, description: 'Simple plain-language assessment in English' },
            assessmentTa: { type: Type.STRING, description: 'Simple plain-language assessment in Tamil' },
            warningSignsEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            warningSignsTa: { type: Type.ARRAY, items: { type: Type.STRING } },
            safeActionsEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            safeActionsTa: { type: Type.ARRAY, items: { type: Type.STRING } },
            goldenAdviceEn: { type: Type.STRING },
            goldenAdviceTa: { type: Type.STRING },
          },
          required: [
            'riskLevel',
            'categoryEn',
            'categoryTa',
            'assessmentEn',
            'assessmentTa',
            'warningSignsEn',
            'warningSignsTa',
            'safeActionsEn',
            'safeActionsTa',
            'goldenAdviceEn',
            'goldenAdviceTa',
          ],
        },
      },
    });

    const parsed = JSON.parse(text || '{}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.warn('Recovering from Gemini error in /api/scam/analyze with verified safety advisory:', error?.message || error);
    return res.json({ success: true, ...defaultSafetyAssessment });
  }
});

// API: Caregiver Summary
app.post('/api/guide/summary', async (req, res) => {
  const { originalQuery, taskTitle, device, totalSteps, language = 'en' } = req.body;
  const isTa = language === 'ta';

  const defaultSummary = isTa
    ? `இன்று நீங்கள் "${taskTitle}" செய்வதற்கான உதவியைப் பெற்று, ${totalSteps} எளிய படிகள் மூலம் வெற்றிகரமாக செய்து முடித்துள்ளீர்கள்.`
    : `Today you asked for help with "${taskTitle}". You completed the ${totalSteps} step guide successfully.`;

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, summary: defaultSummary });
  }

  try {
    const prompt = `Write a brief, polite 2-sentence Caregiver Summary in ${isTa ? 'Tamil' : 'English'} explaining what task the senior completed. Task: "${taskTitle}", Device: ${device}.`;

    const text = await generateContentWithFallback(ai, {
      contents: prompt,
      systemInstruction: 'Keep it to 2 clear, warm sentences describing the completed smartphone task.',
    });

    return res.json({ success: true, summary: text?.trim() || defaultSummary });
  } catch (error: any) {
    console.warn('Recovering from Gemini error in /api/guide/summary with default summary:', error?.message || error);
    return res.json({ success: true, summary: defaultSummary });
  }
});

// Vite middleware in dev / static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tech Sahayak server running on port ${PORT}`);
  });
}

startServer();

