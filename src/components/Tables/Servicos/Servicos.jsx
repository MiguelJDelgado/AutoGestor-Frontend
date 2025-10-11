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
        console.log("🔍 Retorno do back:", services);

        // Formata os dados vindos do backend
        const formatted = services.map((item) => {
          const horas = item.workHours || item.horasTrabalho || "";
          const valorHora = item.hourValue || item.valorHora || "";
          const valorTotal =
            item.totalValue ||
            (horas && valorHora ? Number(horas) * Number(valorHora) : "");

          return {
            titulo: item.title || item.titulo,
            descricao: item.description || item.descricao,
            horasTrabalho: horas,
            valorHora,
            valorTotal,
          };
        });

        // 🔁 Converte para o formato esperado pela tabela
        const formattedForTable = formatted.map((item) => ({
          Título: item.titulo,
          Descrição: item.descricao,
          "Horas Trabalho": item.horasTrabalho,
          "Valor Hora": item.valorHora,
          "Valor Total": item.valorTotal,
        }));

        console.log("📋 Dados enviados à tabela:", formattedForTable);
        setData(formattedForTable);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveServico = (novoServico) => {
    // Quando criar um novo serviço, converte também para o formato da tabela
    const novoServicoFormatado = {
      Título: novoServico.title || novoServico.titulo,
      Descrição: novoServico.description || novoServico.descricao,
      "Horas Trabalho": novoServico.workHours || novoServico.horasTrabalho,
      "Valor Hora": novoServico.hourValue || novoServico.valorHora,
      "Valor Total":
        novoServico.totalValue ||
        (novoServico.workHours && novoServico.hourValue
          ? Number(novoServico.workHours) * Number(novoServico.hourValue)
          : ""),
    };

    setData((prev) => [...prev, novoServicoFormatado]);
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
