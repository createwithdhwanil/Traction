import api from "./api";

export const getHabits = async () => {
  const { data } = await api.get("/habits");
  return data;
};
export const getHabitById = async (id) => {
  const { data } = await api.get(`/habits/${id}`);

  return data;
};
export const createHabit = async (habit) => {
  const { data } = await api.post("/habits", habit);
  return data;
};

export const updateHabit = async (id, habit) => {
  const { data } = await api.put(`/habits/${id}`, habit);
  return data;
};

export const deleteHabit = async (id) => {
  const { data } = await api.delete(`/habits/${id}`);
  return data;
};

export const completeHabit = async (id) => {
  const { data } = await api.post(`/habits/${id}/complete`, {
    date: new Date().toISOString().split("T")[0],
  });

  return data;
};

export const getHabitStats = async (id) => {
  const { data } = await api.get(`/habits/${id}/stats`);

  return data;
};

export const getHabitLogs = async (id) => {
  const { data } = await api.get(`/habits/${id}/logs`);

  return data;
};
