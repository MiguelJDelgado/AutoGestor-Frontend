import { useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";

const data = [
  {
    Nome: "Carlos Almeida",
    Email: "carlos.almeida@empresa.com",
    "Perfil de acesso": "Administrador",
  },
  {
    Nome: "Mariana Silva",
    Email: "mariana.silva@empresa.com",
    "Perfil de acesso": "Usuário",
  },
  {
    Nome: "João Pedro",
    Email: "joao.pedro@empresa.com",
    "Perfil de acesso": "Supervisor",
  },
  {
    Nome: "Beatriz Rocha",
    Email: "beatriz.rocha@empresa.com",
    "Perfil de acesso": "Usuário",
  },
  {
    Nome: "Ricardo Santos",
    Email: "ricardo.santos@empresa.com",
    "Perfil de acesso": "Administrador",
  },
];

const columns = ["Nome", "Email", "Perfil de acesso"];

const TelaConfiguracoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header title="Configurações" onNew={() => setIsModalOpen(true)}>
        + Novo Colaborador
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onSearch={() => console.log("Buscar colaborador...")}
      />

      {isModalOpen && (
        <ModalNovaSolicitacao onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TelaConfiguracoes;
