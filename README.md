# TaskFlow | Voice-Enabled AI-Powered Task Management App
TaskFlow is a high-performance React Native application with voice-powered task creation designed to streamline productivity through intelligent automation.

## Description
TaskFlow is a modern React Native to-do application built with Expo and TypeScript.
It demonstrates clean architecture, React Navigation, persistent storage with AsyncStorage,
and voice-powered task creation via a floating action button.
This project was built as part of the AAIR Labs/ETS Systems Developer Exercise and fulfills all core requirements, plus multiple bonus features.

## Navigation
This project uses Expo Router, which is built on top of React Navigation.
Under the hood, Expo Router leverages `@react-navigation/native` and
`@react-navigation/native-stack` to manage screen transitions.

The app implements two screens as required and three more bonus screen:
- Tasks List Screen
- Completed Tasks Screen
- Home screen/Dashboard
- Add new task screen for manual task creation

### Why I chose Expo Router
Expo Router is an abstraction on top of React Navigation. I chose it to reduce boilerplate and focus more on core features like state management, persistence, and voice transcription, while still fully complying with the React Navigation requirement.

## Key Features
- AI Voice Command (Req 6): Add tasks using voice input (Floating Action Button) by simply recording voice notes to automatically generate and split tasks using OpenAI Whisper and GPT-4o-mini transcription or to split natural language into multiple tasks.
- Intelligent Task Splitting: Natural language processing separates complex sentences (e.g., "Buy groceries and call the bank") into individual, manageable items.
- Add tasks manually via form
- Mark tasks as complete / incomplete
- Delete tasks
- Native Performance: Built with Expo, TypeScript, and NativeWind (Tailwind CSS) for a fluid, responsive UI.
- Modular Backend: A dedicated Node.js/TypeScript proxy server handles secure AI processing and file management.
- Persistence: Local storage via AsyncStorage.
- Theming: Full Dark/Light mode support.
- Custom splashscreen
- Animations: Smooth transitions using Lottie and Reanimated.
- Offline persistence with AsyncStorage
- Clean tab-based navigation
- Global state via React Context + reducer
- Animated splash (Lottie), dark/light themes, animations

### Voice Input Floating Action Button (FAB)
- Records user speech
- Sends audio to backend
- Backend transcribes speech using OpenAI Whisper
- Uses GPT to intelligently split multiple tasks, Example: “Buy provisions and call mom” will be splited into two tasks, Buy provisions, Call mom

## UI / UX Enhancements (Bonus)
- Light & Dark theme toggle
- Animated Floating Action Button
- Task completion & deletion feedback
- Empty state handling
- Clean, modern layout
- Graceful fallbacks when voice API quota is exceeded

## App Screenshots
Below are key screens from **TaskFlow**, showcasing the UI, navigation flow, and core features.

### Home Screen / Dashboard
<p align="center">
  <img src="src/assets/images/screenshots/home.png" alt="Home Dashboard Screen" width="420" />
</p>

---

### Empty Tasks Screen
<p align="center">
  <img src="src/assets/images/screenshots/empty-tasks.png" alt="Empty Tasks Screen" width="420" />
</p>

---

### Tasks Screen & Completed Tasks Screen
<p align="center">
  <img src="src/assets/images/screenshots/tasks.png" alt="Tasks Screen" width="420" />
  &nbsp;&nbsp;&nbsp;
  <img src="src/assets/images/screenshots/completed.png" alt="Completed Tasks Screen" width="420" />
</p>

---

### Add New Task Screen (Manual Entry)
<p align="center">
  <img src="src/assets/images/screenshots/add-new-task.png" alt="Add New Task Screen" width="420" />
</p>


