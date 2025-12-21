import { TaskAction, TaskState } from "./types";


export const initialState: TaskState = {
  tasks: [],
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [action.payload, ...state.tasks] };

    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "SET_TASKS":
      return { tasks: action.payload };

    default:
      return state;
  }
}
