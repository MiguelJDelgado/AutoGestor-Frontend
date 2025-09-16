import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getSuppliers } from "../../../services/FornecedorService";

const TelaFornecedores = () => {
  const columns = ["Nome", "Endereço", "Celular", "CNPJ"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers({ page: 1, limit: 10 });

        const suppliersArray = response.data || [];

        const formattedData = suppliersArray.map((f) => ({
          Nome: f.name,
          Endereço: f.address,
          Celular: f.phone,
          CNPJ: f.cnpj,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error.message);
      }
    };

    fetchSuppliers();
  }, []);

  const handleView = (row) => console.log("Visualizar fornecedor", row);
  const handleEdit = (row) => console.log("Editar fornecedor", row);
  const handleDelete = (row) => console.log("Excluir fornecedor", row);

  return (
    <div>
      <Header title="Fornecedores" children="+ Novo Fornecedor" />
      <Table
        columns={columns}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TelaFornecedores;
