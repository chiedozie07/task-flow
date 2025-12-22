# TaskFlow
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

## Features
## 🚀 Key Features
- **AI Voice Input:** Uses OpenAI transcription or to split natural language into multiple tasks.
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


## Tech
- Expo (managed)
- React Native + TypeScript
- React Navigation
- AsyncStorage
- Lottie
- Node/Express backend proxy for audio transcription


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
1. `cd backend`
2. `npm install`
3. Create `.env` with `OPENAI_API_KEY=sk-...`
4. `node server.js` (or `yarn dev`)
5. Set `OPENAI_PROXY_URL=http://localhost:5000` in `.env` for the app

## Backend notes
- The server receives multipart audio and forwards to OpenAI's `/v1/audio/transcriptions`. This avoids RN file upload issues.

## Testing
- Unit test parseTranscription function (jest)
- Manual tests for recording on iOS/Android

## Known limitations
- Demo recording uses auto 5s record — replace with manual start/stop UI
- If using an Expo Go client, ensure recording permissions are granted