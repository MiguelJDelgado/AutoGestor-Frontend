import { getAuthHeaders } from "../utils/Token";

const API_URL = import.meta.env.VITE_API + "/auth/products";

// Buscar todos com paginação
export const getProducts = async ({ page = 1, limit = 10, date, identifier, search } = {}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (date) queryParams.append("date", date);
  if (identifier) queryParams.append("identifier", identifier);
  if (search) queryParams.append("search", search);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
};

// Buscar por ID
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
};

// Criar
export const createProduct = async (productData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
};

// Atualizar
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
};

// Deletar
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar produto");
  return res.json();
};
