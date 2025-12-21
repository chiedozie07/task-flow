import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-semibold text-black dark:text-white">
        Welcome to TaskFlow!
      </Text>
      <Text className="mt-2 text-gray-500 dark:text-gray-400">
        Your tasks will appear here.
      </Text>
    </View>
  );
};