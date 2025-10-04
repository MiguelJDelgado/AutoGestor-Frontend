import { useState } from 'react';
import Table from '../Table';
import Header from '../../Header/Header';
import CriarMecanico from '../../../modals/Mecanicos/CriarMecanicos';

const TelaMecanicos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = ["Nome", "Especialidade", "Experiência", "Telefone", "Email"];

  const handleSave = (novoMecanico) => {
    setData((prevData) => [...prevData, novoMecanico]);
    setIsModalOpen(false);
    console.log("Novo mecânico salvo:", novoMecanico);
  };

  const handleView = (row) => console.log("Visualizar Mecânico", row);
  const handleEdit = (row) => console.log("Editar Mecânico", row);
  const handleDelete = (row) => console.log("Excluir Mecânico", row);

  return (
    <div>
      <Header title="Mecânicos" onNew={() => setIsModalOpen(true)}>
        + Novo Mecânico
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
        <CriarMecanico
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TelaMecanicos;
