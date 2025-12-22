export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  dueDate?: string;
  description?: string;
}

export interface TaskState {
  tasks: Task[];
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] };
