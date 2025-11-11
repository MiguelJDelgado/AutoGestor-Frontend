import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/providers";

// Buscar todos com paginação
export const getSuppliers = async ({ page, limit, date, identifier, search } = {}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (date) queryParams.append("date", date);
  if (identifier) queryParams.append("identifier", identifier);
  if (search) queryParams.append("search", search);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar fornecedores");
  return res.json();
};

// Buscar por ID
export const getSupplierById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar fornecedor");
  return res.json();
};

// Criar
export const createSupplier = async (supplierData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(supplierData),
  });
  if (!res.ok) throw new Error("Erro ao criar fornecedor");
  return res.json();
};

// Atualizar
export const updateSupplier = async (id, supplierData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(supplierData),
  });
  if (!res.ok) throw new Error("Erro ao atualizar fornecedor");
  return res.json();
};

// Deletar
export const deleteSupplier = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar fornecedor");
  return res.json();
};
