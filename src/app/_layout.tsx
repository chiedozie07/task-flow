import { TaskProvider } from '@/context/TaskContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';



function NavigationWrapper() {
  const { dark } = useTheme();

  return (
    <NavigationThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add-task"
          options={{ presentation: 'modal', title: 'Add Task' }}
        />
      </Stack>
      <StatusBar style={dark ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationWrapper />
        </SafeAreaProvider>
      </ThemeProvider>
    </TaskProvider>
  );
};