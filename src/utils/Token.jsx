export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado, faça login novamente");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
