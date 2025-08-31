const API_URL = import.meta.env.VITE_API + "/auth";

// Login
export const loginUser = async (email, senha) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.erro || "Erro ao fazer login");
  }

  return res.json(); // Deve retornar o token e/ou dados do usuário
};

// (Opcional) Verificar token
export const verificarToken = async (token) => {
  const res = await fetch(`${API_URL}/verificar-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Token inválido ou expirado");
  }

  return res.json(); // Ex: { valido: true }
};
