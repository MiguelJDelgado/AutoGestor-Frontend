import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import {
  getProducts,
  deleteProduct,
} from "../../../services/ProdutoService";
import CriarProduto from "../../../modals/Produtos/CriarProdutos";
import ModalConfirmacao from "../../../modals/Confirmacao/ConfirmacaoModal";
import ModalSucesso from "../../../modals/Sucesso/SucessoModal"
import ModalErro from "../../../modals/Erro/ErroModal";

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

  const [confirmData, setConfirmData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleDelete = (row) => {
    setConfirmData(row);
  };

  const confirmDeleteAction = async () => {
    if (!confirmData) return;

    const id = confirmData.raw?._id;

    try {
      await deleteProduct(id);

      setData((prev) => prev.filter((item) => item.raw._id !== id));

      setSuccessMessage("Produto excluído com sucesso!");

    } catch (error) {
      console.error("Erro ao excluir produto:", error);

      const extracted =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao excluir produto.";

      setErrorMessage(extracted);
    } finally {
      setConfirmData(null);
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
        }}
      >
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

      {/* 🟦 Modal de Confirmação */}
      {confirmData && (
        <ModalConfirmacao
          title="Excluir Produto"
          message={`Tem certeza que deseja excluir o produto ${confirmData["Nome"]}?`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmData(null)}
        />
      )}

      {/* 🟩 Modal de Sucesso */}
      {successMessage && (
        <ModalSucesso
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {/* 🟥 Modal de Erro */}
      {errorMessage && (
        <ModalErro
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default TelaProdutos;
