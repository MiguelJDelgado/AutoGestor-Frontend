import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import ModalCliente from "../../../modals/Clientes/CriarClientes";
import { getAllClients } from "../../../services/ClienteService";

const TelaClientes = () => {
  const columns = ["Nome", "CPF/CNPJ", "Telefone", "E-mail", "Endereço", "Número", "Município", "Veículos", "CEP"];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients();

        const formattedData = response.map((client) => ({
          Nome: client.name,
          "CPF/CNPJ": client.cpf || client.cnpj || "-",
          Telefone: client.cellphone || "-",
          "E-mail": client.email || "-",
          Endereço: client.address || "-",
          Número: client.number || "-",
          Município: client.city || "-",
          Veículos: client.vehicleIds ? client.vehicleIds.length : 0,
          CEP: client.cep || "-",
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error.message);
      }
    };

    fetchClients();
  }, []);

  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  return (
    <div>
      <Header title="Clientes" onNew={() => setIsModalOpen(true)}>
        + Novo Cliente
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && <ModalCliente onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TelaClientes;
