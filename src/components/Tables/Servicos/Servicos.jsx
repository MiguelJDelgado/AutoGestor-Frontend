import styled from 'styled-components';
import Table from '../Table';
import Header from '../../Header/Header';

const NewOrderButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`

const TelaServicos = () => {
  const columns = ["Título", "Descrição", "Horas Trabalho", "Valor Hora", "Valor Total"];
  const data = [
    {
      "Título": "Troca de filtro",
      "Descrição": "FILTRO COMBUSTÍVEL / FORD / JEEP / FIAT",
      "Horas Trabalho": 3,
      "Valor Hora": 60,
      "Valor Total": 3 * 60,
    },
    {
      "Título": "Manutenção motor",
      "Descrição": "FILTRO DO MOTOR FORD / JEEP",
      "Horas Trabalho": 5,
      "Valor Hora": 80,
      "Valor Total": 5 * 80,
    },
  ];
  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  return (
    <div>
      <Header title="Servicos">
        <NewOrderButton>+ Novo Serviço</NewOrderButton>
      </Header>
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

export default TelaServicos;
