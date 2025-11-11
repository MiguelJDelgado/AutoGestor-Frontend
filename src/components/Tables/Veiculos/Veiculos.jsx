import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getAllVehicles } from "../../../services/VeiculoService";

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
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Opções de pesquisa com mapeamento conforme backend
  const searchOptions = [
    { label: "Marca", value: "brand" },
    { label: "Modelo", value: "name" },
    { label: "Placa", value: "licensePlate" },
    { label: "Chassi", value: "chassi" },
    { label: "Km", value: "km" },
    { label: "Ano", value: "year" },
    { label: "Tipo de Combustível", value: "fuel" },
  ];

  // 🔹 Formata veículos vindos do backend
  const formatVehicles = (vehiclesArray) =>
    vehiclesArray.map((v) => ({
      Marca: v.brand ?? "-",
      Modelo: v.name ?? "-",
      Placa: v.licensePlate ?? "-",
      Ano: v.year ?? "-",
      "Tipo de Combustível": v.fuel ?? "-",
      Chassi: v.chassi ?? "-",
      Km: v.km !== undefined ? `${v.km} km` : "-",
    }));

  // 🔹 Função genérica de busca
  const fetchVehicles = async (filters = {}) => {
    setIsLoading(true);
    try {
      const response = await getAllVehicles({
        page: 1,
        limit: 10,
        ...filters, // inclui identifier e search, se houver
      });

      const vehiclesArray = response.data || response;
      setData(formatVehicles(vehiclesArray));
    } catch (error) {
      console.error("Erro ao carregar veículos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Carrega todos os veículos ao montar o componente
  useEffect(() => {
    fetchVehicles();
  }, []);

  // 🔹 Pesquisa — envia os parâmetros esperados pelo backend
  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchVehicles(); // se limpar os filtros, recarrega tudo
      return;
    }
    await fetchVehicles({ identifier, search });
  };

  // 🔹 Ações da tabela
  const handleView = (row) => console.log("Visualizar veículo:", row);
  const handleEdit = (row) => console.log("Editar veículo:", row);
  const handleDelete = (row) => console.log("Excluir veículo:", row);

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
    </div>
  );
};

export default TelaVeiculos;
