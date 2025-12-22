import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  startRecording,
  stopRecording,
  transcribeRecording,
} from '@/services/voiceService';
import { TaskContext } from '@/context/TaskContext';



export default function FABVoice() {
  const { dispatch } = useContext(TaskContext);

  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      // START RECORDING
      if (!recording) {
        await startRecording();
        setRecording(true);
        return;
      }

      // STOP + TRANSCRIBE
      setRecording(false);
      setLoading(true);

      const uri = await stopRecording();
      const tasks = await transcribeRecording(uri);

      if (!tasks.length) {
        Alert.alert('No tasks detected', 'Try speaking more clearly.');
        return;
      }

      tasks.forEach((title) => {
        dispatch({
          type: 'ADD_TASK',
          payload: {
            id: Date.now().toString() + Math.random().toString(),
            title,
            completed: false,
          },
        });
      });

      Alert.alert('Success', `Added ${tasks.length} task(s)`);
    } catch (err: any) {
      console.error(err);
      Alert.alert('Voice Input Failed', err.message ?? 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="absolute bottom-6 right-6">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${
          recording ? 'bg-red-500' : 'bg-[#F87315]'
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <MaterialIcons
            name={recording ? 'stop' : 'mic'}
            size={28}
            color="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};