import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/dashboards";

export const getDashboardMonthly = async (date) => {
  const res = await fetch(`${API_URL}/monthly?date=${date}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar dashboards");
  return res.json();
};

export const getAnnualBilling = async (year) => {
  const res = await fetch(`${API_URL}/annual-billing?year=${year}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar dashboard");
  return res.json();
};

export const getServiceOrdersNearDeadline = async () => {
  const res = await fetch(`${API_URL}/service-orders-near-deadline`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar dashboard");
  return res.json();
};

export const getServiceOrdersPastDeadline = async () => {
  const res = await fetch(`${API_URL}/service-orders-past-deadline`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar dashboard");
  return res.json();
};