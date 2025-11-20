import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import ModalCliente from "../../../modals/Clientes/CriarClientes";
import { getAllClients, getClientById } from "../../../services/ClienteService";

const TelaClientes = () => {
  const columns = [
    "Nome",
    "CPF/CNPJ",
    "Telefone",
    "E-mail",
    "Endereço",
    "Número",
    "Município",
    "Veículos",
    "CEP",
  ];

  const [selectedClient, setSelectedClient] = useState(null);
  const [modalMode, setModalMode] = useState("create"); 
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Campos de busca mapeados conforme backend
  const searchOptions = [
    { label: "Nome", value: "name" },
    { label: "CPF", value: "cpf" },
    { label: "CNPJ", value: "cnpj" },
    { label: "E-mail", value: "email" },
    { label: "Telefone", value: "cellphone" },
    { label: "Município", value: "city" },
  ];

  // 🔹 Função para formatar clientes retornados
  const formatClients = (clientsArray) =>
    clientsArray.map((client) => ({
      _id: client._id,
      Nome: client.name ?? "-",
      "CPF/CNPJ": client.cpf || client.cnpj || "-",
      Telefone: client.cellphone ?? "-",
      "E-mail": client.email ?? "-",
      Endereço: client.address ?? "-",
      Número: client.number ?? "-",
      Município: client.city ?? "-",
      Veículos: client.vehicleIds ? client.vehicleIds.length : 0,
      CEP: client.cep ?? "-",
    }));

  // 🔹 Busca clientes (tanto inicial quanto por pesquisa)
  const fetchClients = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getAllClients({
        page: 1,
        limit: 10,
        ...filters, // inclui identifier e search
      });

      // o backend pode retornar { data: [...] } ou um array direto
      const clientsArray = response.data || response;
      setData(formatClients(clientsArray));
    } catch (error) {
      console.error("Erro ao carregar clientes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Carrega todos os clientes ao montar o componente
  useEffect(() => {
    fetchClients();
  }, []);

  // 🔹 Pesquisa: envia os parâmetros esperados pelo backend
  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchClients(); // sem filtro → lista todos
      return;
    }
    await fetchClients({ identifier, search });
  };

  // 🔹 Ações da tabela
  

  const handleView = async (row) => {
    try {
      const fullClient = await getClientById(row._id);
      setSelectedClient(fullClient);
      setModalMode("view");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
    }
  };

  const handleEdit = async (row) => {
    try {
      const fullClient = await getClientById(row._id);
      setSelectedClient(fullClient);
      setModalMode("edit");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
    }
  };


  const handleDelete = (row) => console.log("Excluir cliente:", row);

  // 🔹 Quando salvar novo cliente, atualiza a tabela
  const handleSaveCliente = (novoCliente) => {
    console.log("Novo cliente salvo:", novoCliente);
    fetchClients();
  };

  return (
    <div>
      <Header title="Clientes" onNew={() => setIsModalOpen(true)}>
        + Novo Cliente
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {isModalOpen && (
        <ModalCliente
          mode={modalMode}
          data={selectedClient}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCliente}
        />

      )}
    </div>
  );
};

export default TelaClientes;
