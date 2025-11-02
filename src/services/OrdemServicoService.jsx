import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/service-orders";

export const getAllServiceOrders = async () => {
  const res = await fetch(`${API_URL}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
};

export const getServiceOrderById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
};

export const createServiceOrder = async (ServiceOrderData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(ServiceOrderData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar usuário");
  }

  return res.json();
};

export const updateServiceOrder = async (id, ServiceOrderData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(ServiceOrderData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao atualizar usuário");
  }

  return res.json();
};

export const deleteServiceOrder = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao excluir usuário");
  }

  return res.json();
};