## Technical Stack
### **Frontend:**
- React Native (Expo)
- TypeScript
- Expo Router
- React Navigation with expo dynamic routing
- Context API (for app global state management)
- Custom Hooks
- AsyncStorage
- Expo AV (audio recording)
- Reanimated (animations)
-  NativeWind (Tailwind CSS
- App Custom splash screen
- Lottie for custom Splash screen and animation.

### **Backend:**
- Node.js
- Express backend proxy for audio transcription
- TypeScript
- Multer (file uploads)
- OpenAI API (Whisper + GPT)
- CORS
- dotenv
- OpenAI API (Whisper-1 & GPT-4o-mini).


## Get started
### Setup
   ```bash
1. Clone repo
2. Install dependencies
3. cd taskFlow
4. Create `.env` file:
5. Run: npx expo start
   EXPO_PUBLIC_TASKFLOW_API_BASE_URL=your_backend_server_taskflow_endpoint
   ```

### Backend proxy (recommended)
```
1. `cd backend`
2. `npm install`
3. Create `.env` with `OPENAI_API_KEY=sk-...`
4. `node server.js` (or `yarn dev`)
5. Set `OPENAI_PROXY_URL=http://localhost:5000` in `.env` for the app
```
### Backend notes
- The server receives multipart audio and forwards to OpenAI's `/v1/audio/transcriptions`. This avoids RN file upload issues.

## Frontend App
Folder Structure (Frontend)
```
src/
├── app/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── tasks.tsx
│   │   └── completed.tsx
│   ├── add-task.tsx
│   └── _layout.tsx
├── components/
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── FABVoice.tsx
│   └── Input.tsx
├── context/
│   ├── TaskContext.tsx
│   └── ThemeContext.tsx
├── services/
│   └── voiceService.ts
├── hooks/
    └── useTaskStreak.ts
```

## Frontend State Management
- Global state handled with Context + Reducer
- Tasks and streaks persisted using AsyncStorage
- UI reacts instantly to state updates
- Backend only used for voice processing, not task storage

## Backend API Server
- The backend handles:
- Receiving audio files
- Transcribing speech
- Extracting structured tasks
- Returning clean task data to the frontend

## Folder Structure (Backend)
```
backend/
├── src/
│   ├── routes/
│   │   └── transcribe.ts
│   ├── services/
│   │   └── openai.ts
│   └── server.ts
├── .env
└── package.json
```
## How to Run Backend
```
Install dependencies
```

## Create .env file (Backend)
```
PORT=8080
OPENAI_API_KEY=your_openai_api_key_here
```

## Start the server
```
npm run dev
```

Server will run on:
```
http://0.0.0.0:8080
```

## API Documentation
**Request**
### POST /api/transcribe
```
- Content-Type: `multipart/form-data`  
- Body field: `file` — the recorded voice note from the client (audio file)
```

Example using `curl`:
```bash
curl -X POST "http://localhost:8080/api/transcribe" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@voice-note.mp3"
```

## Successful Response (200 OK)
The backend transcribes the audio using OpenAI Whisper, processes it with GPT-4o-mini, and returns a structured JSON array of tasks:
```
{
  "tasks": [
    {
      "id": "task-001",
      "title": "Buy groceries",
      "completed": false
    },
    {
      "id": "task-002",
      "title": "Call mom",
      "completed": false
    }
  ],
  "transcription": "Buy groceries and call mom",
  "metadata": {
    "audioDuration": 5.2,
    "voiceConfidence": 0.97
  }
}
```

### Quota Error (429)
```
{
  "error": "OpenAI quota exceeded. Voice fallback activated."
}
```

### Server Error (500)
```
{
  "error": "Voice processing failed"
}
```

## Backend Processing Flow
1. Receive audio file via Multer
2. Transcribe audio using Whisper
3. Send transcription to GPT model
4. GPT returns structured JSON
5. Tasks extracted and returned
6. Uploaded file is deleted after processing

## Error Handling & Fallbacks
1. Graceful handling of:
2. Missing audio
3. Network errors
4. OpenAI quota limits
5. Frontend fallback creates placeholder tasks when voice service is unavailable
6. App never crashes due to voice failures

## Bonus Features Implemented
- Dark / Light mode
- Animated voice FAB
- Task streak tracking
- Optimistic UI updates
- TypeScript throughout
- Clean architecture and modular code

## Edge Cases Handled
- Empty task title
- No tasks state
- Permission denial (microphone)
- Network failures
- API quota exhaustion
- Duplicate task prevention, etc.

## Submission Notes
This project fulfills all required features outlined by AAIR Labs/ETS Systems and includes multiple bonus enhancements such as voice input, animations, dark mode, intelligent task parsing, manual task creation and custom splash screen.
Code is modular, readable, well-commented, and production-ready.

## Author
Developed by *Chiedozie Ezidiegwu* [LinkedIn](https://www.linkedin.com/in/chiedozie-ezidiegwu-9859a5167/)
Full-stack Software Engineer — React Native | Node.js | TypeScript | React.js | Next.js | Vue.js

<!-- ## Testing
- Unit test parseTranscription function (jest)
- Manual tests for recording on iOS/Android -->

## Known limitations
- Demo recording uses auto 5s record — replace with manual start/stop UI
- If using an Expo Go client, ensure recording permissions are granted

### Why OpenAI Server Response Might Fail or Occur
- The service provider failed because free-tier OpenAI keys now have zero Whisper access
- Voice transcription requires a paid account
- Therefore, OpenAI can block call requests is because my API key has NO remaining quota or billing attached.

## License
MIT License

Copyright (c) 2025 Chiedozie Ezidiegwu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.


*Thanks for reading, and happy coding!*