import { Text, TextInput, Pressable, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
// import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '@/context/TaskContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import { useTheme } from '@/context/ThemeContext';



export default function AddTaskScreen() {
  const { dispatch } = useContext(TaskContext);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dark } = useTheme();


  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty');
      return;
    }
    // dispatch({
    //   type: 'ADD_TASK',
    //   payload: {
    //     id: uuidv4(),
    //     title: title.trim(),
    //     completed: false,
    //     description: description.trim(),
    //   },
    // });
    const id = Crypto.randomUUID();
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: Crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        description: description.trim(),
      },
    });

    router.back();
  };

  return (
    <SafeAreaView className={`flex-1 px-4 pt-6 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Text className={`text-lg font-semibold mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Add New Task</Text>
      <TextInput placeholder="Task title" value={title} onChangeText={setTitle} className="border border-gray-300 rounded-md px-3 py-2 mb-3" placeholderTextColor={dark ? '#9ca3af' : undefined} />
      <TextInput placeholder="Description (optional)" value={description} onChangeText={setDescription} multiline className="border border-gray-300 rounded-md px-3 py-2 h-24 mb-6" placeholderTextColor={dark ? '#9ca3af' : undefined} />
      <Pressable onPress={handleAddTask} className="bg-orange-500 py-3 rounded-md items-center">
        <Text className="text-white font-semibold">Add Task</Text>
      </Pressable>
    </SafeAreaView>
  );
};