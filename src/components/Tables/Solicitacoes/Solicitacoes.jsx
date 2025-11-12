/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import {
  getAllSolicitacao,
  deleteSolicitacao,
} from "../../../services/SolicitacaoService";

import ModalNovaSolicitacao from "../../../modals/Solicitacoes/CriarSolicitacao";
import ModalPendente from "../../../modals/Solicitacoes/SolicitacaoPendente";
import ModalAceita from "../../../modals/Solicitacoes/SolicitacaoAceita";
import ModalRejeitada from "../../../modals/Solicitacoes/SolicitacaoRejeitada";
import ModalFinalizada from "../../../modals/Solicitacoes/SolicitacaoFinalizada";

const TelaSolicitacoes = () => {
  const columns = [
    "OS",
    "Produto Solicitado",
    "Quantidade",
    "Solicitante",
    "Status",
    "Data Solicitação",
    "Data Finalização",
  ];

  const searchOptions = [
    { label: "Produto", value: "productName" },
    { label: "Solicitante", value: "userName" },
    { label: "Status", value: "status" },
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Renderiza o status com cores conforme o RequestBuyStatus
  const renderStatus = (status) => {
    const style = {
      padding: "6px 0",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      display: "inline-block",
      width: "120px",
      textAlign: "center",
    };

    switch (status?.toLowerCase()) {
      case "pending":
        style.backgroundColor = "#facc15"; // amarelo
        status = "Pendente";
        break;
      case "approved":
        style.backgroundColor = "#3b82f6"; // azul
        status = "Autorizado";
        break;
      case "rejected":
        style.backgroundColor = "#ef4444"; // vermelho
        status = "Rejeitado";
        break;
      case "purchased":
        style.backgroundColor = "#22c55e"; // verde
        status = "Comprado";
        break;
      case "delivered":
        style.backgroundColor = "#a855f7"; // roxo
        status = "Finalizado";
        break;
      default:
        style.backgroundColor = "#9ca3af";
    }

    return <span style={style}>{status || "—"}</span>;
  };

  // 🔹 Converte o array do backend para formato da tabela
  const formatSolicitacoes = (solicitacoes) =>
    solicitacoes.map((s) => {
      const produtoPrincipal = s.products?.[0];
      const quantidade =
        produtoPrincipal?.quantityToServiceOrder ||
        produtoPrincipal?.quantity ||
        0;

      return {
        OS: s.serviceOrderCode ? `${s.serviceOrderCode}` : "-",

        "Produto Solicitado": produtoPrincipal?.name || "-",
        Quantidade: `${quantidade} un`,
        Solicitante: s.userName || s.userId?.name || "-",
        Status: renderStatus(s.status),
        "Data Solicitação": s.requestDate
          ? new Date(s.requestDate).toLocaleDateString("pt-BR")
          : "-",
        "Data Finalização": s.deliveredDate
          ? new Date(s.deliveredDate).toLocaleDateString("pt-BR")
          : "—",
        rawData: s,
        rawStatus: s.status,
      };
    });

  // 🔹 Busca solicitações do backend
  const fetchSolicitacoes = async (filters = {}) => {
    setIsLoading(true);
    try {
      const response = await getAllSolicitacao({
        page: 1,
        limit: 10,
        ...filters,
      });

      const solicitacoesArray = response.data || response;
      setData(formatSolicitacoes(solicitacoesArray));
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  // 🔹 Pesquisa dinâmica
  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchSolicitacoes();
      return;
    }
    await fetchSolicitacoes({ identifier, search });
  };

  // 🔹 Visualizar modais conforme status
  const abrirModalVisualizacao = (row) => {
    setSolicitacaoSelecionada(row.rawData);
    switch (row.rawStatus?.toLowerCase()) {
      case "pending":
        setModalTipo("pendente");
        break;
      case "approved":
        setModalTipo("aceita");
        break;
      case "rejected":
        setModalTipo("rejeitada");
        break;
      case "purchased":
      case "delivered":
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

  // 🔹 Exclusão real via backend
  const excluirSolicitacao = async (row) => {
    const id = row.rawData?._id;
    if (!id) {
      alert("ID da solicitação não encontrado.");
      return;
    }

    const confirm = window.confirm(
      `Tem certeza que deseja excluir a solicitação ${row.OS}?`
    );
    if (!confirm) return;

    try {
      await deleteSolicitacao(id);
      alert("Solicitação excluída com sucesso!");
      setData((prev) => prev.filter((item) => item.rawData._id !== id));
    } catch (error) {
      console.error("Erro ao excluir solicitação:", error.message);
      alert("Erro ao excluir solicitação.");
    }
  };

  // 🔹 Após criar nova solicitação
  const handleSaveSolicitacao = async () => {
    setIsModalOpen(false);
    await fetchSolicitacoes();
  };

  return (
    <div>
      <Header title="Solicitações" onNew={() => setIsModalOpen(true)}>
        + Nova Solicitação
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        onView={abrirModalVisualizacao}
        onDelete={excluirSolicitacao}
        loading={isLoading}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSolicitacao}
        />
      )}

      {/* Modais específicos conforme status */}
      {modalAberto && modalTipo === "pendente" && (
        <ModalPendente
          solicitacao={solicitacaoSelecionada}
          onClose={fecharModal}
        />
      )}
      {modalAberto && modalTipo === "aceita" && (
        <ModalAceita
          solicitacao={solicitacaoSelecionada}
          onClose={fecharModal}
        />
      )}
      {modalAberto && modalTipo === "rejeitada" && (
        <ModalRejeitada
          solicitacao={solicitacaoSelecionada}
          onClose={fecharModal}
        />
      )}
      {modalAberto && modalTipo === "finalizada" && (
        <ModalFinalizada
          solicitacao={solicitacaoSelecionada}
          onClose={fecharModal}
        />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
