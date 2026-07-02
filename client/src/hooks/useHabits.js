import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as habitService from "../services/habitService";

export default function useHabits() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["habits"],
    queryFn: habitService.getHabits,
  });

  const refreshQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });

    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });

    queryClient.invalidateQueries({
      queryKey: ["analytics"],
    });

    queryClient.invalidateQueries({
      queryKey: ["achievements"],
    });
  };

  const createHabit = useMutation({
    mutationFn: habitService.createHabit,

    onSuccess: () => {
      toast.success("Habit created 🎯");
      refreshQueries();
    },
  });

  const updateHabit = useMutation({
    mutationFn: ({ id, habit }) => habitService.updateHabit(id, habit),

    onSuccess: () => {
      toast.success("Habit updated!");
      refreshQueries();
    },

    onError: () => {
      toast.error("Failed to update habit.");
    },
  });

  const deleteHabit = useMutation({
    mutationFn: habitService.deleteHabit,

    onSuccess: () => {
      toast.success("Habit deleted!");
      refreshQueries();
    },
  });

  const completeHabit = useMutation({
    mutationFn: habitService.completeHabit,

    onMutate: async (habitId) => {
      await queryClient.cancelQueries({
        queryKey: ["habits"],
      });

      const previousHabits = queryClient.getQueryData(["habits"]);

      queryClient.setQueryData(["habits"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          habits: oldData.habits.map((habit) =>
            habit._id === habitId
              ? {
                  ...habit,
                  completedToday: true,
                }
              : habit,
          ),
        };
      });

      return { previousHabits };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["habits"], context?.previousHabits);

      toast.error(err.response?.data?.message || "Unable to complete habit.");
    },

    onSuccess: () => {
      toast.success("Habit completed!");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  });

  return {
    habits: data?.habits || [],
    loading: isLoading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
  };
}
