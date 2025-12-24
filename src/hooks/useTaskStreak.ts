import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/context/types";


const STREAK_KEY = "TASK_STREAK";

export function useTaskStreak(tasks: Task[], dispatch: React.Dispatch<any>) {
  useEffect(() => {
    if (tasks.length === 0) return;

    const today = new Date().toDateString();

    const updateStreak = async () => {
      const stored = await AsyncStorage.getItem(STREAK_KEY);
      const streak = stored ? JSON.parse(stored) : { count: 0, lastDate: "" };

      if (streak.lastDate !== today) {
        const updated = {
          count: streak.count + 1,
          lastDate: today,
        };

        await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
        dispatch({ type: "SET_STREAK", payload: updated });
      }
    };

    updateStreak();
  }, [tasks, dispatch]);
};
