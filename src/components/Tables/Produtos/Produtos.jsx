import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import {
  getProducts,
  deleteProduct,
} from "../../../services/ProdutoService";
import CriarProduto from "../../../modals/Produtos/CriarProdutos";

const TelaProdutos = () => {
  const columns = [
    "Código",
    "Data",
    "Nome",
    "Estoque Disponível",
    "Valor Unit. Venda",
    "Valor Unit. Pago",
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const searchOptions = [
    { label: "Código", value: "code" },
    { label: "Nome", value: "name" },
    { label: "Unidade de Medida", value: "unitMeasure" },
    { label: "Estoque Disponível", value: "quantity" },
  ];

  const formatProducts = (productsArray) =>
    productsArray.map((p) => ({
      id: p._id, 
      raw: p,
      "Código": p.code ?? "-",
      "Data": p.createdAt
        ? new Date(p.createdAt).toLocaleDateString("pt-BR")
        : "-",
      "Nome": p.name ?? "-",
      "Estoque Disponível": `${p.quantity ?? 0} UNIDADES`,
      "Valor Unit. Venda": p.salePrice
        ? `R$ ${p.salePrice.toFixed(2)}`
        : "-",
      "Valor Unit. Pago": p.costUnitPrice
        ? `R$ ${p.costUnitPrice.toFixed(2)}`
        : "-",
    }));

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await getProducts({
        page: 1,
        limit: 10,
        ...filters,
      });

      const productsArray = response.data || [];
      setData(formatProducts(productsArray));
    } catch {
      console.error("Erro ao carregar produtos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchProducts();
      return;
    }
    await fetchProducts({ identifier, search });
  };

  const handleView = async (row) => {
    const product = row.raw;
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = async (row) => {
    const product = row.raw;
    setSelectedProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Deseja excluir este produto?")) return;

    try {
      await deleteProduct(row.raw._id);
      fetchProducts();
    } catch {
      alert("Erro ao excluir produto.");
    }
  };

  const handleSaveProduct = () => {
    fetchProducts();
  };

  return (
    <div>
      <Header title="Produtos" onNew={() => {
        setModalMode("create");
        setSelectedProduct(null);
        setIsModalOpen(true);
      }}>
        + Novo Produto
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CriarProduto
          mode={modalMode}
          data={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default TelaProdutos;
