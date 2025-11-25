import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/buys";

export const getAllSolicitacao = async ({ page, limit, date, identifier, search } = {}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (date) queryParams.append("date", date);
  if (identifier) queryParams.append("identifier", identifier);
  if (search) queryParams.append("search", search);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar solicitações");
  return res.json();
};

export const getSolicitacaoById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar solicitação");
  return res.json();
};

export const getHistoricoSolicitacao = async (id) => {
  const res = await fetch(`${API_URL}/history/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar histórico da solicitação");
  return res.json();
};

export const createSolicitacao = async (solicitacaoData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(solicitacaoData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao criar solicitação");
  }

  return res.json();
};

export const updateSolicitacao = async (id, solicitacaoData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(solicitacaoData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao atualizar solicitação");
  }

  return res.json();
};

export const deleteSolicitacao = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao excluir solicitação");
  }

  return res.json();
};

export const authorize = async (id) => {
  const res = await fetch(`${API_URL}/${id}/authorize`, {
    method: "put",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao autorizar solicitação de compra");
  }

  return res.json();
};


