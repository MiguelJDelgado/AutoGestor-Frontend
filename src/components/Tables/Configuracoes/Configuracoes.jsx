import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllUsers } from "../../../services/UsuarioService";

const TelaConfiguracoes = () => {
  const columns = ["Nome", "Email", "Perfil de acesso"];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Opções de pesquisa conforme backend
  const searchOptions = [
    { label: "Nome", value: "name" },
    { label: "Email", value: "email" },
    { label: "Perfil de Acesso", value: "role" },
  ];

  // 🔹 Função que formata os usuários para a tabela
  const formatUsers = (usersArray) =>
    usersArray.map((user) => ({
      Nome: user.name ?? "-",
      Email: user.email ?? "-",
      "Perfil de acesso":
        user.role === "admin"
          ? "Administrador"
          : user.role === "employer" && user.manager === true
          ? "Gerente"
          : "Usuário",
    }));

  // 🔹 Função de busca genérica
  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getAllUsers({
        page: 1,
        limit: 10,
        ...filters, // envia identifier, search etc.
      });

      const usersArray = response.data || response;
      setData(formatUsers(usersArray));
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const handleSearch = async ({ identifier, search }) => {
  if (!identifier || !search) {
    await fetchUsers();
    return;
  }

  const normalized = search.trim().toLowerCase();

  if (identifier === "role") {
    if (normalized === "administrador") {
      await fetchUsers({ identifier: "role", search: "admin" });
      return;
    }

    if (normalized === "usuário" || normalized === "usuario") {
      await fetchUsers({ identifier: "role", search: "employer" });
      return;
    }

    if (normalized === "gerente") {
      await fetchUsers({ identifier: "manager", search: true });
      return;
    }
  }

  await fetchUsers({ identifier, search });
};

  return (
    <div>
      <Header title="Configurações" onNew={() => setIsModalOpen(true)}>
        + Novo Colaborador
      </Header>

      {loading ? (
        <p>Carregando usuários...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          data={data}
          searchOptions={searchOptions}
          onSearch={handleSearch}
        />
      )}

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TelaConfiguracoes;
