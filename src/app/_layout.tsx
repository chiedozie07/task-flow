import { TaskProvider } from '@/context/TaskContext';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../../global.css";


export default function RootLayout() {

  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerTitle: 'TaskFlow',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-task" options={{ presentation: 'modal', title: 'Add Task' }} />
      </Stack>
      <StatusBar style="auto" />
    </TaskProvider>

  );
}
