import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/find-cep";

export const getAddressByCep = async (cep) => {
  const res = await fetch(`${API_URL}/${cep}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
};