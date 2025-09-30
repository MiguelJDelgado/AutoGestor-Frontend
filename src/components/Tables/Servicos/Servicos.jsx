import { useState } from "react";
import Header from "../../Header/Header";
import Table from "../Table";
import CriarServico from "../../../modals/Servicos/CriarServicos";

const TelaServicos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
   const columns = ["Título", "Descrição", "Horas Trabalho", "Valor Hora", "Valor Total"];

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

