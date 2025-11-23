import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import CriarColaborador from "../../../modals/Mecanicos/CriarMecanicos";
import {
  getAllMechanics,
  deleteMechanic,
} from "../../../services/MecanicoService";

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

  const [modalConfig, setModalConfig] = useState({
    open: false,
    mode: "create",
    mechanic: null,
  });

  const loadMechanics = async () => {
    try {
      const response = await getAllMechanics();
      const mechanicsArray = Array.isArray(response) ? response : [];

      const formattedData = mechanicsArray.map((m) => ({
        _id: m._id,
        Nome: m.name || "-",
        CPF: m.cpf || "-",
        CEP: m.cep || "-",
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
    } catch (err) {
      console.error("Erro ao carregar mecânicos:", err);
    }
  };

  useEffect(() => {
    loadMechanics();
  }, []);

  const openModal = (mode, mechanic = null) => {
    setModalConfig({ open: true, mode, mechanic });
  };

  const closeModal = () => {
    setModalConfig({
      open: false,
      mode: "create",
      mechanic: null,
    });
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Deseja excluir este mecânico?")) return;
    try {
      await deleteMechanic(row._id);
      await loadMechanics();
    } catch (err) {
      console.error("Erro ao excluir:", err.message);
    }
  };

  return (
    <div>
      <Header title="Mecânicos" onNew={() => openModal("create")}>
        + Novo Mecânico
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={(row) => openModal("view", row)}
        onEdit={(row) => openModal("edit", row)}
        onDelete={handleDelete}
      />

      {modalConfig.open && (
        <CriarColaborador
          mode={modalConfig.mode}
          initialData={modalConfig.mechanic}
          onClose={closeModal}
          onSaved={() => {
            loadMechanics();
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default TelaColaboradores;
