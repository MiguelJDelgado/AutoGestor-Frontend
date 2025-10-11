import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/services";

// Buscar todos
export const getAllServices = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar serviços");
  return res.json();
};

// Buscar por ID
export const getServiceById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar serviço");
  return res.json();
};

// Criar
export const createService = async (serviceData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar serviço");
  }
  return res.json();
};

// Atualizar
export const updateService = async (id, serviceData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao atualizar serviço");
  }
  return res.json();
};

// Deletar
export const deleteService = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao excluir serviço");
  }
  return res.json();
};
