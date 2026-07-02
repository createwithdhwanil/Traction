import api from "./api";

export const deleteAccount = async () => {
  const { data } = await api.delete("/auth/delete-account");

  return data;
};
