import { View, Text, Pressable, Alert } from 'react-native';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskContext } from '@/context/TaskContext';
import { TaskList } from '@/components/TaskItem';
import { useTheme } from '@/context/ThemeContext';
import FABVoice from '@/components/FABVoice';



export default function TasksScreen() {
  const { state, dispatch } = useContext(TaskContext);
  const router = useRouter();
  const { dark } = useTheme();
  const tasks = state.tasks.filter(t => !t.completed);

  // handle task deletion with confirmation dialog 
  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_TASK', payload: id });
            Alert.alert('Task Deleted', 'The task was removed successfully.');
          },
        },
      ]
    );
  };


  return (
    <SafeAreaView className={`flex-1 px-4 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* header */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center mb-2">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={dark ? '#f7f7f7' : '#f97316'} />
          </Pressable>

          <Text
            className={`text-2xl font-medium ml-3 ${dark ? 'text-gray-100' : 'text-[#f97316]'
              }`}
          >
            My Tasks
          </Text>
        </View>

        <Text className="text-gray-500 mt-1">
          Tap to complete · Long press to delete
        </Text>
      </View>

      {/* task list */}
      <TaskList
        tasks={tasks}
        onToggle={(id) =>
          dispatch({ type: 'TOGGLE_TASK', payload: id })
        }
        onDelete={handleDeleteTask}
        emptyTitle="No active tasks"
        emptySubtitle="Add your first task using voice or manually"
      />

      {/* Manual Add Task CTA */}
      <Pressable
        onPress={() => router.push('/add-task')}
        className="mx-4 mt-4 flex-row items-center justify-center rounded-xl border border-dashed border-orange-400 py-3 mb-6"
      >
        <MaterialIcons name="add" size={22} color="#f97316" />
        <Text className="ml-2 text-[#f97316] font-medium">
          Add Task Manually
        </Text>
      </Pressable>

      {/* Voice FAB */}
      <FABVoice />
    </SafeAreaView>
  );
};
