import { Text, TextInput, Pressable, Alert, View } from 'react-native';
import { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { TaskContext } from '@/context/TaskContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';



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
    // generate a unique ID using Crypto.randomUUID()
    const id = Crypto.randomUUID();

    // dispatch action to add the new task to the context state 
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: Crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        description: description.trim(),
        createdAt: new Date().toISOString(),
      },
    });

    router.back();
  };

  return (
    <SafeAreaView className={`flex-1 px-4 pt-6 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="flex-row items-center mb-5">
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={dark ? '#f7f7f7' : '#f97316'} />
        </Pressable>
        <Text className={`text-2xl font-medium mt-4 mb-3 ${dark ? 'text-gray-100' : 'text-[#f97316]'} ml-3 text-center`}>
          Add New Task
        </Text>
      </View>
      {/*task input*/}
      <TextInput placeholder="Task title" value={title} onChangeText={setTitle} 
      className={`border border-gray-300 rounded-md px-3 py-2 mb-3 
        ${dark ? ' text-gray-100' : 'text-gray-700'} border`} 
      placeholderTextColor={dark ? '#9ca3af' : undefined} 
      />
      <TextInput placeholder="Description (optional)" value={description} onChangeText={setDescription} multiline 
      className={`border border-gray-300 rounded-md px-3 py-2 h-24 mb-6 
       ${dark ? ' text-gray-100' : ' text-gray-700'} border mt-2`} 
      placeholderTextColor={dark ? '#9ca3af' : undefined}
      onSubmitEditing={() => handleAddTask()}
      />
      {/* add task btn */}
      <Pressable onPress={handleAddTask} className="bg-orange-500 py-3 mt-10 rounded-md items-center">
        <Text className="text-lg text-white font-semibold">Add Task</Text>
      </Pressable>
    </SafeAreaView>
  );
};