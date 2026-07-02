import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function useDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get("/dashboard");
      return response.data;
    },
  });

  return {
    dashboard: data,
    loading: isLoading,
  };
}
