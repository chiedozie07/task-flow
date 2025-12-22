import { Text } from 'react-native';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContext } from '@/context/TaskContext';
import { TaskList } from '@/components/TaskItem';
import { useTheme } from '@/context/ThemeContext';


export default function CompletedScreen() {
  const { state, dispatch } = useContext(TaskContext);
  const completed = state.tasks.filter(t => t.completed);
  const { dark } = useTheme();

  
  return (
    <SafeAreaView className={`flex-1 ${dark ? 'bg-gray-900' : 'bg-gray-50'} px-4`}>
      <Text className={`text-2xl font-bold mt-4 mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
        Completed Tasks
      </Text>

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