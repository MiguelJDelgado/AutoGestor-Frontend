import { useState } from 'react';
import Table from '../Table';
import Header from '../../Header/Header';
import CriarColaborador from '../../../modals/Colaboradores/CriarColaboradores';

const TelaColaboradores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = ["Nome", "CPF", "Cargo", "Telefone", "Email", "Endereço", "Número", "Município", "UF", "Anotação" ];

  const handleSave = (novoColaborador) => {
    setData((prevData) => [...prevData, novoColaborador]);
    setIsModalOpen(false);
    console.log("Novo colaborador salvo:", novoColaborador);
  };

  const handleView = (row) => console.log("Visualizar Colaborador", row);
  const handleEdit = (row) => console.log("Editar Colaborador", row);
  const handleDelete = (row) => console.log("Excluir Colaborador", row);

  return (
    <div>
      <Header title="Colaboradores" onNew={() => setIsModalOpen(true)}>
        + Novo Colaborador
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CriarColaborador
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TelaColaboradores;
