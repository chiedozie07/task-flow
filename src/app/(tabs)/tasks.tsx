import { View, Text, Pressable } from 'react-native';
import { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskContext } from '@/context/TaskContext';
import { TaskList } from '@/components/TaskItem';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';



export default function TasksScreen() {
  const { state, dispatch } = useContext(TaskContext);
  const router = useRouter();
    const { dark } = useTheme();
  const tasks = state.tasks.filter(t => !t.completed);

  // animation for FAB button 
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.08, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  // animated style for FAB
  const animatedFabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  return (
    <SafeAreaView className={`flex-1 px-4 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* header */}
      <View className="px-4 pt-4 pb-2">
        <Text className={`text-2xl font-bold mt-4 mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
          My Tasks
        </Text>
        <Text className="text-gray-500 mt-1">
          Tap to complete · Long press to delete
        </Text>
      </View>

      {/* task List */}
      <TaskList
        tasks={tasks}
        onToggle={(id) =>
          dispatch({ type: 'TOGGLE_TASK', payload: id })
        }
        onDelete={(id) =>
          dispatch({ type: 'DELETE_TASK', payload: id })
        }
        emptyTitle="No active tasks"
        emptySubtitle="Add your first task using the microphone button"
      />

      {/* TODO: FAB (optional if not global) */}
      {/* If you already have a global FABVoice, REMOVE this */}
      {/* Otherwise: */}
      {/* floating action button */}
      <Animated.View
        style={[animatedFabStyle]}
        className="absolute bottom-6 right-6"
      >
        <Pressable
          onPress={() => router.push('/add-task')}
          className="bg-orange-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        >
          <MaterialIcons name="mic" size={28} color="#fff" />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};
