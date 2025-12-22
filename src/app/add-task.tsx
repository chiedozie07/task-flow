import { Text, TextInput, Pressable, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
// import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '@/context/TaskContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';



export default function AddTaskScreen() {
  const { dispatch } = useContext(TaskContext);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');



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
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold mb-4">
        Add New Task
      </Text>

      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 rounded-md px-3 py-2 mb-3"
      />

      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border border-gray-300 rounded-md px-3 py-2 h-24 mb-6"
      />

      <Pressable
        onPress={handleAddTask}
        className="bg-orange-500 py-3 rounded-md items-center mt-5"
      >
        <Text className="text-white font-semibold">
          Add Task
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};