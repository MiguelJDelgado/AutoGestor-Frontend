import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/service-orders";

export const getAllServiceOrders = async ({ clientId, date, code, status, paid } = {}) => {
  const queryParams = new URLSearchParams();
  console.log('clientId:', clientId);

  if (clientId) queryParams.append("clientId", clientId);
  if (date) queryParams.append("date", date);
  if (code) queryParams.append("code", code);

  const statusMap = {
    analise: "request",
    "pendente-produto": "pending_product",
    pendente: "budget",
    emprogresso: "in_progress",
    concluido: "completed",
    cancelado: "canceled",
  };

  if (status && status.toLowerCase() !== "todos") {
    const mappedStatus = statusMap[status.toLowerCase()] || status;
    queryParams.append("status", mappedStatus);
  }

  if (paid && paid.toLowerCase() !== "todos") {
    queryParams.append("paid", paid === "sim");
  }

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar ordens de serviços");
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

export const calculateServiceOrderTotals = async (ServiceOrderData) => {
  const res = await fetch(`${API_URL}/calculate-totals`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(ServiceOrderData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao calcular totais");
  }

  return res.json();
};

export const scheduleTimeReportEmailSender = async (hour, minute) => {
  const res = await fetch(`${API_URL}/schedule-deadline-check`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ hour, minute }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao agendar envio de e-mail");
  }

  return res.json();
};

export const stopTimeReportEmailSender = async () => {
  const res = await fetch(`${API_URL}/stop-deadline-check`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao parar envio de e-mail");
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
