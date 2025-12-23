import { Pressable, Text, View } from 'react-native';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContext } from '@/context/TaskContext';
import { TaskList } from '@/components/TaskItem';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



export default function CompletedScreen() {
  const { state, dispatch } = useContext(TaskContext);
  const completed = state.tasks.filter(t => t.completed);
  const { dark } = useTheme();
  const router = useRouter();


  return (
    <SafeAreaView className={`flex-1 ${dark ? 'bg-gray-900' : 'bg-gray-50'} px-4`}>
      <View className="flex-row items-center mb-4 mt-3">
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={dark ? '#f7f7f7' : '#f97316'} />
        </Pressable>
        <Text className={`text-2xl font-medium mt-4 mb-3 ${dark ? 'text-gray-100' : 'text-[#f97316]'} ml-3 text-center`}>
          Completed Tasks
        </Text>
      </View>

      <TaskList
        tasks={completed}
        onToggle={(id) =>
          dispatch({ type: 'TOGGLE_TASK', payload: id })
        }
        onDelete={(id) =>
          dispatch({ type: 'DELETE_TASK', payload: id })
        }
        emptyTitle="Nothing completed yet"
        emptySubtitle="Finish a task to see it here"
      />
    </SafeAreaView>
  );
};