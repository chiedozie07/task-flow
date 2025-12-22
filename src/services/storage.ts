import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../context/types";


const TASKS_KEY = "@aairlabs_tasks_v1";

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error("Failed to save tasks:", err);
    throw err;
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch (err) {
    console.error("Failed to load tasks:", err);
    return [];
  }
};

// streak management functions for tracking consecutive days of task completion 
const STREAK_KEY = 'TASKFLOW_STREAK';

export async function loadStreak() {
  const data = await AsyncStorage.getItem(STREAK_KEY);
  return data ? JSON.parse(data) : { count: 0, lastDate: null };
}

export async function saveStreak(streak: {
  count: number;
  lastDate: string;
}) {
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak));
};

