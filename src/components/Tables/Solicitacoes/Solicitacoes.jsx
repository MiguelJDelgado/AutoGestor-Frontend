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
import ModalSolicitacaoComprada from "../../../modals/Solicitacoes/SolicitacaoComprada";
import ModalConfirmacao from "../../../modals/Confirmacao/ConfirmacaoModal";
import ModalSucesso from "../../../modals/Sucesso/SucessoModal"
import ModalErro from "../../../modals/Erro/ErroModal";

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
  const [confirmData, setConfirmData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


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
        style.backgroundColor = "#facc15";
        status = "Pendente";
        break;
      case "approved":
        style.backgroundColor = "#3b82f6"; 
        status = "Autorizado";
        break;
      case "rejected":
        style.backgroundColor = "#ef4444"; 
        status = "Rejeitado";
        break;
      case "purchased":
        style.backgroundColor = "#22c55e"; 
        status = "Comprado";
        break;
      case "delivered":
        style.backgroundColor = "#a855f7"; 
        status = "Finalizado";
        break;
      default:
        style.backgroundColor = "#9ca3af";
    }

    return <span style={style}>{status || "—"}</span>;
  };

  const formatSolicitacoes = (solicitacoes) =>
    solicitacoes.map((s) => {
      const produtoPrincipal = s.products?.[0];
      const quantidade =
        (produtoPrincipal?.quantityToServiceOrder ?? 0) +
        (produtoPrincipal?.quantityToStock ?? 0);

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

  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchSolicitacoes();
      return;
    }
    await fetchSolicitacoes({ identifier, search });
  };

  const abrirModalVisualizacao = (row) => {
    setSolicitacaoSelecionada(row.rawData);
    switch (row.rawStatus?.toLowerCase()) {
      case "pending":
        setModalTipo("pendente");
        break;
      case "approved":
        setModalTipo("autorizada");
        break;
      case "rejected":
        setModalTipo("rejeitada");
        break;
      case "purchased":
        setModalTipo("comprada");
        break;
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

  const confirmDeleteAction = async () => {
    if (!confirmData) return;

    const id = confirmData.rawData?._id;
    if (!id) {
      setErrorMessage("ID da solicitação não encontrado.");
      return;
    }

    try {
      await deleteSolicitacao(id);

      setData((prev) => prev.filter((item) => item.rawData._id !== id));

      setSuccessMessage("Solicitação excluída com sucesso!");

    } catch (error) {
      console.error("Erro ao excluir solicitação:", error);

      const extracted =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao excluir solicitação.";

      setErrorMessage(extracted);
    } finally {
      setConfirmData(null);
    }
  };

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
        onDelete={(row) => setConfirmData(row)}
        loading={isLoading}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSolicitacao}
        />
      )}

      {modalAberto && modalTipo === "pendente" && (
        <ModalPendente
          onClose={fecharModal}
          solicitacao={solicitacaoSelecionada}
          onStatusUpdated={fetchSolicitacoes}
        />

      )}
      {modalAberto && modalTipo === "autorizada" && (
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
      {modalAberto && modalTipo === "comprada" && (
        <ModalSolicitacaoComprada
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
      {/* Modal de Confirmação */}
      {confirmData && (
        <ModalConfirmacao
          title="Excluir Solicitação"
          message={`Tem certeza que deseja excluir essa solicitação de compra?`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmData(null)}
        />
      )}

      {/* Modal de Sucesso */}
      {successMessage && (
        <ModalSucesso
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {/* Modal de Erro */}
      {errorMessage && (
        <ModalErro
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
