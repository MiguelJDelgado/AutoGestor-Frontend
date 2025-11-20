import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllUsers } from "../../../services/UsuarioService";
import { deleteUser } from "../../../services/UsuarioService";

const TelaConfiguracoes = () => {
  const navigate = useNavigate();

  const columns = ["Nome", "Email", "Perfil de acesso"];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchOptions = [
    { label: "Nome", value: "name" },
    { label: "Email", value: "email" },
    { label: "Perfil de Acesso", value: "role" },
  ];

  const formatUsers = (usersArray) =>
  usersArray.map((user) => ({
    Nome: user.name ?? "-",
    Email: user.email ?? "-",

    "Perfil de acesso": (
      user.role === "admin" ? (
        "Administrador"
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {user.manager ? "Gerente" : "Usuário"}

          <span
            style={{
              fontSize: "14px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            ▼
          </span>
        </div>
      )
    ),

    Ações: { id: user.id },
    rawData: user,
  }));


  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getAllUsers({
        page: 1,
        limit: 10,
        ...filters,
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
        await fetchUsers({ identifier, search: "admin" });
        return;
      }

      if (normalized === "usuário" || normalized === "usuario") {
        await fetchUsers({ identifier, search: "employer" });
        return;
      }

      if (normalized === "gerente") {
        await fetchUsers({ identifier, search: "manager" });
        return;
      }
    }

    await fetchUsers({ identifier, search });
  };

  const handleDelete = async (row) => {
    const id = row.rawData?.id;
    if (!id) return;

    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deleteUser(id);
      setData((prev) => prev.filter((u) => u.rawData.id !== id));
      alert("Usuário excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir usuário.");
    }
  };

  return (
    <div>
      <Header title="Configurações" onNew={() => navigate("/cadastro")}>
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
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TelaConfiguracoes;
