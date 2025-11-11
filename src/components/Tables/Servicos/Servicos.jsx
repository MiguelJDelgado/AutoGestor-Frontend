import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Table from "../Table";
import CriarServico from "../../../modals/Servicos/CriarServicos";
import { getAllServices } from "../../../services/ServicoService";

const TelaServicos = () => {
  const columns = [
    "Título",
    "Descrição",
    "Horas Trabalho",
    "Valor Hora",
    "Valor Total",
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Campos de busca com mapeamento conforme backend
  const searchOptions = [
    { label: "Título", value: "title" },
    { label: "Descrição", value: "description" },
    { label: "Horas de trabalho", value: "workHours" },
    { label: "Valor por hora", value: "hourValue" },
    { label: "Valor total", value: "totalValue" },
  ];

  // 🔹 Formata serviços retornados do backend
  const formatServices = (servicesArray) =>
    servicesArray.map((s) => ({
      Título: s.title ?? "-",
      Descrição: s.description ?? "-",
      "Horas Trabalho": s.workHours ?? 0,
      "Valor Hora": s.hourValue
        ? `R$ ${Number(s.hourValue).toFixed(2)}`
        : "-",
      "Valor Total": s.totalValue
        ? `R$ ${Number(s.totalValue).toFixed(2)}`
        : "-",
    }));

  // 🔹 Busca serviços (padrão para carregamento e pesquisa)
  const fetchServices = async (filters = {}) => {
    try {
      const response = await getAllServices({
        page: 1,
        limit: 10,
        ...filters,
      });

      // Considera que o backend retorna { data: [...] }
      const servicesArray = response.data || response;
      setData(formatServices(servicesArray));
    } catch (error) {
      console.error("Erro ao carregar serviços:", error.message);
    }
  };

  // 🔹 Carrega todos os serviços ao montar o componente
  useEffect(() => {
    fetchServices();
  }, []);

  // 🔹 Pesquisa: envia campos `identifier` e `search`
  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchServices(); // limpa pesquisa
      return;
    }
    await fetchServices({ identifier, search });
  };

  // 🔹 Ações da tabela (pode ser estendido depois)
  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  // 🔹 Ao salvar novo serviço
  const handleSaveServico = (novoServico) => {
    console.log("Novo serviço salvo:", novoServico);
    fetchServices(); // recarrega lista
  };

  return (
    <div>
      <Header title="Serviços" onNew={() => setIsModalOpen(true)}>
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
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveServico}
        />
      )}
    </div>
  );
};

export default TelaServicos;
