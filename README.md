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
- Add, complete, delete tasks
- Voice input via OpenAI transcription
- Offline persistence with AsyncStorage
- Clean tab-based navigation

## Get started
### Setup
   ```bash
   1. Clone repo
2. Install dependencies
3. cd taskFlow
4. Create `.env` file:
   EXPO_PUBLIC_OPENAI_API_KEY=your_key
5. Run: npx expo start
   ```