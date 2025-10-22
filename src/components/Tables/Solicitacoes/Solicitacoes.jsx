import { useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";

import pesquisaIcon from "../../../assets/pesquisa.png";
import aprovarIcon from "../../../assets/aprovar.png";
import settingsIcon from "../../../assets/gerenciar.png";
import excluirIcon from "../../../assets/excluir.png";
import olhoIcon from "../../../assets/olho.png";

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

  const renderIcons = (status, row) => {
    const lowerStatus = status?.toLowerCase();
    const iconStyle = { width: "22px", cursor: "pointer" };
    const wrapperStyle = {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      alignItems: "center",
    };

    switch (lowerStatus) {
      case "pendente":
        return (
          <div style={wrapperStyle}>
            <img
              src={settingsIcon}
              alt="Gerenciar"
              title="Gerenciar"
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => handleManage(row)}
            />
          </div>
        );
      case "rejeitada":
        return (
          <div style={wrapperStyle}>
            <img
              src={olhoIcon}
              alt="Visualizar"
              title="Visualizar"
              style={iconStyle}
              onClick={() => handleView(row)}
            />
            <img
              src={excluirIcon}
              alt="Excluir"
              title="Excluir"
              style={iconStyle}
              onClick={() => handleDelete(row)}
            />
          </div>
        );
      case "aceita":
        return (
          <div style={wrapperStyle}>
            <img
              src={excluirIcon}
              alt="Excluir"
              title="Excluir"
              style={iconStyle}
              onClick={() => handleDelete(row)}
            />
            <img
              src={aprovarIcon}
              alt="Aprovar"
              title="Aprovar"
              style={iconStyle}
              onClick={() => handleApprove(row)}
            />
          </div>
        );
      case "finalizada":
        return (
          <div style={wrapperStyle}>
            <img
              src={olhoIcon}
              alt="Visualizar"
              title="Visualizar"
              style={iconStyle}
              onClick={() => handleView(row)}
            />
          </div>
        );
      default:
        return (
          <div style={wrapperStyle}>
            <img
              src={pesquisaIcon}
              alt="Detalhes"
              title="Detalhes"
              style={iconStyle}
              onClick={() => handleView(row)}
            />
          </div>
        );
    }
  };

  const handleView = (row) => console.log("Visualizar:", row);
  const handleManage = (row) => console.log("Gerenciar:", row);
  const handleDelete = (row) => console.log("Excluir:", row);
  const handleApprove = (row) => console.log("Aprovar:", row);

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
        renderActions={(row) => renderIcons(row.rawStatus, row)}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
