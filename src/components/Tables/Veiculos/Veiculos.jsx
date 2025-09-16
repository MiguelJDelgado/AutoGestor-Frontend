import Table from '../Table';
import Header from '../../Header/Header';


const TelaVeiculos = () => {
const columns = ["Marca", "Modelo", "Placa", "Ano", "Tipo de Combustível", "Chassi", "Km"];
  const data = [
    {
      "Marca": "Scania",
      "Modelo": "R500",
      "Placa": "ABC-1234",
      "Ano": "2024",
      "Tipo de Combustível": "Flex",
      "Chassi": "1234567",
      "Km": "100000"
    },
    {
      "Marca": "Volkswagen",
      "Modelo": "Fox",
      "Placa": "CBA-4321",
      "Ano": "2020",
      "Tipo de Combustível": "Flex",
      "Chassi": "7654321",
      "Km": "90000"
    },
  ];

  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  return (
    <div>
      <Header title="Veículos" children="+ Novo Veículo"></Header>
      <Table 
        columns={columns} 
        data={data} 
        searchOptions={columns}
        onView={handleView} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default TelaVeiculos;