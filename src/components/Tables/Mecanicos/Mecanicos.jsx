import Table from '../Table';
import Header from '../../Header/Header';

const TelaMecanicos = () => {
  // Definindo colunas para a lista de mecânicos
  const columns = [
    "Nome",
    "Especialidade",
    "Experiência",
    "Telefone",
    "Email"
  ];

  // Dados fictícios de exemplo
  const data = [
    {
      "Nome": "José Ferreira",
      "Especialidade": "Mecânica Geral",
      "Experiência": "10 anos",
      "Telefone": "(11) 98888-1234",
      "Email": "jose.ferreira@oficina.com"
    },
    {
      "Nome": "Ana Costa",
      "Especialidade": "Elétrica Automotiva",
      "Experiência": "6 anos",
      "Telefone": "(11) 97777-4321",
      "Email": "ana.costa@oficina.com"
    },
    {
      "Nome": "Paulo Henrique",
      "Especialidade": "Ar Condicionado",
      "Experiência": "4 anos",
      "Telefone": "(11) 96666-8765",
      "Email": "paulo.henrique@oficina.com"
    },
    {
      "Nome": "Roberta Lima",
      "Especialidade": "Suspensão e Freios",
      "Experiência": "8 anos",
      "Telefone": "(11) 95555-5678",
      "Email": "roberta.lima@oficina.com"
    }
  ];

  // Handlers de ações
  const handleView = (row) => console.log("Visualizar Mecânico", row);
  const handleEdit = (row) => console.log("Editar Mecânico", row);
  const handleDelete = (row) => console.log("Excluir Mecânico", row);

  return (
    <div>
      <Header title="Mecânicos" children="+ Adicionar Mecânico">
      </Header>
      <Table 
        columns={columns} 
        data={data} 
        searchOptions={columns} 
        onView={handleView} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onSearch={() => console.log("Buscar mecânico...")}
      />
    </div>
  );
};

export default TelaMecanicos;
