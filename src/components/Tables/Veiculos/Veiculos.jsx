import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllVehicles, deleteVehicle } from "../../../services/VeiculoService";
import AcoesVeiculos from "../../../modals/Veiculos/AcoesVeiculos";
import ConfirmModal from "../../../modals/Confirmacao/ConfirmacaoModal";
import SuccessModal from "../../../modals/Sucesso/SucessoModal"
import ErrorModal from "../../../modals/Erro/ErroModal";

const TelaVeiculos = () => {
  const columns = [
    "Marca",
    "Modelo",
    "Placa",
    "Ano",
    "Tipo de Combustível",
    "Chassi",
    "Km",
  ];

  const [data, setData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmData, setConfirmData] = useState(null);

  const searchOptions = [
    { label: "Marca", value: "brand" },
    { label: "Modelo", value: "name" },
    { label: "Placa", value: "licensePlate" },
    { label: "Chassi", value: "chassi" },
    { label: "Km", value: "km" },
    { label: "Ano", value: "year" },
    { label: "Tipo de Combustível", value: "fuel" },
  ];

  const formatVehicles = (vehiclesArray) =>
    vehiclesArray.map((v) => ({
      id: v._id || v.id,
      Marca: v.brand ?? "-",
      Modelo: v.name ?? "-",
      Placa: v.licensePlate ?? "-",
      Ano: v.year ?? "-",
      "Tipo de Combustível": v.fuel ?? "-",
      Chassi: v.chassi ?? "-",
      Km: v.km !== undefined ? `${v.km} km` : "-",
      rawData: v,
    }));

  const fetchVehicles = async (filters = {}) => {
    setIsLoading(true);
    try {
      const response = await getAllVehicles({
        page: 1,
        limit: 10,
        ...filters,
      });

      const vehiclesArray = response.data || response;
      setData(formatVehicles(vehiclesArray));
    } catch (error) {
      console.error("Erro ao carregar veículos:", error.message);
      setErrorMessage("Erro ao carregar veículos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleView = (row) => {
    setSelectedVehicle(row.rawData);
    setModalMode("visualizar");
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedVehicle(row.rawData);
    setModalMode("editar");
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    const placa = row["Placa"];
    const id = row.id || row.rawData?._id || row.rawData?.id;

    if (!id) {
      setErrorMessage("ID do veículo não encontrado.");
      return;
    }

    setConfirmData({
      id,
      message: `Tem certeza que deseja excluir o veículo com placa ${placa}?`,
    });
  };

  const confirmDeleteAction = async () => {
    if (!confirmData) return;

    try {
      await deleteVehicle(confirmData.id);

      setData((prev) => prev.filter((v) => v.id !== confirmData.id));

      setSuccessMessage("Veículo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);

      const extractedMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao excluir veículo.";

      setErrorMessage(extractedMessage);
    } finally {
      setConfirmData(null);
    }
  };

  const handleSaveVehicle = () => {
    fetchVehicles();
    setSuccessMessage("Veículo salvo com sucesso!");
  };

  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchVehicles();
      return;
    }
    await fetchVehicles({ identifier, search });
  };

  return (
    <div>
      <Header title="Veículos" />

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isLoading}
      />

      {isModalOpen && (
        <AcoesVeiculos
          modo={modalMode}
          veiculo={selectedVehicle}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVehicle(null);
            setModalMode(null);
          }}
          onSave={handleSaveVehicle}
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

export default TelaVeiculos;
