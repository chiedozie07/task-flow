import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function TaskListScreen() {
  const router = useRouter();


  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-4">
        Home Screen
      </Text>
    </View>
  );
};