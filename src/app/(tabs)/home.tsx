import React, { useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContext } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function HomeScreen() {
  const { state } = React.useContext(TaskContext);
  const { dark, toggle } = useTheme();

  const streak = state.streak?.count ?? 0;
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView className={`flex-1 px-6 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="mt-6 mb-8">
        <View className="flex-row items-center justify-between mb-2 border-b pb-2 border-gray-500/10">
          <Text className="text-3xl font-extrabold text-orange-500">TaskFlow</Text>
          {/* theme toggle */}
          <View className="flex-row items-center mb-4">
            <MaterialIcons name={dark ? 'dark-mode' : 'light-mode'} size={20} color={dark ? '#facc15' : '#6b7280'} />
            <Switch value={dark} onValueChange={toggle} thumbColor={dark ? '#f97316' : '#e5e7eb'} trackColor={{ true: '#fed7aa', false: '#e5e7eb' }} />
          </View>
        </View>
        {/* greeting and subtitle */}
        <Text className={`mt-5 text-xl font-semibold ${dark ? 'text-gray-100' : 'text-gray-800'}`}>{getGreeting()}, Chiedozie!</Text>
        <Text className={`mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Organize your day, one task at a time</Text>
      </View>

      {/* stats cards (unchanged but themed) */}
      <View className="flex-row justify-between mb-6">
        <View className={`flex-1 rounded-2xl p-4 mr-3 shadow-sm ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="list-alt" size={20} color="#f97316" />
            <Text className="ml-2 text-sm text-gray-500">Total Tasks</Text>
          </View>
          <Text className={`text-2xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{total}</Text>
        </View>
        {/* completed tasks card */}
        <View className={`flex-1 rounded-2xl p-4 ml-3 shadow-sm ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="check-circle" size={20} color="#22c55e" />
            <Text className="ml-2 text-sm text-gray-500">Completed</Text>
          </View>
          <Text className={`text-2xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{completed}</Text>
        </View>
      </View>
      {/* tasks progress section */}
      <View className={`rounded-2xl p-6 shadow-sm mb-6 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        <Text className={`text-lg font-semibold mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Today's Progress</Text>
        <Text className={`mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{total === 0 ? 'No tasks yet. Start by adding your first task.' : `You’ve completed ${completed} of ${total} tasks`}</Text>

        <View className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <Animated.View style={progressStyle} className="h-full bg-orange-500 rounded-full" />
        </View>

        <Text className="text-xs text-gray-400 mt-2">{progress}% completed</Text>
        <Text className="text-sm text-orange-500 mt-3 font-medium">{streak} day streak</Text>
      </View>
      {/* motivation section */}
      <View className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <Text className="text-base font-semibold text-orange-600 mb-1">{pending === 0 && total > 0 ? 'All tasks completed!' : 'Stay focused'}</Text>
        <Text className="text-gray-600">{pending === 0 && total > 0 ? 'Great job! You’ve completed everything for now.' : 'Head to the Tasks tab or use the microphone to add new tasks.'}</Text>
      </View>
    </SafeAreaView>
  );
};
