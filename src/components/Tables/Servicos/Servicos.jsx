import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Table from "../Table";
import CriarServico from "../../../modals/Servicos/CriarServicos";

import {
  getAllServices,
  getServiceById,
  deleteService,
} from "../../../services/ServicoService";
import ModalConfirmacao from "../../../modals/Confirmacao/ConfirmacaoModal";
import ModalSucesso from "../../../modals/Sucesso/SucessoModal"
import ModalErro from "../../../modals/Erro/ErroModal";

const TelaServicos = () => {
  const columns = [
    "Título",
    "Descrição",
    "Horas Trabalho",
    "Valor Hora",
    "Valor Total",
  ];

  const [data, setData] = useState([]);
  const [modalMode, setModalMode] = useState("create");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmData, setConfirmData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchOptions = [
    { label: "Título", value: "title" },
    { label: "Descrição", value: "description" },
    { label: "Horas de trabalho", value: "workHours" },
    { label: "Valor por hora", value: "hourValue" },
    { label: "Valor total", value: "totalValue" },
  ];

  const formatServices = (servicesArray) =>
    servicesArray.map((s) => ({
      _id: s._id,
      Título: s.title ?? "-",
      Descrição: s.description ?? "-",
      "Horas Trabalho": s.workHours ?? 0,
      "Valor Hora": s.hourValue ? `R$ ${Number(s.hourValue).toFixed(2)}` : "-",
      "Valor Total": s.totalValue
        ? `R$ ${Number(s.totalValue).toFixed(2)}`
        : "-",
    }));

  const fetchServices = async (filters = {}) => {
    try {
      const response = await getAllServices({
        page: 1,
        limit: 10,
        ...filters,
      });

      const servicesArray = response.data || response;
      setData(formatServices(servicesArray));
    } catch (error) {
      console.error("Erro ao carregar serviços:", error.message);
      setErrorMessage("Erro ao carregar lista de serviços.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchServices();
      return;
    }
    await fetchServices({ identifier, search });
  };

  const handleView = async (row) => {
    try {
      const full = await getServiceById(row._id);
      setSelectedService(full);
      setModalMode("view");
      setIsModalOpen(true);
    } catch (e) {
      console.error("Erro ao visualizar serviço:", e);
      setErrorMessage("Erro ao carregar dados do serviço.");
    }
  };

  const handleEdit = async (row) => {
    try {
      const full = await getServiceById(row._id);
      setSelectedService(full);
      setModalMode("edit");
      setIsModalOpen(true);
    } catch (e) {
      console.error("Erro ao editar serviço:", e);
      setErrorMessage("Erro ao carregar dados para edição.");
    }
  };

  const handleDelete = (row) => {
    setConfirmData({
      id: row._id,
      titulo: row.Título,
    });
  };

  const confirmDeleteAction = async () => {
    if (!confirmData?.id) {
      setErrorMessage("ID do serviço não encontrado.");
      return;
    }

    try {
      await deleteService(confirmData.id);

      setSuccessMessage("Serviço excluído com sucesso!");
      fetchServices();

    } catch (error) {
      console.error("Erro ao excluir serviço:", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao excluir serviço.";

      setErrorMessage(msg);
    } finally {
      setConfirmData(null);
    }
  };

  const handleSaveServico = () => {
    fetchServices();
  };

  return (
    <div>
      <Header
        title="Serviços"
        onNew={() => {
          setModalMode("create");
          setSelectedService(null);
          setIsModalOpen(true);
        }}
      >
        + Novo Serviço
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CriarServico
          mode={modalMode}
          data={selectedService}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveServico}
        />
      )}

      {/* Modal de confirmação */}
      {confirmData && (
        <ModalConfirmacao
          title="Excluir Serviço"
          message={`Tem certeza que deseja excluir o serviço "${confirmData.titulo}"?`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmData(null)}
        />
      )}

      {/* Modal de sucesso */}
      {successMessage && (
        <ModalSucesso
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {/* Modal de erro */}
      {errorMessage && (
        <ModalErro
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default TelaServicos;
