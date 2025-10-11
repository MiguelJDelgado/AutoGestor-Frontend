import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import ModalCliente from "../../../modals/Clientes/CriarClientes"; 

const TelaClientes = () => {
  const columns = ["Nome", "E-mail", "Endereço", "Celular", "Veículos", "CPF/CNPJ"];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Exemplo de futura integração com API
        // const response = await getClients({ page: 1, limit: 10 });
        // const formattedData = response.data.map((client) => ({
        //   Nome: client.name,
        //   "E-mail": client.email,
        //   Endereço: client.address,
        //   Celular: client.phone,
        //   Veículos: client.vehicles ? client.vehicles.join(", ") : "-",
        //   "CPF/CNPJ": client.cpfCnpj,
        // }));
        // setData(formattedData);
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
