import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskReducer, initialState } from './taskReducer';
import { TaskAction, TaskState, Streak } from './types';
import { useTaskStreak } from '@/hooks/useTaskStreak';

// define the shape of our context
interface TaskContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

// create the context with default values
export const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => null,
});

const TASKS_KEY = 'TASKS';
const STREAK_KEY = 'TASK_STREAK';

// provider component to wrap the app and provide task state
export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // load tasks from AsyncStorage on app start
  useEffect(() => {
    const loadTasks = async () => {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      if (stored) {
        dispatch({
          type: 'SET_TASKS',
          payload: JSON.parse(stored),
        });
      }
    };

    loadTasks();
  }, []);

    // persist tasks whenever they change
  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  // load streak once on app start
  useEffect(() => {
    const loadStreak = async () => {
      const stored = await AsyncStorage.getItem(STREAK_KEY);
      const streak: Streak = stored
        ? JSON.parse(stored)
        : { count: 0, lastDate: '' };

      dispatch({ type: 'SET_STREAK', payload: streak });
    };

    loadStreak();
  }, []);

  // call custom hook to handle streak updates
  useTaskStreak(state.tasks, dispatch);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};