import { TaskProvider } from '@/context/TaskContext';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {

  return (
      <TaskProvider>
        <Stack
        screenOptions={{
          headerTitle: 'TaskFlow',
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add-task" options={{ presentation: 'modal', title: 'Add Task' }} />
          {/* <Stack.Screen name="completed" options={{ title: 'Completed Tasks' }} /> */}
        </Stack>
        <StatusBar style="auto" />
      </TaskProvider>

  );
}
