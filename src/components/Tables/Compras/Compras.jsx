import Table from '../Table';
import Header from '../../Header/Header';

const TelaCompras = () => {
  const columns = [
    "Data",
    "Solicitante",
    "Produto",
    "Quantidade",
    "Fornecedor",
    "Valor Estimado",
    "Status"
  ];

  // Função para aplicar estilo ao status
  const renderStatus = (status) => {
    let style = {
      padding: "6px 0",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      display: "inline-block",
      width: "110px",
      textAlign: "center" 
    };

    switch (status?.toLowerCase()) {
      case "pendente":
        style.backgroundColor = "#facc15";
        break;
      case "autorizado":
        style.backgroundColor = "#22c55e"; 
        break;
      case "recebido":
        style.backgroundColor = "#3b82f6"; 
        break;
      case "rejeitado":
        style.backgroundColor = "#ef4444";
        break;
      default:
        style.backgroundColor = "#6b7280"; 
    }

    return <span style={style}>{status || "—"}</span>;
  };

  // Dados fictícios de exemplo
  const data = [
    {
      "Data": "05/09/2025",
      "Solicitante": "Carlos Almeida",
      "Produto": "Monitor 24''",
      "Quantidade": "10 un",
      "Fornecedor": "TechDistribuidora",
      "Valor Estimado": "R$ 8.000,00",
      "Status": renderStatus("Autorizado")
    },
    {
      "Data": "28/08/2025",
      "Solicitante": "Mariana Silva",
      "Produto": "Cadeiras Escritório",
      "Quantidade": "20 un",
      "Fornecedor": "MoveisCo",
      "Valor Estimado": "R$ 12.500,00",
      "Status": renderStatus("Pendente")
    },
    {
      "Data": "15/08/2025",
      "Solicitante": "João Peter Gomes",
      "Produto": "Notebook Dell",
      "Quantidade": "5 un",
      "Fornecedor": "Dell Oficial",
      "Valor Estimado": "R$ 25.000,00",
      "Status": renderStatus("Recebido")
    },
    {
      "Data": "15/08/2025",
      "Solicitante": "João Pedro",
      "Produto": "Notebook Dell",
      "Quantidade": "5 un",
      "Fornecedor": "Dell Oficial",
      "Valor Estimado": "R$ 25.000,00",
      "Status": renderStatus("Rejeitado")
    }
  ];

  // Handlers de ações
  const handleView = (row) => console.log("Visualizar Solicitação", row);
  const handleEdit = (row) => console.log("Editar Solicitação", row);
  const handleDelete = (row) => console.log("Excluir Solicitação", row);

  return (
    <div>
      <Header>Solicitações de Compras</Header>
      <Table 
        columns={columns} 
        data={data} 
        searchOptions={["Data", "Solicitante", "Produto", "Fornecedor"]} 
        onView={handleView} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onSearch={() => console.log("Buscar solicitação...")}
      />
    </div>
  );
};

export default TelaCompras;
