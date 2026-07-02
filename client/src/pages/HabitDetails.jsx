import HabitCompletionChart from "../components/habits/HabitCompletionChart";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  Trophy,
  Target,
  CalendarDays,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useHabit from "../hooks/useHabit";
function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useHabit(id);
  if (isLoading) {
    return (
      <DashboardLayout>
        {" "}
        <div className="p-6">Loading...</div>{" "}
      </DashboardLayout>
    );
  }
  const habit = data?.habit;
  const logs = data?.logs || [];
  const chartData = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const dayString = date.toLocaleDateString();

    const completed = logs.some(
      (log) => new Date(log.date).toLocaleDateString() === dayString,
    );

    chartData.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      completions: completed ? 1 : 0,
    });
  }
  const completionCount = logs.length;
  const progress =
    habit?.goalDays > 0
      ? Math.min(Math.round((completionCount / habit.goalDays) * 100), 100)
      : 0;
  return (
    <DashboardLayout>
      {" "}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {" "}
        {/* Back Button */}{" "}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          {" "}
          <ArrowLeft size={18} /> Back{" "}
        </button>{" "}
        {/* Header */}{" "}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          {" "}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {" "}
            {habit?.title}{" "}
          </h1>{" "}
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
            {" "}
            {habit?.category || "General"}{" "}
          </span>{" "}
          <p className="mt-5 text-slate-600 dark:text-slate-400">
            {" "}
            {habit?.description || "No description added."}{" "}
          </p>{" "}
        </div>{" "}
        {/* Stats */}{" "}
        <div className="grid md:grid-cols-4 gap-4">
          {" "}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
            {" "}
            <div className="flex items-center gap-2 text-orange-500">
              {" "}
              <Flame size={20} />{" "}
              <span className="font-semibold"> Current Streak </span>{" "}
            </div>{" "}
            <p className="text-3xl font-bold mt-3">
              {" "}
              {habit?.currentStreak || 0}{" "}
            </p>{" "}
          </div>{" "}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
            {" "}
            <div className="flex items-center gap-2 text-yellow-500">
              {" "}
              <Trophy size={20} />{" "}
              <span className="font-semibold"> Best Streak </span>{" "}
            </div>{" "}
            <p className="text-3xl font-bold mt-3">
              {" "}
              {habit?.longestStreak || 0}{" "}
            </p>{" "}
          </div>{" "}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
            {" "}
            <div className="flex items-center gap-2 text-green-500">
              {" "}
              <CheckCircle size={20} />{" "}
              <span className="font-semibold"> Completions </span>{" "}
            </div>{" "}
            <p className="text-3xl font-bold mt-3"> {completionCount} </p>{" "}
          </div>{" "}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
            {" "}
            <div className="flex items-center gap-2 text-indigo-500">
              {" "}
              <Target size={20} />{" "}
              <span className="font-semibold"> Goal </span>{" "}
            </div>{" "}
            <p className="text-3xl font-bold mt-3">
              {" "}
              {habit?.goalDays || 0}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Goal Progress */}{" "}
        {habit?.goalDays > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            {" "}
            <div className="flex justify-between mb-3">
              {" "}
              <h2 className="font-semibold text-lg"> Goal Progress </h2>{" "}
              <span>{progress}%</span>{" "}
            </div>{" "}
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              {" "}
              <div
                className="h-full bg-linear-to-r from-green-500 to-emerald-400 transition-all"
                style={{ width: `${progress}%` }}
              />{" "}
            </div>{" "}
            <div className="flex justify-between mt-3 text-sm text-slate-500">
              {" "}
              <span> {completionCount} completed </span>{" "}
              <span>
                {" "}
                {Math.max(habit.goalDays - completionCount, 0)} remaining{" "}
              </span>{" "}
            </div>{" "}
          </div>
        )}{" "}
        <HabitCompletionChart data={chartData} />
        {/* Recent Activity */}{" "}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
          {" "}
          <h2 className="text-xl font-bold mb-5"> Recent Activity </h2>{" "}
          {logs.length === 0 ? (
            <p className="text-slate-500"> No completion history found. </p>
          ) : (
            <div className="space-y-3">
              {" "}
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800"
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <CalendarDays size={18} />{" "}
                    <span>
                      {" "}
                      {new Date(log.date).toLocaleDateString()}{" "}
                    </span>{" "}
                  </div>{" "}
                  <span className="text-green-500 font-medium">
                    {" "}
                    Completed{" "}
                  </span>{" "}
                </div>
              ))}{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </DashboardLayout>
  );
}
export default HabitDetails;
