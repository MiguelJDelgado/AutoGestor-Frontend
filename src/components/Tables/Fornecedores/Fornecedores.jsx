import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getSuppliers } from "../../../services/FornecedorService";
import CriarFornecedor from "../../../modals/Fornecedores/CriarFornecedores";

const TelaFornecedores = () => {
  const fieldMap = {
  "Nome / Razão Social": "name",
  "CNPJ": "cnpj",
  "Celular": "cellphone",
  "Email": "email",
  "Endereço": "address",
  "Número": "number",
  "Município": "city",
  "CEP": "cep",
  "Inscrição Estadual": "stateRegistration",
  "Anotação": "notes",
};

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
    }));
    setData(formattedData);
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error.message);
  }
};
  const columns = ["Nome", "CNPJ", "Celular", "Email", "Endereço", "Número", "Município", "CEP", "Inscrição Estadual", "Anotação"];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFornecedor}
        />
      )}
    </div>
  );
};

export default TelaFornecedores;
