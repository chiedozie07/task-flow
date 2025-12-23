# TaskFlow | AI-Powered Task Management
TaskFlow is a high-performance React Native application designed to streamline productivity through intelligent automation.

## Description
TaskFlow is a modern React Native to-do application built with Expo and TypeScript.
It demonstrates clean architecture, React Navigation, persistent storage with AsyncStorage,
and voice-powered task creation via a floating action button.

## Navigation
This project uses Expo Router, which is built on top of React Navigation.
Under the hood, Expo Router leverages `@react-navigation/native` and
`@react-navigation/native-stack` to manage screen transitions.

The app implements two screens as required:
- Task List Screen
- Add Task Screen

### Why I chose Expo Router
Expo Router is an abstraction on top of React Navigation. I chose it to reduce boilerplate and focus more on core features like state management, persistence, and voice transcription, while still fully complying with the React Navigation requirement.

## Key Features
- **🎙️ AI Voice Command (Req 6):** Record voice notes to automatically generate and split tasks using OpenAI Whisper and GPT-4o-mini transcription or to split natural language into multiple tasks.
- **🧠 Intelligent Task Splitting:** Natural language processing separates complex sentences (e.g., "Buy groceries and call the bank") into individual, manageable items.
- **⚡ Native Performance:** Built with Expo, TypeScript, and NativeWind (Tailwind CSS) for a fluid, responsive UI.
- **📁 Modular Backend:** A dedicated Node.js/TypeScript proxy server handles secure AI processing and file management.
- **Persistence:** Local storage via AsyncStorage.
- **Theming:** Full Dark/Light mode support.
- **Animations:** Smooth transitions using Lottie and Reanimated.
- Add, complete, delete tasks
- Offline persistence with AsyncStorage
- Clean tab-based navigation


## Features
- Add, edit, delete tasks
- Complete toggle
- Due dates
- Search & filters
- Voice input (OpenAI Whisper via backend proxy)
- Persistent storage (AsyncStorage)
- Global state via React Context + reducer
- Animated splash (Lottie), dark/light themes, animations


## 🛠️ Technical Stack
- **Frontend:** React Native (Expo) + TypeScript, React Navigation with expo dynamic routing, Context API, NativeWind, AsyncStorage, Lottie for custom Splash screen and animation.
- **Backend:** Node.js, Express backend proxy for audio transcription, TypeScript, Multer.
- **AI Integration:** OpenAI API (Whisper-1 & GPT-4o-mini).


## Get started
### Setup
   ```bash
1. Clone repo
2. Install dependencies
3. cd taskFlow
4. Create `.env` file:
5. Run: npx expo start
   EXPO_PUBLIC_OPENAI_API_KEY=your_key
   OR 
   For backend: OPENAI_PROXY_URL` (for in-app `voiceService`) or run the backend below
5. Run: npm run dev
   ```

### Backend proxy (recommended)
```
1. `cd backend`
2. `npm install`
3. Create `.env` with `OPENAI_API_KEY=sk-...`
4. `node server.js` (or `yarn dev`)
5. Set `OPENAI_PROXY_URL=http://localhost:5000` in `.env` for the app
```

## Backend notes
- The server receives multipart audio and forwards to OpenAI's `/v1/audio/transcriptions`. This avoids RN file upload issues.

## Testing
- Unit test parseTranscription function (jest)
- Manual tests for recording on iOS/Android

## Known limitations
- Demo recording uses auto 5s record — replace with manual start/stop UI
- If using an Expo Go client, ensure recording permissions are granted

### WWhy Openai Server Response Failed Occurance
- The service provider failed because free-tier OpenAI keys now have zero Whisper access
- Voice transcription requires a paid account
- Therefore OpenAI has blocks call requests because my API key has NO remaining quota or billing attached.