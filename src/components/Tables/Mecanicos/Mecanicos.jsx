import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import CriarColaborador from "../../../modals/Mecanicos/CriarMecanicos";
import {
  getAllMechanics,
  deleteMechanic,
} from "../../../services/MecanicoService";
import ModalConfirmacao from "../../../modals/Confirmacao/ConfirmacaoModal";
import ModalSucesso from "../../../modals/Sucesso/SucessoModal"
import ModalErro from "../../../modals/Erro/ErroModal";

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

  // Modais de feedback
  const [modalConfirm, setModalConfirm] = useState({
    open: false,
    mechanic: null,
  });

  const [modalSuccess, setModalSuccess] = useState({
    open: false,
    message: "",
  });

  const [modalError, setModalError] = useState({
    open: false,
    message: "",
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
      setModalError({
        open: true,
        message: "Erro ao carregar mecânicos.",
      });
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

  const handleDelete = (row) => {
    setModalConfirm({
      open: true,
      mechanic: row,
    });
  };

  const confirmDelete = async () => {
    const mechanic = modalConfirm.mechanic;

    try {
      await deleteMechanic(mechanic._id);
      await loadMechanics();

      setModalSuccess({
        open: true,
        message: `Mecânico "${mechanic.Nome}" excluído com sucesso.`,
      });
    } catch (err) {
      console.error("Erro ao excluir:", err.message);

      setModalError({
        open: true,
        message: "Erro ao excluir o mecânico.",
      });
    }

    setModalConfirm({ open: false, mechanic: null });
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

      {/* Modal de criação/edição/visualização */}
      {modalConfig.open && (
        <CriarColaborador
          mode={modalConfig.mode}
          initialData={modalConfig.mechanic}
          onClose={closeModal}
          onSaved={() => {
            loadMechanics();
            closeModal();
            setModalSuccess({
              open: true,
              message: "Mecânico salvo com sucesso!",
            });
          }}
        />
      )}

      {/* Modal de Confirmação */}
      {modalConfirm.open && (
        <ModalConfirmacao
          title="Confirmação"
          message={`Deseja realmente excluir o mecânico "${modalConfirm.mechanic.Nome}"?`}
          onConfirm={confirmDelete}
          onCancel={() =>
            setModalConfirm({ open: false, mechanic: null })
          }
        />
      )}

      {/* Modal de Sucesso */}
      {modalSuccess.open && (
        <ModalSucesso
          message={modalSuccess.message}
          onClose={() => setModalSuccess({ open: false, message: "" })}
        />
      )}

      {/* Modal de Erro */}
      {modalError.open && (
        <ModalErro
          message={modalError.message}
          onClose={() => setModalError({ open: false, message: "" })}
        />
      )}
    </div>
  );
};

export default TelaColaboradores;
