import Table from '../Table';
import Header from '../../Header/Header';

const TelaProdutos = () => {
  const columns = ["Título", "Descrição", "Horas Trabalho", "Valor Hora", "Valor Total"];
  const data = [
    {
      "Data": "18/04/2023",
      "Descrição": "FILTRO COMBUSTÍVEL / FORD / JEEP / FIAT",
      "Estoque Disponível": "05 UNIDADES",
      "Valor Unit.": "R$ 60,00",
      "Valor Unit. Pago": "R$ 30,00",
    },
    {
      "Data": "10/08/2024",
      "Descrição": "FILTRO DO MOTOR FORD / JEEP",
      "Estoque Disponível": "03 UNIDADES",
      "Valor Unit.": "R$ 80,00",
      "Valor Unit. Pago": "R$ 60,00",
    },
  ];
  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  return (
    <div>
      <Header>Produtos</Header>
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

export default TelaProdutos;