import { View, Text } from 'react-native';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContext } from '@/context/TaskContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { state } = useContext(TaskContext);

  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-6">
      {/* header */}
      <View className="mt-6 mb-8">
        <Text className="text-3xl font-extrabold text-orange-500">
          TaskFlow
        </Text>
        <Text className="text-gray-500 mt-1">
          Organize your day, one task at a time
        </Text>
      </View>

      {/* stats cards */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 bg-white rounded-2xl p-4 mr-3 shadow-sm">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="list-alt" size={20} color="#f97316" />
            <Text className="ml-2 text-sm text-gray-500">
              Total Tasks
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">
            {total}
          </Text>
        </View>

        <View className="flex-1 bg-white rounded-2xl p-4 ml-3 shadow-sm">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="check-circle" size={20} color="#22c55e" />
            <Text className="ml-2 text-sm text-gray-500">
              Completed
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">
            {completed}
          </Text>
        </View>
      </View>

      {/* progress Card */}
      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Today’s Progress
        </Text>

        <Text className="text-gray-500 mb-4">
          {total === 0
            ? 'No tasks yet. Start by adding your first task.'
            : `You’ve completed ${completed} of ${total} tasks`}
        </Text>

        {/* Progress Bar */}
        <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-orange-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className="text-sm text-gray-400 mt-2">
          {progress}% completed
        </Text>
      </View>

      {/* motivation / CTA */}
      <View className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <Text className="text-base font-semibold text-orange-600 mb-1">
          {pending === 0 && total > 0
            ? 'All tasks completed!'
            : 'Stay focused'}
        </Text>
        <Text className="text-gray-600">
          {pending === 0 && total > 0
            ? 'Great job! You’ve completed everything for now.'
            : 'Head to the Tasks tab or use the microphone to add new tasks.'}
        </Text>
      </View>
    </SafeAreaView>
  );
};