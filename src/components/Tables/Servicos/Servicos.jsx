import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Table from "../Table";
import CriarServico from "../../../modals/Servicos/CriarServicos";
import { getAllServices } from "../../../services/ServicoService"; 

const TelaServicos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = ["Título", "Descrição", "Horas Trabalho", "Valor Hora", "Valor Total"];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const services = await getAllServices();
      console.log("🔍 Retorno do back:", services); // 👈 veja o que vem aqui

      const tableData = services.map(s => ({
        titulo: s.title,
        descricao: s.description,
        horasTrabalho: s.workHours,
        valorHora: s.hourValue,
        valorTotal: s.totalValue,
      }));

      console.log("📋 Dados formatados para tabela:", tableData); // 👈 veja aqui também
      setData(tableData);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const handleSaveServico = (novoServico) => {
    setData((prev) => [...prev, novoServico]);
  };

  return (
    <div>
      <Header title="Serviços" onNew={() => setIsModalOpen(true)}>
        + Novo Serviço
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        loading={loading}
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
