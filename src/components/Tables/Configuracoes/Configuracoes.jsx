import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllUsers } from "../../../services/UsuarioService";

const columns = ["Nome", "Email", "Perfil de acesso"];

const TelaConfiguracoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();

      const formattedData = data.map((user) => ({
        Nome: user.name,
        Email: user.email,
        "Perfil de acesso": user.role === "admin"
          ? "Administrador"
          : user.role === "employer" && user.manager === false
          ? "Funcionário"
          : user.role === "employer" && user.manager === true
          ? "Gerente"
          : user.role,
      }));

      setUsers(formattedData);
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

  return (
    <>
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
          data={users}
          searchOptions={columns}
          onSearch={() => console.log("Buscar colaborador...")}
        />
      )}

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TelaConfiguracoes;
