import { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskReducer, initialState } from './taskReducer';
import { TaskAction, TaskState } from './types';


interface TaskContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

export const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => null,
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // load tasks
  useEffect(() => {
    AsyncStorage.getItem('TASKS').then(stored => {
      if (stored) {
        dispatch({ type: 'SET_TASKS', payload: JSON.parse(stored) });
      }
    });
  }, []);

  // persist tasks
  useEffect(() => {
    AsyncStorage.setItem('TASKS', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};