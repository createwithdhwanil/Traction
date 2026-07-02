import { useEffect } from "react";
import { showNotification } from "../utils/notifications";

export default function useReminderWatcher(habits) {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      habits.forEach((habit) => {
        if (habit.reminderEnabled && habit.reminderTime === currentTime) {
          showNotification(
            `🔔 ${habit.title}`,
            "Time to complete your habit and keep your streak alive.",
          );
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [habits]);
}
