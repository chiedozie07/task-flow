import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskReducer, initialState } from './taskReducer';
import { TaskAction, TaskState, Streak } from './types';

interface TaskContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => null,
});

const TASKS_KEY = 'TASKS';
const STREAK_KEY = 'TASK_STREAK';

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);


  // load tasks from AsyncStorage when the app starts 
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

  // persist or save tasks whenever they change 
  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  // streak helper functions
  const loadStreak = async (): Promise<Streak> => {
    const stored = await AsyncStorage.getItem(STREAK_KEY);
    return stored
      ? JSON.parse(stored)
      : { count: 0, lastDate: '' };
  };

  const saveStreak = async (streak: Streak) => {
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  };

  // Load the streak data when the app starts 
  useEffect(() => {
    const initStreak = async () => {
      const stored = await loadStreak();
      dispatch({ type: 'SET_STREAK', payload: stored });
    };

    initStreak();
  }, []);

  // Update streak on task change or when tasks are added or completed
  useEffect(() => {
    const updateStreak = async () => {
      if (state.tasks.length === 0) return;

      const today = new Date().toDateString();
      const stored = await loadStreak();

      if (stored.lastDate !== today) {
        const updated: Streak = {
          count: stored.count + 1,
          lastDate: today,
        };

        await saveStreak(updated);
        dispatch({ type: 'SET_STREAK', payload: updated });
      }
    };

    updateStreak();
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};