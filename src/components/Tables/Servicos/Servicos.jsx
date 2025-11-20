import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Table from "../Table";
import CriarServico from "../../../modals/Servicos/CriarServicos";
import {
  getAllServices,
  getServiceById,
  deleteService,
} from "../../../services/ServicoService";

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
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Tem certeza que deseja excluir este serviço?")) return;

    try {
      await deleteService(row._id);
      fetchServices();
    } catch (e) {
      alert("Erro ao excluir serviço.");
      console.error(e);
    }
  };

  const handleSaveServico = () => {
    fetchServices();
  };

  return (
    <div>
      <Header title="Serviços" onNew={() => { setModalMode("create"); setSelectedService(null); setIsModalOpen(true); }}>
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
    </div>
  );
};

export default TelaServicos;
