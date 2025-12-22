import { TaskAction, TaskState } from './types';

export const initialState: TaskState = {
  tasks: [],
  streak: {
    count: 0,
    lastDate: '',
  },
};

export function taskReducer(
  state: TaskState,
  action: TaskAction
): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'SET_STREAK':
      return {
        ...state,
        streak: action.payload,
      };

    default:
      return state;
  }
};