import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/vehicles";

// Buscar todos os veículos
export const getAllVehicles = async () => {
  const res = await fetch(`${API_URL}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar veículos");
  return res.json();
};

// Buscar veículo por ID
export const getVehicleById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar veículo");
  return res.json();
};

// Criar veículo
export const createVehicle = async (vehicleData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(vehicleData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar veículo");
  }

  return res.json();
};

// Atualizar veículo
export const updateVehicle = async (id, vehicleData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(vehicleData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao atualizar veículo");
  }

  return res.json();
};

// Deletar veículo
export const deleteVehicle = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao excluir veículo");
  }

  return res.json();
};
