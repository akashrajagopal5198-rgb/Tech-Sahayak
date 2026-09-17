import { DeviceType, GuideStep } from '../types';

export interface PrebuiltGuide {
  keywords: string[];
  taskTitleEn: string;
  taskTitleTa: string;
  needsDevice: boolean;
  steps: {
    stepNumber: number;
    // Android
    androidEn: {
      instruction: string;
      detailExplanation?: string;
      stuckAlternative: string;
      visualHint?: string;
      iconHint?: string;
    };
    androidTa: {
      instruction: string;
      detailExplanation?: string;
      stuckAlternative: string;
      visualHint?: string;
      iconHint?: string;
    };
    // iPhone
    iphoneEn: {
      instruction: string;
      detailExplanation?: string;
      stuckAlternative: string;
      visualHint?: string;
      iconHint?: string;
    };
    iphoneTa: {
      instruction: string;
      detailExplanation?: string;
      stuckAlternative: string;
      visualHint?: string;
      iconHint?: string;
    };
  }[];
}

export const fallbackGuides: PrebuiltGuide[] = [
  {
    keywords: ['photo', 'picture', 'whatsapp', 'send photo', 'grandson', 'image', 'படம்', 'புகைப்படம்', 'வாட்ஸ்அப்'],
    taskTitleEn: 'Send a Photo on WhatsApp',
    taskTitleTa: 'வாட்ஸ்அப்பில் புகைப்படம் அனுப்புதல்',
    needsDevice: true,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Open the WhatsApp app on your phone.',
          detailExplanation: 'Tap the green icon with the white telephone inside.',
          stuckAlternative: 'Look for a bright green circular icon with a white phone symbol on your home screen or app menu. Tap it once gently.',
          visualHint: 'Green icon with white phone',
          iconHint: 'MessageSquare'
        },
        androidTa: {
          instruction: 'உங்கள் போனில் வாட்ஸ்அப் (WhatsApp) செயலியைத் திறக்கவும்.',
          detailExplanation: 'வெள்ளை தொலைபேசி சின்னம் கொண்ட பச்சை நிற ஐகானை தொடவும்.',
          stuckAlternative: 'உங்கள் திரையில் பச்சை நிற வட்டத்தில் வெள்ளை போன் படம் இருக்கும். அதை ஒருமுறை மெதுவாகத் தொடுங்கள்.',
          visualHint: 'பச்சை நிற போன் சின்னம்',
          iconHint: 'MessageSquare'
        },
        iphoneEn: {
          instruction: 'Open the WhatsApp app on your iPhone.',
          detailExplanation: 'Look for the green WhatsApp icon on your home screen and tap it.',
          stuckAlternative: 'Look for the green square icon with a white telephone inside. Tap it once.',
          visualHint: 'Green square with telephone',
          iconHint: 'MessageSquare'
        },
        iphoneTa: {
          instruction: 'உங்கள் ஐபோனில் வாட்ஸ்அப் (WhatsApp) செயலியைத் திறக்கவும்.',
          detailExplanation: 'முகப்புத் திரையில் உள்ள பச்சை நிற வாட்ஸ்அப் ஐகானைத் தொடவும்.',
          stuckAlternative: 'திரையில் பச்சை நிறத்தில் வெள்ளை போன் சின்னம் இருக்கும் சதுர ஐகானை ஒருமுறை தொடவும்.',
          visualHint: 'பச்சை சதுர ஐகான்',
          iconHint: 'MessageSquare'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Tap on the name of the person you want to send the photo to.',
          detailExplanation: 'Scroll gently through your chat list and tap their name once.',
          stuckAlternative: 'If you cannot find their name, look at the top right for the magnifying glass 🔍 search icon, tap it, and type their name.',
          visualHint: 'Search 🔍 or scroll to person name',
          iconHint: 'User'
        },
        androidTa: {
          instruction: 'புகைப்படம் அனுப்ப வேண்டிய நபரின் பெயரைத் தொட்டு அரட்டையைத் (Chat) திறக்கவும்.',
          detailExplanation: 'பட்டியலில் உள்ள நபரின் பெயரை ஒருமுறை தொடவும்.',
          stuckAlternative: 'பெயர் தெரியவில்லை என்றால், மேலே வலதுபுறம் உள்ள பூதக்கண்ணாடி 🔍 ஐகானைத் தொட்டு அவர்களின் பெயரைத் தட்டச்சு செய்யவும்.',
          visualHint: 'நபரின் பெயர் அல்லது 🔍 தேடல்',
          iconHint: 'User'
        },
        iphoneEn: {
          instruction: 'Tap the chat with the person you want to send the photo to.',
          detailExplanation: 'Tap their name from the list on your Chats tab.',
          stuckAlternative: 'Scroll up to the top and use the Search bar to type their name if they are not in the recent list.',
          visualHint: 'Chat conversation',
          iconHint: 'User'
        },
        iphoneTa: {
          instruction: 'புகைப்படம் அனுப்ப வேண்டிய நபரின் பெயரைத் தொடவும்.',
          detailExplanation: 'அரட்டைப் பட்டியலில் இருந்து அவர்களின் பெயரைத் தொடவும்.',
          stuckAlternative: 'மேலே உள்ள தேடல் பட்டியில் (Search) அவர்களின் பெயரைத் தட்டச்சு செய்து கண்டறியவும்.',
          visualHint: 'அரட்டைப் பட்டியல்',
          iconHint: 'User'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Tap the small Paperclip 📎 icon or Camera 📷 icon at the bottom of the screen.',
          detailExplanation: 'This is located right next to where you type your messages.',
          stuckAlternative: 'Look at the very bottom bar where you type. Look to the right of the typing box: there is a small metal paperclip 📎 or camera 📷. Tap that paperclip.',
          visualHint: '📎 Paperclip or 📷 Camera icon',
          iconHint: 'Paperclip'
        },
        androidTa: {
          instruction: 'திரையின் கீழே உள்ள பேப்பர்கிளிப் 📎 அல்லது கேமரா 📷 சின்னத்தைத் தொடவும்.',
          detailExplanation: 'செய்தி தட்டச்சு செய்யும் இடத்திற்கு அருகில் இது இருக்கும்.',
          stuckAlternative: 'மெசேஜ் டைப் செய்யும் பெட்டிக்கு அருகில் ஒரு சிறிய இரும்பு கிளிப் 📎 படம் இருக்கும். அதை ஒருமுறை தொடவும்.',
          visualHint: '📎 கிளிப் சின்னம்',
          iconHint: 'Paperclip'
        },
        iphoneEn: {
          instruction: 'Tap the Plus (+) button next to the message box at the bottom left.',
          detailExplanation: 'Look for the blue or gray circle with a + sign.',
          stuckAlternative: 'Look at the bottom left where you type messages. Tap the round circle with the Plus (+) sign.',
          visualHint: '➕ Plus button at bottom left',
          iconHint: 'Plus'
        },
        iphoneTa: {
          instruction: 'கீழே இடதுபுறத்தில் உள்ள பிளஸ் (+) குறியீட்டைத் தொடவும்.',
          detailExplanation: 'செய்தி பெட்டிக்கு இடதுபுறம் உள்ள வட்ட வடிவ + சின்னத்தைத் தொடவும்.',
          stuckAlternative: 'கீழே மெசேஜ் டைப் செய்யும் இடத்திற்கு இடதுபுறம் உள்ள நீல அல்லது சாம்பல் நிற + குறியை தொடவும்.',
          visualHint: '➕ பிளஸ் குறி',
          iconHint: 'Plus'
        }
      },
      {
        stepNumber: 4,
        androidEn: {
          instruction: 'Tap on "Gallery" 🖼️ and choose your photo.',
          detailExplanation: 'A menu will pop up. Tap the colorful Gallery icon to see all your pictures.',
          stuckAlternative: 'Look for the word "Gallery" with a picture frame icon. Tap it, then gently scroll to find your photo and tap on it once.',
          visualHint: 'Gallery / Photos icon',
          iconHint: 'Image'
        },
        androidTa: {
          instruction: '"கேலரி" (Gallery) 🖼️ என்பதைத் தொட்டு உங்கள் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.',
          detailExplanation: 'தோன்றும் பல வண்ண ஐகான்களில் கேலரி என்பதைத் தொட்டு, நீங்கள் அனுப்ப விரும்பும் புகைப்படத்தைத் தொடவும்.',
          stuckAlternative: 'கேலரி (Gallery) என்று எழுதியிருக்கும் வண்ணப் படத்தை தொடுங்கள். பின்னர் உங்கள் படத்தைத் தொடவும்.',
          visualHint: 'கேலரி / படங்கள்',
          iconHint: 'Image'
        },
        iphoneEn: {
          instruction: 'Tap "Photos" 🖼️ and select the picture you want to send.',
          detailExplanation: 'Tap the photo once so a small blue checkmark appears on it.',
          stuckAlternative: 'Tap "Photos" from the menu that popped up, then tap the photo you wish to send.',
          visualHint: 'Photos menu option',
          iconHint: 'Image'
        },
        iphoneTa: {
          instruction: '"புகைப்படங்கள்" (Photos) 🖼️ என்பதைத் தொட்டு படத்தை தேர்ந்தெடுக்கவும்.',
          detailExplanation: 'பட்டியலில் உள்ள புகைப்படத்தைத் தொட்டுத் தேர்ந்தெடுக்கவும்.',
          stuckAlternative: 'மெனுவில் உள்ள Photos என்பதைத் தொட்டு, அனுப்ப வேண்டிய படத்தை ஒருமுறை தொடவும்.',
          visualHint: 'Photos ஆப்ஷன்',
          iconHint: 'Image'
        }
      },
      {
        stepNumber: 5,
        androidEn: {
          instruction: 'Tap the green circle with the white paper airplane ✈️ / arrow at the bottom right to SEND.',
          detailExplanation: 'This will send the photo directly to the chat.',
          stuckAlternative: 'Look at the very bottom right corner of the screen for a bright green circular button with an arrow pointing right. Tap it once.',
          visualHint: 'Green Send button at bottom right',
          iconHint: 'Send'
        },
        androidTa: {
          instruction: 'கீழே வலதுபுறத்தில் உள்ள பச்சை நிற அம்பு / விமான ✈️ சின்னத்தைத் தொட்டு அனுப்பவும்.',
          detailExplanation: 'இது புகைப்படத்தை உடனடியாக அவர்களுக்கு அனுப்பிவிடும்.',
          stuckAlternative: 'திரையின் கீழ் வலது மூலையில் உள்ள வட்ட வடிவ பச்சை நிற பட்டனை (Arrow) ஒருமுறை அழுத்தவும்.',
          visualHint: 'பச்சை நிற Send பட்டன்',
          iconHint: 'Send'
        },
        iphoneEn: {
          instruction: 'Tap the blue circle with the white arrow ⬆️ at the bottom right to send.',
          detailExplanation: 'This delivers the photo.',
          stuckAlternative: 'Look at the bottom right corner for the round blue Send button with an arrow. Tap it once.',
          visualHint: 'Blue send arrow button',
          iconHint: 'Send'
        },
        iphoneTa: {
          instruction: 'கீழே வலதுபுறத்தில் உள்ள நீல நிற அம்பு ⬆️ பட்டனைத் தொட்டு அனுப்பவும்.',
          detailExplanation: 'இது புகைப்படத்தை அனுப்பிவிடும்.',
          stuckAlternative: 'கீழ் வலது மூலையில் உள்ள நீல நிற வட்ட பட்டனைத் தொடுங்கள்.',
          visualHint: 'நீல நிற Send பட்டன்',
          iconHint: 'Send'
        }
      }
    ]
  },
  {
    keywords: ['wifi', 'wi-fi', 'internet', 'connect wifi', 'வைஃபை', 'இணையம்'],
    taskTitleEn: 'Connect to Wi-Fi Internet',
    taskTitleTa: 'வைஃபை (Wi-Fi) இணைத்தல்',
    needsDevice: true,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Swipe down from the very top of your phone screen with your finger.',
          detailExplanation: 'This opens the quick settings notification panel.',
          stuckAlternative: 'Put your finger at the top black edge of your screen and slide it downwards toward the middle of the screen.',
          visualHint: 'Swipe down from top edge',
          iconHint: 'ArrowDown'
        },
        androidTa: {
          instruction: 'உங்கள் போன் திரையின் மேல் பகுதியிலிருந்து கீழே விரலால் இழுக்கவும் (Swipe down).',
          detailExplanation: 'இது விரைவு அமைப்புகள் பலகையைத் திறக்கும்.',
          stuckAlternative: 'திரையின் மேற்பகுதியில் விரலை வைத்து மெதுவாக கீழ்நோக்கி இழுங்கள்.',
          visualHint: 'மேலிருந்து கீழ்நோக்கி இழுக்கவும்',
          iconHint: 'ArrowDown'
        },
        iphoneEn: {
          instruction: 'Open the "Settings" ⚙️ app on your iPhone.',
          detailExplanation: 'Look for the gray icon with gears on your home screen.',
          stuckAlternative: 'Look for the gray square with mechanical gears ⚙️ labeled "Settings". Tap it once.',
          visualHint: 'Settings gear icon',
          iconHint: 'Settings'
        },
        iphoneTa: {
          instruction: 'உங்கள் ஐபோனில் "Settings" ⚙️ அமைப்பைத் திறக்கவும்.',
          detailExplanation: 'சாம்பல் நிற கியர் சக்கர ஐகானைத் தொடவும்.',
          stuckAlternative: 'முகப்புத் திரையில் Settings என்ற பெயரில் உள்ள சாம்பல் கியர் சின்னத்தை ஒருமுறை தொடவும்.',
          visualHint: 'Settings கியர் ஐகான்',
          iconHint: 'Settings'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Press and HOLD the Wi-Fi 📶 icon for 2 seconds.',
          detailExplanation: 'Holding it will open your full Wi-Fi network list.',
          stuckAlternative: 'Look for the icon with radio waves (fan shape) labeled Wi-Fi or Internet. Don\'t just tap it — keep your finger pressed on it for two full seconds.',
          visualHint: 'Hold the Wi-Fi wave icon',
          iconHint: 'Wifi'
        },
        androidTa: {
          instruction: 'வைஃபை (Wi-Fi 📶) சின்னத்தை 2 வினாடிகள் அழுத்திப் பிடிக்கவும்.',
          detailExplanation: 'இது கிடைக்கக்கூடிய வைஃபை நெட்வொர்க் பட்டியலைத் திறக்கும்.',
          stuckAlternative: 'அலை போன்ற சின்னம் (Fan shape) இருக்கும் Wi-Fi ஐகானை விரலால் 2 வினாடிகள் அழுத்திப் பிடியுங்கள்.',
          visualHint: 'வைஃபை அலை சின்னத்தை அழுத்திப் பிடிக்கவும்',
          iconHint: 'Wifi'
        },
        iphoneEn: {
          instruction: 'Tap on "Wi-Fi" near the top of the Settings list.',
          detailExplanation: 'Make sure the switch at the top is turned ON (Green).',
          stuckAlternative: 'Tap the second or third item labeled "Wi-Fi". If the switch next to it is gray, tap it to make it green.',
          visualHint: 'Wi-Fi menu option',
          iconHint: 'Wifi'
        },
        iphoneTa: {
          instruction: 'அமைப்புகள் பட்டியலில் மேலே உள்ள "Wi-Fi" என்பதைத் தொடவும்.',
          detailExplanation: 'வைஃபை சுவிட்ச் ஆன் (பச்சை நிறத்தில்) இருப்பதை உறுதிப்படுத்தவும்.',
          stuckAlternative: 'பட்டியலில் "Wi-Fi" என்பதைத் தொட்டு, அது ஆனில் உள்ளதா எனப் பாருங்கள்.',
          visualHint: 'Wi-Fi பட்டியல்',
          iconHint: 'Wifi'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Tap the name of your home Wi-Fi network.',
          detailExplanation: 'Look for the name printed on the back of your home router.',
          stuckAlternative: 'Read the list of available networks and tap the one that belongs to your home or office.',
          visualHint: 'Select network name',
          iconHint: 'List'
        },
        androidTa: {
          instruction: 'உங்கள் வீட்டு வைஃபை நெட்வொர்க்கின் பெயரைத் தொடவும்.',
          detailExplanation: 'உங்கள் வைஃபை ரூட்டரின் பெயரைக் கண்டறிந்து அதைத் தொடவும்.',
          stuckAlternative: 'திரையில் தோன்றும் பெயர்களில் உங்கள் வீட்டு வைஃபை பெயரை ஒருமுறை தொடவும்.',
          visualHint: 'வைஃபை பெயர்',
          iconHint: 'List'
        },
        iphoneEn: {
          instruction: 'Tap the name of your Wi-Fi network from the list.',
          detailExplanation: 'It appears under "OTHER NETWORKS" or "NETWORKS".',
          stuckAlternative: 'Tap on your home network name from the list displayed on the screen.',
          visualHint: 'Select network name',
          iconHint: 'List'
        },
        iphoneTa: {
          instruction: 'பட்டியலில் உள்ள உங்கள் வைஃபை நெட்வொர்க் பெயரைத் தொடவும்.',
          detailExplanation: 'உங்கள் வீட்டு வைஃபை பெயரைக் கிளிக் செய்யவும்.',
          stuckAlternative: 'திரையில் தெரியும் பட்டியலில் உங்கள் வீட்டு வைஃபை பெயரைத் தொடவும்.',
          visualHint: 'வைஃபை பெயர்',
          iconHint: 'List'
        }
      },
      {
        stepNumber: 4,
        androidEn: {
          instruction: 'Type your Wi-Fi password and tap "Connect".',
          detailExplanation: 'Make sure capital and small letters match exactly.',
          stuckAlternative: 'Type the password slowly. If you want to see what you type, tap the small eye 👁️ icon to reveal the letters, then tap "Connect".',
          visualHint: 'Type password and tap Connect',
          iconHint: 'Key'
        },
        androidTa: {
          instruction: 'உங்கள் வைஃபை கடவுச்சொல்லை (Password) தட்டச்சு செய்து "Connect" என்பதைத் தொடவும்.',
          detailExplanation: 'பெரிய (Capital) மற்றும் சிறிய எழுத்துக்களை சரியாக உள்ளிடவும்.',
          stuckAlternative: 'கடவுச்சொல்லை மெதுவாக தட்டச்சு செய்து, கடவுச்சொல் சரியாக உள்ளதா எனப் பார்த்துவிட்டு "Connect" அல்லது "இணை" என்பதைத் தொடவும்.',
          visualHint: 'கடவுச்சொல் உள்ளிட்டு Connect அழுத்தவும்',
          iconHint: 'Key'
        },
        iphoneEn: {
          instruction: 'Enter your Wi-Fi password and tap "Join" in the top right corner.',
          detailExplanation: 'Capitalization matters for passwords.',
          stuckAlternative: 'Type the password and then look at the very top right corner of the screen and tap the blue word "Join".',
          visualHint: 'Type password & tap Join',
          iconHint: 'Key'
        },
        iphoneTa: {
          instruction: 'கடவுச்சொல்லை உள்ளிட்டு மேலே வலதுபுறத்தில் உள்ள "Join" என்பதைத் தொடவும்.',
          detailExplanation: 'கடவுச்சொல்லை சரியாக தட்டச்சு செய்யவும்.',
          stuckAlternative: 'பாஸ்வேர்டை தட்டச்சு செய்த பின் மேல் வலது மூலையில் உள்ள "Join" என்ற நீல நிற வார்த்தையைத் தொடவும்.',
          visualHint: 'Join பட்டன்',
          iconHint: 'Key'
        }
      }
    ]
  },
  {
    keywords: ['bluetooth', 'earphones', 'headphones', 'earbuds', 'connect bluetooth', 'புளூடூத்', 'ஹெட்போன்'],
    taskTitleEn: 'Connect Bluetooth Earphones',
    taskTitleTa: 'புளூடூத் இயர்போன் இணைத்தல்',
    needsDevice: true,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Turn ON your Bluetooth earphones and put them in pairing mode.',
          detailExplanation: 'Usually you hold the power button on the earphone until a blue/red light blinks.',
          stuckAlternative: 'If using wireless earbuds, take them out of their charging case and keep them close to your phone.',
          visualHint: 'Turn earphones ON (blinking light)',
          iconHint: 'Headphones'
        },
        androidTa: {
          instruction: 'உங்கள் புளூடூத் இயர்போனை ஆன் (ON) செய்து வைத்துக்கொள்ளுங்கள்.',
          detailExplanation: 'இயர்போனின் பட்டனை நீல அல்லது சிவப்பு விளக்கு ஒளிரும் வரை அழுத்திப் பிடிக்கவும்.',
          stuckAlternative: 'வயர்லெஸ் இயர்பட்ஸ் என்றால், அவற்றை சார்ஜிங் பெட்டியிலிருந்து வெளியே எடுத்து போனுக்கு அருகில் வைக்கவும்.',
          visualHint: 'இயர்போனை ஆன் செய்யவும்',
          iconHint: 'Headphones'
        },
        iphoneEn: {
          instruction: 'Turn on your Bluetooth earphones so they are ready to connect.',
          detailExplanation: 'Ensure the indicator light is blinking.',
          stuckAlternative: 'Power on your earbuds or headphones and place them next to your iPhone.',
          visualHint: 'Power on earphones',
          iconHint: 'Headphones'
        },
        iphoneTa: {
          instruction: 'உங்கள் புளூடூத் இயர்போனை ஆன் செய்து போனுக்கு அருகில் வைக்கவும்.',
          detailExplanation: 'விளக்கு ஒளிர்கிறதா எனப் பார்க்கவும்.',
          stuckAlternative: 'இயர்பட்ஸை பெட்டியிலிருந்து வெளியே எடுத்து போனின் அருகே வைக்கவும்.',
          visualHint: 'இயர்போனை ஆன் செய்யவும்',
          iconHint: 'Headphones'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Swipe down from the top of your screen and HOLD the Bluetooth ᛒ icon.',
          detailExplanation: 'Keep your finger pressed on the Bluetooth symbol for 2 seconds.',
          stuckAlternative: 'Swipe down from the top edge of your screen. Look for the "B" symbol with angular points. Press and hold it.',
          visualHint: 'Hold the ᛒ Bluetooth icon',
          iconHint: 'Bluetooth'
        },
        androidTa: {
          instruction: 'திரையின் மேற்பகுதியிலிருந்து கீழே இழுத்து புளூடூத் (Bluetooth ᛒ) சின்னத்தை அழுத்திப் பிடிக்கவும்.',
          detailExplanation: 'புளூடூத் சின்னத்தை 2 வினாடிகள் அழுத்திப் பிடிக்கவும்.',
          stuckAlternative: 'மேலிருந்து கீழே விரலை இழுத்து, ᛒ சின்னம் இருக்கும் புளூடூத் ஐகானை விரலால் அழுத்திப் பிடியுங்கள்.',
          visualHint: 'ᛒ புளூடூத் ஐகானை அழுத்திப் பிடிக்கவும்',
          iconHint: 'Bluetooth'
        },
        iphoneEn: {
          instruction: 'Open Settings ⚙️ and tap "Bluetooth".',
          detailExplanation: 'Make sure the Bluetooth green toggle is turned ON.',
          stuckAlternative: 'Go into Settings on your iPhone and tap the Bluetooth option near the top.',
          visualHint: 'Settings > Bluetooth',
          iconHint: 'Bluetooth'
        },
        iphoneTa: {
          instruction: 'Settings ⚙️ திறந்து "Bluetooth" என்பதைத் தொடவும்.',
          detailExplanation: 'புளூடூத் ஆன் (பச்சை நிறத்தில்) உள்ளதை உறுதிப்படுத்தவும்.',
          stuckAlternative: 'செட்டிங்ஸ் உள்ளே சென்று மேலே உள்ள Bluetooth என்ற பிரிவைத் தொடவும்.',
          visualHint: 'Settings > Bluetooth',
          iconHint: 'Bluetooth'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Tap "Pair new device" or look for your earphone name in the list, then tap it.',
          detailExplanation: 'Your phone will search for nearby Bluetooth devices.',
          stuckAlternative: 'Look for words like "Pair new device" or look at the bottom list for your brand name (e.g. boAt, Noise, Sony, Realme) and tap it.',
          visualHint: 'Tap earphone name from list',
          iconHint: 'List'
        },
        androidTa: {
          instruction: '"Pair new device" என்பதைத் தொடவும் அல்லது உங்கள் இயர்போன் பெயரைத் தொடவும்.',
          detailExplanation: 'உங்கள் போன் அருகிலுள்ள சாதனங்களைத் தேடும்.',
          stuckAlternative: 'பட்டியலில் உங்கள் இயர்போனின் பிராண்ட் பெயர் (boAt, Noise, Realme போன்றவை) தெரிந்ததும் அதைத் தொடவும்.',
          visualHint: 'இயர்போன் பெயர்',
          iconHint: 'List'
        },
        iphoneEn: {
          instruction: 'Tap the name of your headphones under "OTHER DEVICES".',
          detailExplanation: 'Your iPhone will immediately link to them.',
          stuckAlternative: 'Look at the bottom of the Bluetooth screen under Other Devices. Tap your earphone name once.',
          visualHint: 'Tap device under Other Devices',
          iconHint: 'List'
        },
        iphoneTa: {
          instruction: 'பட்டியலில் "OTHER DEVICES" கீழ் உள்ள உங்கள் இயர்போன் பெயரைத் தொடவும்.',
          detailExplanation: 'ஐபோன் உடனே அதனுடன் இணையும்.',
          stuckAlternative: 'திரையின் கீழ் பகுதியில் தெரியும் உங்கள் இயர்போன் பெயரை ஒருமுறை தொடவும்.',
          visualHint: 'சாதனப் பெயர்',
          iconHint: 'List'
        }
      },
      {
        stepNumber: 4,
        androidEn: {
          instruction: 'If a pop-up asks "Allow pairing?", tap "PAIR" or "ALLOW".',
          detailExplanation: 'Your earphones are now connected!',
          stuckAlternative: 'A small box may appear asking for permission. Tap the blue or highlighted button that says "Pair" or "OK".',
          visualHint: 'Tap PAIR to confirm',
          iconHint: 'Check'
        },
        androidTa: {
          instruction: 'திரையில் "Pair" செய்ய அனுமதி கேட்டால் "PAIR" அல்லது "OK" என்பதைத் தொடவும்.',
          detailExplanation: 'உங்கள் இயர்போன் இப்போது வெற்றிகரமாக இணைந்துவிட்டது!',
          stuckAlternative: 'திரையில் தோன்றும் சிறிய கட்டத்தில் "Pair" அல்லது "Allow" என்பதைத் தொடுங்கள்.',
          visualHint: 'PAIR பொத்தானைத் தொடவும்',
          iconHint: 'Check'
        },
        iphoneEn: {
          instruction: 'Wait until the word "Connected" appears next to your earphones.',
          detailExplanation: 'You will hear a chime in your earphones when connected.',
          stuckAlternative: 'Once it shows "Connected" in blue or black next to the device name, you are ready to listen.',
          visualHint: 'Shows "Connected"',
          iconHint: 'Check'
        },
        iphoneTa: {
          instruction: 'இயர்போன் பெயருக்கு அருகில் "Connected" என்று வரும் வரை காத்திருங்கள்.',
          detailExplanation: 'இப்போது உங்கள் இயர்போன் போனுடன் இணைந்துவிட்டது.',
          stuckAlternative: 'Connected என்று மாறியதும் நீங்கள் பாடல்கள் அல்லது அழைப்புகளைக் கேட்கலாம்.',
          visualHint: 'Connected நிலை',
          iconHint: 'Check'
        }
      }
    ]
  },
  {
    keywords: ['font size', 'text size', 'letters bigger', 'make letters bigger', 'zoom text', 'எழுத்து பெரிதாக்க', 'பெரிய எழுத்து'],
    taskTitleEn: 'Make Letters Bigger on Screen',
    taskTitleTa: 'திரையில் உள்ள எழுத்துக்களை பெரிதாக்குதல்',
    needsDevice: true,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Open the "Settings" ⚙️ app on your phone.',
          detailExplanation: 'Look for the gear icon on your home screen or swipe down and tap the small gear at top right.',
          stuckAlternative: 'Swipe down from the very top of your screen. Look in the top right corner for a small mechanical gear ⚙️ icon and tap it.',
          visualHint: 'Settings ⚙️ gear icon',
          iconHint: 'Settings'
        },
        androidTa: {
          instruction: 'உங்கள் போனில் "Settings" ⚙️ செயலியைத் திறக்கவும்.',
          detailExplanation: 'கியர் சக்கர ஐகானைத் தொடவும் அல்லது திரையை மேலிருந்து கீழே இழுத்து சிறிய கியர் சின்னத்தைத் தொடவும்.',
          stuckAlternative: 'திரையின் மேல் பகுதியிலிருந்து கீழே இழுத்து, மேல் வலது மூலையில் உள்ள சிறிய கியர் ⚙️ சின்னத்தைத் தொடுங்கள்.',
          visualHint: 'Settings கியர் ஐகான்',
          iconHint: 'Settings'
        },
        iphoneEn: {
          instruction: 'Open the "Settings" ⚙️ app on your iPhone.',
          detailExplanation: 'Look for the gray gears icon on your home screen.',
          stuckAlternative: 'Find the gray icon labeled "Settings" on your home screen and tap it once.',
          visualHint: 'Settings ⚙️ icon',
          iconHint: 'Settings'
        },
        iphoneTa: {
          instruction: 'உங்கள் ஐபோனில் "Settings" ⚙️ அமைப்பைத் திறக்கவும்.',
          detailExplanation: 'சாம்பல் நிற கியர் ஐகானைத் தொடவும்.',
          stuckAlternative: 'முகப்புத் திரையில் Settings என்ற சாம்பல் நிற கியர் சின்னத்தைத் தொடவும்.',
          visualHint: 'Settings கியர் ஐகான்',
          iconHint: 'Settings'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Scroll down and tap "Display" ☀️.',
          detailExplanation: 'Look for the brightness or sun symbol.',
          stuckAlternative: 'Gently slide your finger upwards on the screen to scroll down until you see the word "Display" or "Screen". Tap it.',
          visualHint: 'Display / Screen option',
          iconHint: 'Sun'
        },
        androidTa: {
          instruction: 'கீழே நகர்த்தி "Display" ☀️ (திரை) என்பதைத் தொடவும்.',
          detailExplanation: 'சூரியன் அல்லது ஒளி போன்ற சின்னம் கொண்ட பிரிவைத் தொடவும்.',
          stuckAlternative: 'திரையை மேல்நோக்கி மெதுவாக உருட்டி (Scroll), "Display" அல்லது "திரை அமைப்பு" என்ற வார்த்தையைத் தொடுங்கள்.',
          visualHint: 'Display ஆப்ஷன்',
          iconHint: 'Sun'
        },
        iphoneEn: {
          instruction: 'Scroll down and tap "Display & Brightness" ☀️.',
          detailExplanation: 'Look for the sun/letters icon in the settings list.',
          stuckAlternative: 'Slide down the settings menu and tap the option that says "Display & Brightness".',
          visualHint: 'Display & Brightness',
          iconHint: 'Sun'
        },
        iphoneTa: {
          instruction: 'கீழே நகர்த்தி "Display & Brightness" ☀️ என்பதைத் தொடவும்.',
          detailExplanation: 'சூரியன் சின்னம் உள்ள Display & Brightness பிரிவைத் தொடவும்.',
          stuckAlternative: 'பட்டியலில் Display & Brightness என்ற வரியைத் தொடுங்கள்.',
          visualHint: 'Display & Brightness',
          iconHint: 'Sun'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Tap "Font size and style" or "Font size".',
          detailExplanation: 'This controls how large words appear across all apps.',
          stuckAlternative: 'Look for the words "Font size", "Text size", or "Display size" and tap on it.',
          visualHint: 'Font size option',
          iconHint: 'Type'
        },
        androidTa: {
          instruction: '"Font size" அல்லது "எழுத்து அளவு" என்பதைத் தொடவும்.',
          detailExplanation: 'இது அனைத்து செயலிகளிலும் எழுத்தின் அளவை மாற்றும்.',
          stuckAlternative: '"Font size" அல்லது "Text size" என்று எழுதியிருப்பதைத் தொடுங்கள்.',
          visualHint: 'Font size ஆப்ஷன்',
          iconHint: 'Type'
        },
        iphoneEn: {
          instruction: 'Tap "Text Size".',
          detailExplanation: 'You will see a slider at the bottom of the screen.',
          stuckAlternative: 'Look for the row that says "Text Size" and tap it once.',
          visualHint: 'Text Size option',
          iconHint: 'Type'
        },
        iphoneTa: {
          instruction: '"Text Size" என்பதைத் தொடவும்.',
          detailExplanation: 'திரையின் கீழே ஒரு அளவுகோல் தோன்றும்.',
          stuckAlternative: '"Text Size" என்ற வரியைத் தொடவும்.',
          visualHint: 'Text Size ஆப்ஷன்',
          iconHint: 'Type'
        }
      },
      {
        stepNumber: 4,
        androidEn: {
          instruction: 'Slide the small circle to the RIGHT to make letters bigger.',
          detailExplanation: 'You will see the sample text get larger immediately as you slide it.',
          stuckAlternative: 'Put your finger on the round dot on the line at the bottom and drag it toward the right side. Stop when the letters are easy for your eyes to read.',
          visualHint: 'Slide dot to the right',
          iconHint: 'Sliders'
        },
        androidTa: {
          instruction: 'கீழே உள்ள சிறிய வட்டத்தை வலதுபுறமாக (Right) இழுத்து எழுத்துக்களை பெரிதாக்கவும்.',
          detailExplanation: 'நீங்கள் இழுக்கும்போது எழுத்துக்கள் உடனடியாக பெரிதாவதைக் காணலாம்.',
          stuckAlternative: 'கீழே உள்ள கோட்டில் இருக்கும் புள்ளியை விரலால் தொட்டு வலது பக்கத்திற்கு இழுங்கள். உங்கள் கண்களுக்கு வசதியான அளவில் நிறுத்துங்கள்.',
          visualHint: 'புள்ளியை வலதுபுறம் இழுக்கவும்',
          iconHint: 'Sliders'
        },
        iphoneEn: {
          instruction: 'Drag the slider at the bottom to the RIGHT to enlarge the text.',
          detailExplanation: 'Stop when the size is comfortable for your eyes.',
          stuckAlternative: 'Touch the white slider notch at the bottom and pull it towards the right. The sample text above will grow bigger.',
          visualHint: 'Drag slider to the right',
          iconHint: 'Sliders'
        },
        iphoneTa: {
          instruction: 'கீழே உள்ள ஸ்லைடரை வலதுபுறமாக இழுத்து எழுத்துக்களை பெரிதாக்கவும்.',
          detailExplanation: 'உங்களுக்குப் பிடித்த அளவில் நிறுத்துங்கள்.',
          stuckAlternative: 'கீழே உள்ள பட்டியை வலதுபுறம் நகர்த்தி எழுத்தின் அளவை பெரிதாக்குங்கள்.',
          visualHint: 'ஸ்லைடரை வலதுபுறம் இழுக்கவும்',
          iconHint: 'Sliders'
        }
      }
    ]
  },
  {
    keywords: ['video call', 'whatsapp call', 'grandson video', 'family call', 'வீடியோ கால்', 'அழைப்பு'],
    taskTitleEn: 'Make a Video Call on WhatsApp',
    taskTitleTa: 'வாட்ஸ்அப்பில் வீடியோ கால் செய்தல்',
    needsDevice: false,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Open WhatsApp and tap on the person you want to call.',
          detailExplanation: 'Open their chat conversation.',
          stuckAlternative: 'Tap the green WhatsApp icon, then tap the name of your family member or friend.',
          visualHint: 'Open WhatsApp > Chat',
          iconHint: 'MessageSquare'
        },
        androidTa: {
          instruction: 'வாட்ஸ்அப்பைத் திறந்து நீங்கள் அழைக்க விரும்பும் நபரின் பெயரைத் தொடவும்.',
          detailExplanation: 'அவர்களின் அரட்டைப் பக்கத்தைத் திறக்கவும்.',
          stuckAlternative: 'பச்சை நிற வாட்ஸ்அப் ஐகானைத் தொட்டு, உங்கள் குடும்பத்தினரின் பெயரைத் தொடவும்.',
          visualHint: 'வாட்ஸ்அப் > நபர் பெயர்',
          iconHint: 'MessageSquare'
        },
        iphoneEn: {
          instruction: 'Open WhatsApp and tap on the person you want to call.',
          detailExplanation: 'Open their chat conversation.',
          stuckAlternative: 'Tap WhatsApp, then tap the person\'s name from your chat list.',
          visualHint: 'Open WhatsApp > Chat',
          iconHint: 'MessageSquare'
        },
        iphoneTa: {
          instruction: 'வாட்ஸ்அப்பைத் திறந்து நீங்கள் அழைக்க விரும்பும் நபரின் பெயரைத் தொடவும்.',
          detailExplanation: 'அவர்களின் அரட்டைப் பக்கத்தைத் திறக்கவும்.',
          stuckAlternative: 'வாட்ஸ்அப் செயலியைத் திறந்து நபரின் பெயரைத் தொடவும்.',
          visualHint: 'வாட்ஸ்அப் > நபர் பெயர்',
          iconHint: 'MessageSquare'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Look at the top right corner and tap the Video Camera 📹 icon.',
          detailExplanation: 'This is the small video recorder symbol next to the phone call icon.',
          stuckAlternative: 'Look at the very top bar on the right side next to their name. You will see a small camera symbol 📹 and a phone symbol 📞. Tap the CAMERA symbol.',
          visualHint: 'Video camera 📹 icon at top right',
          iconHint: 'Video'
        },
        androidTa: {
          instruction: 'மேலே வலது மூலையில் உள்ள வீடியோ கேமரா 📹 சின்னத்தைத் தொடவும்.',
          detailExplanation: 'அவர்களின் பெயருக்கு அருகில் இருக்கும் சிறிய வீடியோ கேமரா குறியீட்டைத் தொடவும்.',
          stuckAlternative: 'மேல் வலதுபுறத்தில் ஒரு போன் சின்னமும் 📞 கேமரா சின்னமும் 📹 இருக்கும். அதில் கேமரா சின்னத்தை ஒருமுறை தொடுங்கள்.',
          visualHint: '📹 வீடியோ கேமரா சின்னம்',
          iconHint: 'Video'
        },
        iphoneEn: {
          instruction: 'Tap the Video Camera 📹 icon at the top right corner.',
          detailExplanation: 'Located next to the audio phone icon.',
          stuckAlternative: 'Look at the top right corner of the chat screen and tap the video camera icon 📹.',
          visualHint: 'Video camera 📹 icon',
          iconHint: 'Video'
        },
        iphoneTa: {
          instruction: 'மேல் வலது மூலையில் உள்ள வீடியோ கேமரா 📹 சின்னத்தைத் தொடவும்.',
          detailExplanation: 'நபரின் பெயருக்கு அருகில் இருக்கும் கேமரா குறியீட்டைத் தொடவும்.',
          stuckAlternative: 'மேல் வலதுபுறத்தில் உள்ள வீடியோ கேமரா ஐகானைத் தொடவும்.',
          visualHint: '📹 வீடியோ கேமரா சின்னம்',
          iconHint: 'Video'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Hold the phone upright in front of your face and wait for them to answer.',
          detailExplanation: 'When they pick up, you will see their face on the big screen and your face in the small box.',
          stuckAlternative: 'Keep the phone at eye level. When they answer, talk normally just like speaking in person.',
          visualHint: 'Hold phone up at eye level',
          iconHint: 'Smile'
        },
        androidTa: {
          instruction: 'போனை உங்கள் முகத்திற்கு நேராகப் பிடித்துக்கொண்டு அவர்கள் எடுக்கும் வரை காத்திருங்கள்.',
          detailExplanation: 'அவர்கள் போனை எடுத்தவுடன் உங்கள் இருவரின் முகமும் திரையில் தோன்றும்.',
          stuckAlternative: 'போனை முகத்திற்கு நேராகப் பிடியுங்கள். அவர்கள் அழைப்பை ஏற்றதும் சாதாரணமாகப் பேசுங்கள்.',
          visualHint: 'போனை முகத்திற்கு நேராகப் பிடிக்கவும்',
          iconHint: 'Smile'
        },
        iphoneEn: {
          instruction: 'Hold your iPhone in front of you and wait for your family member to answer.',
          detailExplanation: 'Speak clearly into the microphone.',
          stuckAlternative: 'Hold the phone up so the front camera sees you, and wait for them to answer.',
          visualHint: 'Hold phone at eye level',
          iconHint: 'Smile'
        },
        iphoneTa: {
          instruction: 'போனை நேராகப் பிடித்து அவர்கள் அழைப்பை ஏற்கும் வரை காத்திருக்கவும்.',
          detailExplanation: 'அழைப்பை ஏற்றவுடன் திரையில் அவர்களின் முகம் தெரியும்.',
          stuckAlternative: 'போனை நேராகப் பிடித்துப் பேசுங்கள்.',
          visualHint: 'போனை நேராகப் பிடிக்கவும்',
          iconHint: 'Smile'
        }
      },
      {
        stepNumber: 4,
        androidEn: {
          instruction: 'To end the call when finished, tap the RED circular button with the hanging phone 📞 symbol.',
          detailExplanation: 'This cleanly disconnects the video call.',
          stuckAlternative: 'Tap the screen once if controls disappeared. Look at the bottom for the big RED button and tap it to hang up.',
          visualHint: 'Red button to end call',
          iconHint: 'PhoneOff'
        },
        androidTa: {
          instruction: 'பேசி முடித்ததும் அழைப்பை முடிக்க கீழே உள்ள சிவப்பு நிற 📞 பொத்தானைத் தொடவும்.',
          detailExplanation: 'இது வீடியோ அழைப்பை துண்டித்துவிடும்.',
          stuckAlternative: 'திரையில் பட்டன் தெரியவில்லை என்றால் திரையை ஒருமுறை தொடுங்கள். கீழே உள்ள பெரிய சிவப்பு பட்டனைத் தொட்டு அழைப்பை முடிக்கவும்.',
          visualHint: 'சிவப்பு நிற End Call பட்டன்',
          iconHint: 'PhoneOff'
        },
        iphoneEn: {
          instruction: 'Tap the RED button at the bottom when you want to hang up.',
          detailExplanation: 'This ends the video call.',
          stuckAlternative: 'Tap the red circular button to end the call when done.',
          visualHint: 'Red end call button',
          iconHint: 'PhoneOff'
        },
        iphoneTa: {
          instruction: 'அழைப்பை முடிக்க கீழே உள்ள சிவப்பு நிற பட்டனைத் தொடவும்.',
          detailExplanation: 'இது வீடியோ அழைப்பை துண்டிக்கும்.',
          stuckAlternative: 'கீழே உள்ள சிவப்பு பட்டனைத் தொடவும்.',
          visualHint: 'சிவப்பு End Call பட்டன்',
          iconHint: 'PhoneOff'
        }
      }
    ]
  },
  {
    keywords: ['screenshot', 'take screenshot', 'capture screen', 'திரைப்படம்', 'ஸ்கிரீன்ஷாட்'],
    taskTitleEn: 'Take a Screenshot of your Screen',
    taskTitleTa: 'ஸ்கிரீன்ஷாட் (Screenshot) எடுப்பது எப்படி',
    needsDevice: true,
    steps: [
      {
        stepNumber: 1,
        androidEn: {
          instruction: 'Open the screen or message you want to take a picture of.',
          detailExplanation: 'Make sure whatever you want to save is clearly visible on the screen.',
          stuckAlternative: 'Navigate on your phone until you see the exact page, photo, or message you want to capture.',
          visualHint: 'Display the target screen',
          iconHint: 'Smartphone'
        },
        androidTa: {
          instruction: 'நீங்கள் படம் பிடிக்க விரும்பும் திரை அல்லது செய்தியைத் திறந்து வைத்துக்கொள்ளுங்கள்.',
          detailExplanation: 'நீங்கள் சேமிக்க விரும்பும் பக்கம் திரையில் தெரிய வேண்டும்.',
          stuckAlternative: 'எந்த மெசேஜ் அல்லது படத்தை சேமிக்க வேண்டுமோ அதை திரையில் வைத்துக் கொள்ளுங்கள்.',
          visualHint: 'தேவையான திரைப் பக்கம்',
          iconHint: 'Smartphone'
        },
        iphoneEn: {
          instruction: 'Go to the screen or image you want to capture.',
          detailExplanation: 'Keep that screen open on your iPhone.',
          stuckAlternative: 'Open the app or photo you want to take a picture of.',
          visualHint: 'Open target screen',
          iconHint: 'Smartphone'
        },
        iphoneTa: {
          instruction: 'நீங்கள் சேமிக்க விரும்பும் திரைப் பக்கத்தைத் திறந்து வையுங்கள்.',
          detailExplanation: 'அந்தப் பக்கம் திரையில் தெரிய வேண்டும்.',
          stuckAlternative: 'எந்தப் பக்கத்தை படம் பிடிக்க வேண்டுமோ அதைத் திறந்து வைக்கவும்.',
          visualHint: 'திரைப் பக்கம்',
          iconHint: 'Smartphone'
        }
      },
      {
        stepNumber: 2,
        androidEn: {
          instruction: 'Press the Power button and the Volume Down button AT THE SAME TIME and release quickly.',
          detailExplanation: 'These are the physical buttons on the side edges of your phone.',
          stuckAlternative: 'Locate the button you use to turn on the screen (Power) and the bottom volume button (Volume Down). Press both down together for just 1 second. You will see the screen flash.',
          visualHint: 'Press Power + Volume Down together',
          iconHint: 'Maximize2'
        },
        androidTa: {
          instruction: 'போனின் பவர் பட்டன் (Power) மற்றும் சவுண்ட் குறைக்கும் பட்டனை (Volume Down) ஒரே நேரத்தில் அழுத்தி உடனே விடுங்கள்.',
          detailExplanation: 'இது உங்கள் போனின் பக்கவாட்டில் உள்ள பட்டன்கள்.',
          stuckAlternative: 'போன் பக்கவாட்டில் உள்ள பவர் பட்டனையும் சவுண்ட் குறைக்கும் கீழ் பட்டனையும் ஒரே நேரத்தில் ஒரு வினாடி மட்டும் அழுத்தி விடுங்கள். திரை மின்னும்.',
          visualHint: 'Power + Volume Down பட்டன்கள்',
          iconHint: 'Maximize2'
        },
        iphoneEn: {
          instruction: 'Press the Side Button and the Volume UP button at the same time, then quickly release both.',
          detailExplanation: '(On older iPhones with a Home button, press Side Button + Home Button).',
          stuckAlternative: 'Press the button on the right side and the top volume button on the left side simultaneously, then let go immediately.',
          visualHint: 'Press Side + Volume Up together',
          iconHint: 'Maximize2'
        },
        iphoneTa: {
          instruction: 'வலது பக்க பட்டனையும், இடது பக்க சவுண்ட் கூட்டும் பட்டனையும் (Volume UP) ஒரே நேரத்தில் அழுத்தி உடனே விடுங்கள்.',
          detailExplanation: 'ஹோம் பட்டன் உள்ள பழைய ஐபோன் என்றால் Side Button + Home Button அழுத்தவும்.',
          stuckAlternative: 'வலது பக்க பட்டனையும் இடது பக்க மேல் பட்டனையும் ஒன்றாக அழுத்தி விடுங்கள்.',
          visualHint: 'Side + Volume Up பட்டன்கள்',
          iconHint: 'Maximize2'
        }
      },
      {
        stepNumber: 3,
        androidEn: {
          instruction: 'Your screenshot is saved! You can find it in your Gallery or Photos app.',
          detailExplanation: 'Look for an album named "Screenshots".',
          stuckAlternative: 'Open your Gallery / Photos app. Look at your most recent pictures or the "Screenshots" folder.',
          visualHint: 'Saved in Gallery / Photos',
          iconHint: 'Check'
        },
        androidTa: {
          instruction: 'ஸ்கிரீன்ஷாட் சேமிக்கப்பட்டது! உங்கள் கேலரி (Gallery / Photos) செயலியில் இதை பார்க்கலாம்.',
          detailExplanation: '"Screenshots" என்ற ஆல்பத்தில் இது இருக்கும்.',
          stuckAlternative: 'கேலரி ஆப்பைத் திறந்தால் சமீபத்திய படங்களில் இந்த ஸ்கிரீன்ஷாட் இருக்கும்.',
          visualHint: 'கேலரியில் சேமிக்கப்பட்டது',
          iconHint: 'Check'
        },
        iphoneEn: {
          instruction: 'The screenshot is saved automatically to your Photos app.',
          detailExplanation: 'A small thumbnail will appear in the bottom-left corner briefly.',
          stuckAlternative: 'Open the Photos app and tap "Recents" or "Screenshots" album to see your captured image.',
          visualHint: 'Saved to Photos app',
          iconHint: 'Check'
        },
        iphoneTa: {
          instruction: 'ஸ்கிரீன்ஷாட் உங்கள் Photos ஆப்பில் தானாகவே சேமிக்கப்பட்டுவிட்டது.',
          detailExplanation: 'Photos ஆப்பைத் திறந்து சமீபத்திய புகைப்படங்களில் பார்க்கலாம்.',
          stuckAlternative: 'Photos ஆப்பில் Screenshots ஆல்பத்தில் இது இருக்கும்.',
          visualHint: 'Photos ஆப்பில் சேமிக்கப்பட்டது',
          iconHint: 'Check'
        }
      }
    ]
  }
];

