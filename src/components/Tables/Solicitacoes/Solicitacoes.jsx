import { useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";

import ModalNovaSolicitacao from "../../../modals/Solicitacoes/CriarSolicitacao";

const TelaSolicitacoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    "OS",
    "Produto Solicitado",
    "Quantidade",
    "Solicitante",
    "Status",
    "Data Solicitação",
    "Data Finalização"
  ];

  const renderStatus = (status) => {
    const style = {
      padding: "6px 0",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      display: "inline-block",
      width: "110px",
      textAlign: "center",
    };

    switch (status?.toLowerCase()) {
      case "pendente":
        style.backgroundColor = "#ef4444";
        break;
      case "aceita":
        style.backgroundColor = "#facc15";
        break;
      case "rejeitada":
        style.backgroundColor = "#ee8f00ff";
        break;
      case "finalizada":
        style.backgroundColor = "#22c55e";
        break;
      default:
        style.backgroundColor = "#9ca3af";
    }

    return <span style={style}>{status || "—"}</span>;
  };

  const data = [
    {
      OS: "001",
      "Produto Solicitado": "Monitor 24''",
      Quantidade: "10 un",
      Solicitante: "Carlos Almeida",
      Status: renderStatus("Pendente"),
      "Data Solicitação": "05/09/2025",
      "Data Finalização": "—",
      rawStatus: "Pendente"
    },
    {
      OS: "002",
      "Produto Solicitado": "Notebook Dell",
      Quantidade: "5 un",
      Solicitante: "Mariana Silva",
      Status: renderStatus("Rejeitada"),
      "Data Solicitação": "01/09/2025",
      "Data Finalização": "03/09/2025",
      rawStatus: "Rejeitada"
    },
    {
      OS: "003",
      "Produto Solicitado": "Cadeiras Escritório",
      Quantidade: "20 un",
      Solicitante: "João Pedro",
      Status: renderStatus("Aceita"),
      "Data Solicitação": "10/09/2025",
      "Data Finalização": "—",
      rawStatus: "Aceita"
    },
    {
      OS: "004",
      "Produto Solicitado": "Mesa de Reunião",
      Quantidade: "2 un",
      Solicitante: "Beatriz Rocha",
      Status: renderStatus("Finalizada"),
      "Data Solicitação": "01/08/2025",
      "Data Finalização": "05/08/2025",
      rawStatus: "Finalizada"
    },
  ];

  return (
    <div>
      <Header title="Solicitações" onNew={() => setIsModalOpen(true)}>
        + Nova Solicitação
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onSearch={() => console.log("Buscar solicitação...")}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
