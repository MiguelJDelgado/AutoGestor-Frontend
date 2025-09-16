import { useState, useEffect } from 'react';
import Table from '../Table';
import Header from '../../Header/Header';
//import { getClients } from 'camihho-api';

const TelaClientes = () => {
  const columns = ["Nome", "E-mail", "Endereço", "Celular", "Veículos", "CPF/CNPJ"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients({ page: 1, limit: 10 });

        const clientsArray = response.data || [];

        const formattedData = clientsArray.map((client) => ({
          Nome: client.name,
          "E-mail": client.email,
          Endereço: client.address,
          Celular: client.phone,
          Veículos: client.vehicles ? client.vehicles.join(', ') : "-",
          "CPF/CNPJ": client.cpfCnpj,
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
      <Header title="Clientes" children="+ Novo Cliente" />
      <Table
        columns={columns}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TelaClientes;
