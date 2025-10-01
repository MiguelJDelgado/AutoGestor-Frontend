import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getSuppliers } from "../../../services/FornecedorService";
import CriarFornecedor from "../../../modals/Fornecedores/CriarFornecedores"; // importe o modal

const TelaFornecedores = () => {
  const columns = ["Nome", "Endereço", "Celular", "CNPJ"];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSaveFornecedor = (novoFornecedor) => {
    setData((prev) => [...prev, {
      Nome: novoFornecedor.nome,
      Endereço: novoFornecedor.endereco,
      Celular: novoFornecedor.celular,
      CNPJ: novoFornecedor.cnpj
    }]);
  };

  return (
    <div>
      <Header
        title="Fornecedores"
        onNew={() => setIsModalOpen(true)}
      >
        + Novo Fornecedor
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
        <CriarFornecedor
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFornecedor}
        />
      )}
    </div>
  );
};

export default TelaFornecedores;
