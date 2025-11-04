import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/solicitacaos";

export const getAllSolicitacao = async () => {
  const res = await fetch(`${API_URL}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
};

export const getSolicitacaoById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
};

export const getHistoricoSolicitacao = async (id) => {
  const res = await fetch(`${API_URL}/history/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar usuário");
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
    throw new Error(errorData.error || "Erro ao criar usuário");
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
    throw new Error(errorData.error || "Erro ao atualizar usuário");
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
    throw new Error(errorData.error || "Erro ao excluir usuário");
  }

  return res.json();
};
