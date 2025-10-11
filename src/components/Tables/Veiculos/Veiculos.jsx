import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllVehicles } from "../../../services/VeiculoService";

const TelaVeiculos = () => {
  const columns = ["Marca", "Modelo", "Placa", "Ano", "Tipo de Combustível", "Chassi", "Km"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getAllVehicles();
        const vehiclesArray = response.data || response;

        const formattedData = vehiclesArray.map((v) => ({
          "Marca": v.brand,
          "Modelo": v.name,
          "Placa": v.licensePlate,
          "Ano": v.year,
          "Tipo de Combustível": v.fuel,
          "Chassi": v.chassi || "-",
          "Km": v.km !== undefined ? `${v.km} km` : "-",
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error.message);
      }
    };

    fetchVehicles();
  }, []);

  const handleView = (row) => console.log("Visualizar veículo:", row);
  const handleEdit = (row) => console.log("Editar veículo:", row);
  const handleDelete = (row) => console.log("Excluir veículo:", row);

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
    </div>
  );
};

export default TelaVeiculos;
