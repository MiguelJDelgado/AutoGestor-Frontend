import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/mechanics";

export const getAllMechanics = async ({ page, limit, date, identifier, search } = {}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (date) queryParams.append("date", date);
  if (identifier) queryParams.append("identifier", identifier);
  if (search) queryParams.append("search", search);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar mecânicos");
  return res.json();
};


export const getMechanicById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar mecânico");
  return res.json();
};

export const createMechanic = async (mechanicData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(mechanicData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar mecânico");
  }

  return res.json();
};

export const updateMechanic = async (id, mechanicData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(mechanicData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao atualizar mecânico");
  }

  return res.json();
};

export const deleteMechanic = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao excluir mecânico");
  }

  return res.json();
};
