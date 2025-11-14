import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import CriarColaborador from "../../../modals/Mecanicos/CriarMecanicos";
import { getAllMechanics } from "../../../services/ColaboradorService";

const TelaColaboradores = () => {
  const columns = [
    "Nome",
    "CPF",
    "Cargo",
    "Telefone",
    "Email",
    "Endereço",
    "Número",
    "Município",
    "UF",
    "Anotação",
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await getAllMechanics();
        const mechanicsArray = Array.isArray(response) ? response : [];

        const formattedData = mechanicsArray.map((m) => ({
          Nome: m.name || "-",
          CPF: m.cpf || "-",
          Cargo: m.position || "-",
          Telefone: m.cellphone || "-",
          Email: m.email || "-",
          Endereço: m.address || "-",
          Número: m.number || "-",
          Município: m.city || "-",
          UF: m.state || "-",
          Anotação: m.notes || "-",
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error.message);
      }
    };

    fetchMechanics();
  }, []);

  const handleView = (row) => console.log("Visualizar Colaborador:", row);
  const handleEdit = (row) => console.log("Editar Colaborador:", row);
  const handleDelete = (row) => console.log("Excluir Colaborador:", row);

  const handleSaveColaborador = (novoColaborador) => {
    setData((prevData) => [
      ...prevData,
      {
        Nome: novoColaborador.name,
        CPF: novoColaborador.cpf,
        Cargo: novoColaborador.position,
        Telefone: novoColaborador.cellphone,
        Email: novoColaborador.email,
        Endereço: novoColaborador.address,
        Número: novoColaborador.number,
        Município: novoColaborador.city,
        UF: novoColaborador.state,
        Anotação: novoColaborador.notes || "-",
      },
    ]);
    setIsModalOpen(false);
    console.log("Novo colaborador salvo:", novoColaborador);
  };

  return (
    <div>
      <Header title="Mecânicos" onNew={() => setIsModalOpen(true)}>
        + Novo Mecânico
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CriarColaborador
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveColaborador}
        />
      )}
    </div>
  );
};

export default TelaColaboradores;
