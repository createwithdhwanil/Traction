import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";

import useAuth from "../hooks/useAuth";
import useHabits from "../hooks/useHabits";

import HabitGrid from "../components/habits/HabitGrid";

export default function Habits() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { habits, deleteHabit, completeHabit } = useHabits();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <PageHeader title="Habits" subtitle="Manage all your habits" icon="📋" />

      <HabitGrid
        habits={habits}
        onDelete={(id) => deleteHabit.mutate(id)}
        onComplete={(id) => completeHabit.mutate(id)}
      />
    </DashboardLayout>
  );
}
