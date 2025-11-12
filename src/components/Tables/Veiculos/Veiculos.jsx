import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllVehicles, deleteVehicle } from "../../../services/VeiculoService";
import AcoesVeiculos from "../../../modals/Veiculos/AcoesVeiculos";

const TelaVeiculos = () => {
  const columns = ["Marca", "Modelo", "Placa", "Ano", "Tipo de Combustível", "Chassi", "Km"];
  const [data, setData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesArray = await getAllVehicles(); 

        const formattedData = vehiclesArray.map((v) => ({
          "Marca": v.brand,
          "Modelo": v.name,
          "Placa": v.licensePlate,
          "Ano": v.year,
          "Tipo de Combustível": v.fuel,
          "Chassi": v.chassi || "-",
          "Km": v.km !== undefined ? `${v.km} km` : "-",
          rawData: v,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error.message);
      }
    };

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

  const handleDelete = async (row) => {
    const placa = row["Placa"];
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o veículo com placa ${placa}?`);
    if (!confirmDelete) return;

    try {
      const id = row.rawData.id;
      await deleteVehicle(id);

      setData((prevData) => prevData.filter((item) => item["Placa"] !== placa));

      alert(`Veículo com placa ${placa} excluído com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir veículo:", error.message);
      alert("Erro ao excluir o veículo. Tente novamente.");
    }
  };

  const handleSaveVehicle = (updatedVehicle) => {
    setData((prev) =>
      prev.map((item) =>
        item["Placa"] === updatedVehicle.licensePlate
          ? {
              ...item,
              Marca: updatedVehicle.brand,
              Modelo: updatedVehicle.name,
              Ano: updatedVehicle.year,
              "Tipo de Combustível": updatedVehicle.fuel,
              Chassi: updatedVehicle.chassi || "-",
              Km: updatedVehicle.km ? `${updatedVehicle.km} km` : "-",
              rawData: { ...updatedVehicle },
            }
          : item
      )
    );
  };

  return (
    <div>
      <Header title="Veículos" />
      <Table
        columns={columns}
        data={data}
        searchOptions={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
    </div>
  );
};

export default TelaVeiculos;
