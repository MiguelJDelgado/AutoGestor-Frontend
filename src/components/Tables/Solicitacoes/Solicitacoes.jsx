import { useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import olhoIcon from "../../../assets/olho.png";
import excluirIcon from "../../../assets/excluir.png";
import ModalNovaSolicitacao from "../../../modals/Solicitacoes/CriarSolicitacao";

import ModalPendente from "../../../modals/Solicitacoes/SolicitacaoPendente";
import ModalAceita from "../../../modals/Solicitacoes/SolicitacaoAceita";
import ModalRejeitada from "../../../modals/Solicitacoes/SolicitacaoRejeitada";
import ModalFinalizada from "../../../modals/Solicitacoes/SolicitacaoFinalizada";

const TelaSolicitacoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  const columns = [
    "OS",
    "Produto Solicitado",
    "Quantidade",
    "Solicitante",
    "Status",
    "Data Solicitação",
    "Data Finalização",
    "Ações",
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

  const abrirModalVisualizacao = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao);
    switch (solicitacao.rawStatus?.toLowerCase()) {
      case "pendente":
        setModalTipo("pendente");
        break;
      case "aceita":
        setModalTipo("aceita");
        break;
      case "rejeitada":
        setModalTipo("rejeitada");
        break;
      case "finalizada":
        setModalTipo("finalizada");
        break;
      default:
        setModalTipo(null);
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setModalTipo(null);
    setSolicitacaoSelecionada(null);
  };

  const excluirSolicitacao = (id) => {
    console.log("Excluir solicitação ID:", id);
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
      rawStatus: "Pendente",
    },
    {
      OS: "002",
      "Produto Solicitado": "Notebook Dell",
      Quantidade: "5 un",
      Solicitante: "Mariana Silva",
      Status: renderStatus("Rejeitada"),
      "Data Solicitação": "01/09/2025",
      "Data Finalização": "03/09/2025",
      rawStatus: "Rejeitada",
    },
    {
      OS: "003",
      "Produto Solicitado": "Cadeiras Escritório",
      Quantidade: "20 un",
      Solicitante: "João Pedro",
      Status: renderStatus("Aceita"),
      "Data Solicitação": "10/09/2025",
      "Data Finalização": "—",
      rawStatus: "Aceita",
    },
    {
      OS: "004",
      "Produto Solicitado": "Mesa de Reunião",
      Quantidade: "2 un",
      Solicitante: "Beatriz Rocha",
      Status: renderStatus("Finalizada"),
      "Data Solicitação": "01/08/2025",
      "Data Finalização": "05/08/2025",
      rawStatus: "Finalizada",
    },
  ].map((item) => ({
    ...item,
    Ações: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={olhoIcon}
          alt="Ver detalhes"
          style={{ cursor: "pointer", width: "20px" }}
          onClick={() => abrirModalVisualizacao(item)}
        />
        <img
          src={excluirIcon}
          alt="Excluir"
          style={{ cursor: "pointer", width: "20px" }}
          onClick={() => excluirSolicitacao(item.OS)}
        />
      </div>
    ),
  }));

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
        showActions={false}
      />

      {isModalOpen && <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />}

      {/* Modais específicos conforme status */}
      {modalAberto && modalTipo === "pendente" && (
        <ModalPendente solicitacao={solicitacaoSelecionada} onClose={fecharModal} />
      )}
      {modalAberto && modalTipo === "aceita" && (
        <ModalAceita solicitacao={solicitacaoSelecionada} onClose={fecharModal} />
      )}
      {modalAberto && modalTipo === "rejeitada" && (
        <ModalRejeitada solicitacao={solicitacaoSelecionada} onClose={fecharModal} />
      )}
      {modalAberto && modalTipo === "finalizada" && (
        <ModalFinalizada solicitacao={solicitacaoSelecionada} onClose={fecharModal} />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
