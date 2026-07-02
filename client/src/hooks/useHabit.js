import { useQuery } from "@tanstack/react-query";
import { getHabitById } from "../services/habitService";

export default function useHabit(id) {
  return useQuery({
    queryKey: ["habit", id],
    queryFn: () => getHabitById(id),
    enabled: !!id,
  });
}