export function findMatchingFallbackGuide(query: string): PrebuiltGuide | null {
  const q = query.toLowerCase().trim();
  for (const guide of fallbackGuides) {
    for (const kw of guide.keywords) {
      if (q.includes(kw.toLowerCase())) {
        return guide;
      }
    }
  }
  return null;
}

export function findFallbackGuide(
  query: string,
  language: 'en' | 'ta',
  device: DeviceType
): { title: string; totalSteps: number; needsDevice: boolean; steps: GuideStep[] } | null {

  const guide = findMatchingFallbackGuide(query);
  if (!guide) return null;

  const isAndroid = device === 'android' || device === 'unknown' || device === 'not_needed';
  const isTamil = language === 'ta';

  const steps: GuideStep[] = guide.steps.map((s, idx) => {
    let chosen;
    if (isAndroid) {
      chosen = isTamil ? s.androidTa : s.androidEn;
    } else {
      chosen = isTamil ? s.iphoneTa : s.iphoneEn;
    }

    return {
      stepNumber: s.stepNumber,
      instruction: chosen.instruction,
      detailExplanation: chosen.detailExplanation,
      visualHint: chosen.visualHint,
      iconHint: chosen.iconHint,
      isComplete: idx === guide.steps.length - 1,
    };
  });

  return {
    title: isTamil ? guide.taskTitleTa : guide.taskTitleEn,
    totalSteps: guide.steps.length,
    needsDevice: guide.needsDevice,
    steps,
  };
}

