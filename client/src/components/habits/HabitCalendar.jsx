import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "../../services/api";
import toast from "react-hot-toast";

function HabitCalendar({ habitId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (habitId) {
      fetchLogs();
    }
  }, [habitId]);

  const fetchLogs = async () => {
    try {
      const { data } = await api.get(`/habits/${habitId}/logs`);
      setLogs(data.logs || []);
    } catch (error) {
      console.error(error);
    }
  };

  const completedDates = logs
    .filter((log) => log.completed)
    .map((log) => {
      const [year, month, day] = log.date.split("-");

      return new Date(Number(year), Number(month) - 1, Number(day));
    });

  const handleDateClick = async (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      toast.error("Future dates are not allowed");
      return;
    }

    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    try {
      const { data } = await api.post(`/habits/${habitId}/logs/toggle`, {
        date: dateString,
      });

      if (data.action === "added") {
        toast.success("Completion added 🔥");
      } else {
        toast.success("Completion removed 🗑️");
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
      fetchLogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add completion");
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <DayPicker
        mode="single"
        onDayClick={handleDateClick}
        modifiers={{
          completed: completedDates,
        }}
        modifiersClassNames={{
          completed: "habit-completed",
        }}
        disabled={{ after: new Date() }}
        showOutsideDays
      />
    </div>
  );
}

export default HabitCalendar;
