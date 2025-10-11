import { useState, useEffect } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import ModalNovaSolicitacao from "../../../modals/Solicitacoes/CriarSolicitacao";

const TelaSolicitacoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    "OS",
    "Produto Solicitado",
    "Quantidade",
    "Solicitante",
    "Status",
    "Data Solicitação",
    "Data Finalização",
    "Fornecedor",
    "Valor Pago",
  ];

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        setLoading(true);
        // const response = await fetch("http://seu-endpoint/api/solicitacoes");
        // const json = await response.json();
        // setData(json);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  const handleView = (row) => console.log("Visualizar Solicitação", row);
  const handleEdit = (row) => console.log("Editar Solicitação", row);
  const handleDelete = (row) => console.log("Excluir Solicitação", row);

  return (
    <div>
      <Header title="Solicitações" onNew={() => setIsModalOpen(true)}>
        + Nova Solicitação
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={() => console.log("Buscar solicitação...")}
        loading={loading}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TelaSolicitacoes;
