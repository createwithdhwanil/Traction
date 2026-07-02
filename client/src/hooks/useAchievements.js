import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function useAchievements() {
  const { data, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await api.get("/achievements");

      return res.data.achievements;
    },
  });

  return {
    achievements: data || [],
    loading: isLoading,
  };
}
