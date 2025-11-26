import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getSuppliers, deleteSupplier } from "../../../services/FornecedorService";
import CriarFornecedor from "../../../modals/Fornecedores/CriarFornecedores";
import ConfirmModal from "../../../modals/Confirmacao/ConfirmacaoModal";
import SuccessModal from "../../../modals/Sucesso/SucessoModal"
import ErrorModal from "../../../modals/Erro/ErroModal";

const TelaFornecedores = () => {
  const fieldMap = {
    "Nome / Razão Social": "name",
    CNPJ: "cnpj",
    Celular: "cellphone",
    Email: "email",
    Endereço: "address",
    Número: "number",
    Município: "city",
    CEP: "cep",
    "Inscrição Estadual": "stateRegistration",
    Anotação: "notes",
  };

  const columns = [
    "Nome",
    "CNPJ",
    "Celular",
    "Email",
    "Endereço",
    "Número",
    "Município",
    "CEP",
    "Inscrição Estadual",
    "Anotação",
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("new");
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmData, setConfirmData] = useState(null);

  const handleSearch = async ({ identifier, search }) => {
    try {
      const backendField = fieldMap[identifier] || identifier;
      const response = await getSuppliers({
        identifier: backendField,
        search,
      });

      const suppliersArray = response.data || [];

      const formattedData = suppliersArray.map((f) => ({
        Nome: f.name,
        Endereço: f.address,
        Celular: f.cellphone,
        CNPJ: f.cnpj,
        "Inscrição Estadual": f.stateRegistration,
        Email: f.email,
        Número: f.number,
        Município: f.city,
        Estado: f.state,
        CEP: f.cep,
        Anotação: f.notes,
        __raw: f,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error.message);
      setErrorMessage("Erro ao buscar fornecedores.");
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers({ page: 1, limit: 10 });
        const suppliersArray = response.data || response;

        const formattedData = suppliersArray.map((f) => ({
          Nome: f.name,
          Endereço: f.address,
          Celular: f.cellphone,
          CNPJ: f.cnpj,
          "Inscrição Estadual": f.stateRegistration,
          Email: f.email,
          Número: f.number,
          Município: f.city,
          Estado: f.state,
          CEP: f.cep,
          Anotação: f.notes,
          __raw: f,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error.message);
        setErrorMessage("Erro ao carregar fornecedores.");
      }
    };

    fetchSuppliers();
  }, []);

  const handleView = (row) => {
    setSelectedFornecedor(row.__raw);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedFornecedor(row.__raw);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    const fornecedor = row.__raw;

    setConfirmData({
      id: fornecedor._id,
      message: `Tem certeza que deseja excluir o fornecedor "${fornecedor.name}"?`,
    });
  };

  const confirmDeleteAction = async () => {
    if (!confirmData) return;

    try {
      await deleteSupplier(confirmData.id);

      setData((prev) =>
        prev.filter((item) => item.__raw._id !== confirmData.id)
      );

      setSuccessMessage("Fornecedor excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);

      const extractedMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao excluir fornecedor.";

      setErrorMessage(extractedMessage);
    } finally {
      setConfirmData(null);
    }
  };

  const handleSaveFornecedor = () => {
    setSuccessMessage("Fornecedor salvo com sucesso!");
    setIsModalOpen(false);

    getSuppliers().then((response) => {
      const suppliersArray = response.data || response;

      const formattedData = suppliersArray.map((f) => ({
        Nome: f.name,
        Endereço: f.address,
        Celular: f.cellphone,
        CNPJ: f.cnpj,
        "Inscrição Estadual": f.stateRegistration,
        Email: f.email,
        Número: f.number,
        Município: f.city,
        Estado: f.state,
        CEP: f.cep,
        Anotação: f.notes,
        __raw: f,
      }));

      setData(formattedData);
    });
  };

  return (
    <div>
      <Header
        title="Fornecedores"
        onNew={() => {
          setModalMode("new");
          setSelectedFornecedor(null);
          setIsModalOpen(true);
        }}
      >
        + Novo Fornecedor
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={[
          { label: "Nome / Razão Social", value: "name" },
          { label: "CNPJ", value: "cnpj" },
          { label: "Celular", value: "cellphone" },
          { label: "Email", value: "email" },
          { label: "Endereço", value: "address" },
          { label: "Número", value: "number" },
          { label: "Município", value: "city" },
          { label: "CEP", value: "cep" },
          { label: "Inscrição Estadual", value: "stateRegistration" },
          { label: "Anotação", value: "notes" },
        ]}
        onSearch={handleSearch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CriarFornecedor
          mode={modalMode}
          fornecedor={selectedFornecedor}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFornecedor}
        />
      )}

      {/* 🔹 Modal de sucesso */}
      {successMessage && (
        <SuccessModal
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {/* 🔹 Modal de erro */}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {/* 🔹 Modal de confirmação */}
      {confirmData && (
        <ConfirmModal
          message={confirmData.message}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmData(null)}
        />
      )}
    </div>
  );
};

export default TelaFornecedores;
