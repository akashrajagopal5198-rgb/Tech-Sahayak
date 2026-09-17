import { ScamCategory } from '../types';

export const scamCategories: ScamCategory[] = [
  {
    id: 'upi_banking',
    titleEn: '💳 UPI & Banking Scams',
    titleTa: '💳 UPI மற்றும் வங்கி மோசடிகள்',
    icon: 'CreditCard',
    taglineEn: 'Fake refund calls, QR code payment traps, and OTP theft',
    taglineTa: 'போலி ரீஃபண்ட், QR கோட் பொறிகள் மற்றும் OTP திருட்டு',
    whatIsItEn: 'Scammers trick you into believing you are receiving money or solving an account error, but they trick you into scanning a QR code or entering your UPI PIN, which actually sends your money to them.',
    whatIsItTa: 'உங்களுக்கு பணம் வருகிறது அல்லது வங்கி கணக்கில் பிழை சரிசெய்யப்படுகிறது என்று கூறி, உங்களை QR கோட் ஸ்கேன் செய்ய வைத்து அல்லது UPI PIN போட வைத்து உங்கள் பணத்தைத் திருடுவார்கள்.',
    scammerSaysEn: '"Sir, I am sending you a ₹5,000 refund. Please scan this QR code and type your UPI PIN to accept the money into your bank."',
    scammerSaysTa: '"ஐயா, உங்கள் கணக்கிற்கு ₹5,000 திருப்பி அனுப்பப்படுகிறது. இந்த QR கோடை ஸ்கேன் செய்து உங்கள் UPI PIN-ஐப் போட்டு பணத்தைப் பெற்றுக்கொள்ளுங்கள்."',
    warningSignsEn: [
      'Anyone asking you to enter your UPI PIN or scan a QR code to "RECEIVE" money (PIN is ONLY used to SEND money).',
      'Urgent threats that your bank account or ATM card will be blocked within 24 hours.',
      'Calls from unknown mobile numbers claiming to be the bank manager or RBI officer.',
      'Asking you to read out the 6-digit OTP (One Time Password) received on SMS.'
    ],
    warningSignsTa: [
      'பணம் "பெறுவதற்கு" (Receive) UPI PIN அல்லது QR கோட் ஸ்கேன் செய்யச் சொல்வது (PIN எப்போதும் பணம் "அனுப்ப" மட்டுமே பயன்படும்).',
      '24 மணி நேரத்தில் வங்கி கணக்கு அல்லது ஏடிஎம் கார்டு முடக்கப்படும் என்று மிரட்டுவது.',
      'வங்கி மேலாளர் அல்லது ரிசர்வ் வங்கி அதிகாரி என்று கூறி தனிப்பட்ட மொபைல் எண்ணில் இருந்து பேசுவது.',
      'உங்கள் எஸ்.எம்.எஸ்க்கு வந்த 6 இலக்க OTP ரகசிய எண்ணைக் கேட்பது.'
    ],
    safetyStepsEn: [
      'Remember: You NEVER need to enter your UPI PIN or scan a QR code to receive money.',
      'Never tell your OTP, ATM PIN, or UPI PIN to anyone — even if they claim to be from your bank.',
      'If in doubt, disconnect the call immediately and visit your nearest bank branch with a family member.'
    ],
    safetyStepsTa: [
      'நினைவில் கொள்ளுங்கள்: பணம் பெற உங்களுக்கு ஒருபோதும் UPI PIN அல்லது QR ஸ்கேன் தேவையில்லை.',
      'வங்கி ஊழியர் என்று சொன்னாலும் OTP அல்லது PIN எண்களை யாரிடமும் சொல்லாதீர்கள்.',
      'சந்தேகம் இருந்தால் உடனே போனை வைத்துவிட்டு, உங்கள் குடும்பத்தினருடன் வங்கி கிளைக்கு நேரில் செல்லுங்கள்.'
    ],
    goldenRuleEn: 'NEVER enter your UPI PIN to receive money. PIN is ONLY for paying.',
    goldenRuleTa: 'பணம் பெறுவதற்கு ஒருபோதும் UPI PIN போடாதீர்கள். PIN பணம் அனுப்ப மட்டுமே!'
  },
  {
    id: 'whatsapp_impersonation',
    titleEn: '💬 WhatsApp & Message Scams',
    titleTa: '💬 வாட்ஸ்அப் & குறுஞ்செய்தி மோசடிகள்',
    icon: 'MessageSquare',
    taglineEn: 'Messages pretending to be your relative, friend, or courier delivery',
    taglineTa: 'உறவினர், நண்பர் அல்லது கூரியர் டெலிவரி போல வரும் குறுஞ்செய்திகள்',
    whatIsItEn: 'A scammer uses a photo of your grandson, son, or friend with a new unknown phone number. They pretend they are in an emergency and desperately need you to send money immediately via Google Pay or PhonePe.',
    whatIsItTa: 'மோசடி செய்பவர் உங்கள் பேரன், மகன் அல்லது நண்பரின் புகைப்படத்தை வைத்துக்கொண்டு புதிய எண்ணில் இருந்து குறுஞ்செய்தி அனுப்புவார். அவசர சிகிச்சை அல்லது சிக்கலில் இருப்பதாக கூறி உடனே பணம் கேட்பார்.',
    scammerSaysEn: '"Grandma / Grandpa, I lost my phone and I am stranded at the hospital. Please Google Pay ₹10,000 to this doctor number right now. Don\'t call my old number."',
    scammerSaysTa: '"பாட்டி/தாத்தா, என் போன் தொலைந்துவிட்டது. நான் அவசர மருத்துவமனையில் இருக்கிறேன். உடனே இந்த எண்ணிற்கு ₹10,000 கூகுள் பே செய்யுங்கள். பழைய எண்ணிற்கு அழைக்காதீர்கள்."',
    warningSignsEn: [
      'A message from an unknown number claiming to be your close family member with a new number.',
      'Extreme urgency asking you to transfer money immediately without calling them.',
      'Messages containing strange links claiming your parcel or courier is stuck at the post office.'
    ],
    warningSignsTa: [
      'தெரியாத புதிய எண்ணில் இருந்து உங்கள் குடும்ப உறுப்பினர் பேசுவது போல வரும் மெசேஜ்.',
      'உடனே பணம் அனுப்ப வேண்டும் என்று அவசரப்படுத்துவது.',
      'உங்கள் பார்சல் அல்லது தபால் மாட்டிக்கொண்டது என்று வரும் விசித்திரமான இணையதள இணைப்புகள் (Links).'
    ],
    safetyStepsEn: [
      'Always call your relative on their original, known phone number first to verify before sending any money.',
      'Do not click any unknown links sent on WhatsApp or SMS.',
      'Show the message to another trusted person in your household.'
    ],
    safetyStepsTa: [
      'பணம் அனுப்பும் முன், உங்கள் உறவினரின் பழைய உண்மையான எண்ணிற்கு போன் செய்து நேரில் பேசுங்கள்.',
      'வாட்ஸ்அப் அல்லது எஸ்.எம்.எஸில் வரும் எந்த இணைப்பையும் (Link) கிளிக் செய்யாதீர்கள்.',
      'வீட்டில் உள்ள மற்றொரு குடும்ப உறுப்பினரிடம் காட்டி உறுதி செய்யுங்கள்.'
    ],
    goldenRuleEn: 'Always call and speak to your family member on their known number before sending money.',
    goldenRuleTa: 'பணம் அனுப்பும் முன் எப்போதும் உங்கள் குடும்ப உறுப்பினரின் வழக்கமான எண்ணில் பேசி உறுதி செய்யுங்கள்.'
  },
  {
    id: 'fake_kyc_electricity',
    titleEn: '🪪 Fake KYC & Electricity Bill Scams',
    titleTa: '🪪 போலி KYC மற்றும் மின்சார கட்டண மோசடி',
    icon: 'FileText',
    taglineEn: 'Threats to cut off electricity, SIM card, or PAN-Aadhaar linking',
    taglineTa: 'மின்சாரம் துண்டிக்கப்படும் அல்லது சிம் கார்டு காலாவதியாகும் என்ற மிரட்டல்',
    whatIsItEn: 'Messages or automated calls threatening that your home electricity will be disconnected tonight or your SIM card deactivated unless you call a specific phone number or download an app (like AnyDesk or TeamViewer).',
    whatIsItTa: 'மின்சார கட்டணம் செலுத்தவில்லை என்று கூறி இன்றிரவு மின்சாரம் துண்டிக்கப்படும் அல்லது சிம் கார்டு முடக்கப்படும் என்று பயமுறுத்தி ஆப் டவுன்லோட் செய்ய வைப்பார்கள்.',
    scammerSaysEn: '"Dear customer, your electricity power will be disconnected at 9:30 PM tonight because your last bill was not updated. Immediately call officer Sharma at 98765XXXXX."',
    scammerSaysTa: '"அன்புள்ள வாடிக்கையாளரே, கடந்த மாத மின்சார கட்டணம் பதிவாகாததால் இன்றிரவு 9:30 மணிக்கு மின்சாரம் துண்டிக்கப்படும். உடனே மின்சார அதிகாரி எண்ணிற்கு அழைக்கவும்."',
    warningSignsEn: [
      'Sent from an ordinary personal 10-digit mobile number, not official government SMS headers.',
      'Threat of electricity disconnection within a few hours.',
      'Asking you to install remote-control screen sharing apps (AnyDesk, TeamViewer, QuickSupport).',
      'Asking to pay a small "test amount" like ₹10.'
    ],
    warningSignsTa: [
      'அரசு அமைப்பின் பெயருக்குப் பதிலாக சாதாரண 10 இலக்க மொபைல் எண்ணிலிருந்து வரும் மெசேஜ்.',
      'இன்றிரவே மின்சாரம் அல்லது சிம் துண்டிக்கப்படும் என்ற அவசர மிரட்டல்.',
      'AnyDesk, TeamViewer போன்ற ஸ்கிரீன் ஷேரிங் ஆப்ஸ்களை போனில் ஏற்றச் சொல்வது.',
      'சரிபார்க்க வெறும் ₹10 மட்டும் அனுப்புங்கள் என்று ஆசை காட்டுவது.'
    ],
    safetyStepsEn: [
      'Electricity boards NEVER send disconnection threats from personal mobile numbers.',
      'NEVER install AnyDesk, TeamViewer, or QuickSupport on your phone for a stranger (these allow scammers to see your screen).',
      'Pay bills only through your trusted official app or physical counter.'
    ],
    safetyStepsTa: [
      'மின்சார வாரியம் ஒருபோதும் தனிப்பட்ட மொபைல் எண்களிலிருந்து இப்படி மெசேஜ் அனுப்பாது.',
      'அந்நியர் சொல்லும் எந்த ஆப்ஸையும் (AnyDesk போன்றவை) உங்கள் போனில் இன்ஸ்டால் செய்யாதீர்கள்.',
      'மின்சார கட்டணத்தை நேரில் அல்லது வழக்கமான பாதுகாப்பான ஆப் மூலம் மட்டுமே செலுத்துங்கள்.'
    ],
    goldenRuleEn: 'NEVER install screen-sharing apps (AnyDesk/TeamViewer) when asked on a phone call.',
    goldenRuleTa: 'யாராவது போனில் சொன்னால் AnyDesk போன்ற ஸ்கிரீன் பார்க்கும் ஆப்ஸ்களை ஏற்றாதீர்கள்!'
  },
  {
    id: 'fake_prize_lottery',
    titleEn: '🎁 Fake Prize & Lottery Scams',
    titleTa: '🎁 போலி பரிசு & லாட்டரி மோசடி',
    icon: 'Gift',
    taglineEn: 'Claims that you won a car, ₹25 Lakhs KBC lottery, or festive reward',
    taglineTa: 'கார் அல்லது ₹25 லட்சம் பரிசு விழுந்துள்ளது என்று வரும் ஏமாற்று வேலை',
    whatIsItEn: 'You receive an exciting message or call saying your mobile number won a lucky draw, Kaun Banega Crorepati (KBC) lottery, or shopping gift voucher. To claim the prize, they demand an advance processing fee or tax payment.',
    whatIsItTa: 'உங்கள் மொபைல் எண்ணிற்கு குலுக்கல் முறையில் ₹25 லட்சம் அல்லது கார் பரிசு விழுந்துள்ளது என்று மெசேஜ் வரும். அந்தப் பரிசைப் பெற ஜிஎஸ்டி அல்லது பதிவுக் கட்டணம் செலுத்தச் சொல்வார்கள்.',
    scammerSaysEn: '"Congratulations! You won ₹25,00,000 in WhatsApp Lucky Draw. To release your cheque, pay ₹12,500 government processing fee to this account right now."',
    scammerSaysTa: '"வாழ்த்துகள்! உங்கள் எண்ணிற்கு வாட்ஸ்அப் குலுக்கலில் ₹25 லட்சம் பரிசு கிடைத்துள்ளது. காசோலையைப் பெற அரசு பதிவுக் கட்டணம் ₹12,500 செலுத்தவும்."',
    warningSignsEn: [
      'Winning a contest or lottery that you NEVER bought a ticket for.',
      'Being asked to pay money upfront (tax, processing charge, delivery fee) to claim a free gift.',
      'Audio voice notes on WhatsApp with fake logos of TV channels, banks, or PM schemes.'
    ],
    warningSignsTa: [
      'நீங்கள் சீட்டே வாங்காத ஒரு போட்டியில் பரிசு விழுந்ததாகக் கூறுவது.',
      'பரிசைப் பெறுவதற்கு முன்பணமாக வரி அல்லது கட்டணம் செலுத்தச் சொல்வது.',
      'பிரபல டிவி அல்லது அரசு லோகோ போட்ட போலி ஆடியோ வாட்ஸ்அப்பில் வருவது.'
    ],
    safetyStepsEn: [
      'Real lotteries and contests do not ask you to pay money to receive a prize.',
      'Do not reply, forward, or call the number in the message.',
      'Simply delete the message and block the sender.'
    ],
    safetyStepsTa: [
      'உண்மையான பரிசுகளுக்கு யாரும் முன்பணம் கேட்க மாட்டார்கள்.',
      'அந்த மெசேஜுக்கு பதில் அளிக்கவோ அல்லது மற்றவர்களுக்கு அனுப்பவோ வேண்டாம்.',
      'மெசேஜை அழித்துவிட்டு (Delete), அந்த எண்ணை பிளாக் (Block) செய்யுங்கள்.'
    ],
    goldenRuleEn: 'If you didn\'t buy a ticket, you didn\'t win. Never pay money to receive a prize.',
    goldenRuleTa: 'நீங்கள் சீட்டு வாங்கவில்லை என்றால் பரிசு விழ வாய்ப்பில்லை. பரிசுக்காக பணம் கட்டாதீர்கள்.'
  },
  {
    id: 'phone_call_police_impersonation',
    titleEn: '📞 Fake Police & Court Arrest Calls',
    titleTa: '📞 போலி போலீஸ் & கைது மிரட்டல் அழைப்புகள்',
    icon: 'PhoneCall',
    taglineEn: 'Scary calls claiming illegal parcels or family member in police custody',
    taglineTa: 'சட்டவிரோத பார்சல் அல்லது உறவினர் கைது என்ற மிரட்டல் அழைப்புகள்',
    whatIsItEn: 'Scammers pretend to be Mumbai/Delhi Police, CBI, FedEx, or Customs officers over a video call (wearing fake uniforms). They falsely claim a drug parcel was found in your Aadhaar name and threaten digital arrest unless you transfer your savings.',
    whatIsItTa: 'காவல்துறை அல்லது சுங்கத்துறை அதிகாரிகள் போல சீருடை அணிந்து வீடியோ காலில் வந்து, உங்கள் பெயரில் போதைப் பொருள் பார்சல் வந்துள்ளது என்று கூறி மிரட்டி பணத்தைப் பறிப்பார்கள்.',
    scammerSaysEn: '"This is Police Inspector. A parcel containing illegal items was sent with your Aadhaar. You are under Digital Arrest. Move your bank money to this RBI safe account for verification."',
    scammerSaysTa: '"நான் காவல் ஆய்வாளர் பேசுகிறேன். உங்கள் ஆதாரில் தடை செய்யப்பட்ட பார்சல் பிடிபட்டுள்ளது. வழக்கில் இருந்து தப்பிக்க உங்கள் பணத்தை இந்த பாதுகாப்பு கணக்கிற்கு மாற்றவும்."',
    warningSignsEn: [
      'There is NO such legal concept as "Digital Arrest" over Skype or WhatsApp video call.',
      'Extreme intimidation, demanding you stay locked in a room on video call.',
      'Demanding you transfer your life savings to a "verification account".'
    ],
    warningSignsTa: [
      'இந்திய சட்டத்தில் வீடியோ கால் மூலம் "டிஜிட்டல் கைது" (Digital Arrest) என்று ஒன்று கிடையவே கிடையாது.',
      'போனை கட் செய்யக்கூடாது என்று தொடர்ந்து மிரட்டுவது.',
      'உங்கள் சேமிப்புப் பணத்தை சரிபார்க்க வேறு கணக்கிற்கு மாற்றச் சொல்வது.'
    ],
    safetyStepsEn: [
      'Do not panic. Indian Police and Government agencies NEVER demand money transfers or conduct trials over WhatsApp.',
      'Immediately disconnect the video call.',
      'Inform your family or call the national cyber crime helpline 1930.'
    ],
    safetyStepsTa: [
      'பயப்பட வேண்டாம். காவல்துறை ஒருபோதும் வாட்ஸ்அப்பில் பணப் பரிமாற்றம் செய்யச் சொல்லாது.',
      'உடனே வீடியோ காலை துண்டிக்கவும்.',
      'குடும்பத்தாரிடம் கூறுங்கள் அல்லது 1930 என்ற சைபர் கிரைம் உதவி எண்ணை அழைக்கவும்.'
    ],
    goldenRuleEn: '"Digital Arrest" on video calls is 100% FAKE. Hang up immediately.',
    goldenRuleTa: 'வீடியோ காலில் "டிஜிட்டல் கைது" என்பது 100% போலி. உடனே போனை வையுங்கள்!'
  },
  {
    id: 'fake_job_work_from_home',
    titleEn: '💼 Fake Work-From-Home & Review Scams',
    titleTa: '💼 போலி பகுதிநேர வேலை மோசடி',
    icon: 'Briefcase',
    taglineEn: 'Earn ₹5,000 daily by liking YouTube videos or rating hotels',
    taglineTa: 'யூடியூப் லைக் செய்தால் தினமும் ₹5,000 கிடைக்கும் என்ற ஆசை வார்த்தை',
    whatIsItEn: 'Offers easy part-time work from home on Telegram/WhatsApp by simply giving 5-star ratings or liking videos. They pay a tiny ₹200 first, then lure you into investing thousands into a "crypto task" or "prepaid scheme" where you lose everything.',
    whatIsItTa: 'யூடியூப் வீடியோக்களுக்கு லைக் போட்டால் தினமும் ஆயிரக்கணக்கில் சம்பாதிக்கலாம் என்று வாட்ஸ்அப்பில் மெசேஜ் வரும். ஆரம்பத்தில் ₹200 கொடுத்துவிட்டு பின்னர் அதிக பணத்தை முதலீடு செய்ய வைத்து ஏமாற்றுவார்கள்.',
    scammerSaysEn: '"Earn ₹3,000 to ₹8,000 per day by giving ratings to Google maps places from your mobile. No experience needed. Join our Telegram group now."',
    scammerSaysTa: '"மொபைல் மூலமாக கூகுள் மேப்ஸில் ரேட்டிங் கொடுத்து தினமும் ₹3,000 முதல் ₹8,000 வரை சம்பாதிக்கலாம். அனுபவம் தேவையில்லை. டெலிகிராமில் இணையுங்கள்."',
    warningSignsEn: [
      'Unsolicited job offers from unknown foreign or Indian WhatsApp numbers.',
      'Unbelievably high daily pay for simple tasks like liking a video or typing captchas.',
      'Being asked to deposit your own money to unlock higher commissions.'
    ],
    warningSignsTa: [
      'தெரியாத எண்களிலிருந்து தானாக வரும் வேலை வாய்ப்பு மெசேஜ்கள்.',
      'வெறும் லைக் போடுவதற்கு மிக அதிக சம்பளம் தருவதாக கூறுவது.',
      'அதிக கமிஷன் பெற உங்கள் பணத்தை முதலில் முதலீடு செய்யச் சொல்வது.'
    ],
    safetyStepsEn: [
      'No genuine company pays thousands of rupees for simply liking social media posts.',
      'Never pay money to get a job or task commission.',
      'Block the sender immediately on WhatsApp and Telegram.'
    ],
    safetyStepsTa: [
      'வெறும் லைக் போடுவதற்கு எந்த ஒரு உண்மையான நிறுவனமும் ஆயிரக்கணக்கில் பணம் தராது.',
      'வேலைக்காகவோ அல்லது கமிஷனுக்காகவோ முன்பணம் கட்டாதீர்கள்.',
      'அந்த எண்ணை உடனே வாட்ஸ்அப்பில் பிளாக் (Block) செய்யுங்கள்.'
    ],
    goldenRuleEn: 'Legitimate jobs NEVER ask you to deposit money to earn commissions.',
    goldenRuleTa: 'சம்பளம் தருவதற்கு முன் உங்களிடம் பணம் கேட்கும் எந்த வேலையும் போலியானது.'
  }
];
