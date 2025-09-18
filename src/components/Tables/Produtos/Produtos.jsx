import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getProducts } from "../../../services/ProdutoService";
import CriarProduto from "../../../modals/Produtos/CriarProdutos";

const TelaProdutos = () => {
  const columns = ["Código", "Data", "Nome", "Estoque Disponível", "Valor Unit. Venda", "Valor Unit. Pago"];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ page: 1, limit: 10 });

        const productsArray = response.data || [];

        const formattedData = productsArray.map((p) => ({
          "Código": p.code,
          "Data": new Date(p.createdAt).toLocaleDateString("pt-BR"),
          "Nome": p.name,
          "Estoque Disponível": `${p.quantity} UNIDADES`,
          "Valor Unit. Venda": p.salePrice ? `R$ ${p.salePrice.toFixed(2)}` : "-",
          "Valor Unit. Pago": `R$ ${p.costUnitPrice.toFixed(2)}`,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);

  const handleSaveProduct = (produto) => {
    console.log("Novo produto salvo:", produto);
    // Aqui você pode chamar o createProduct do service
  };

  return (
    <div>
      <Header
        title="Produtos"
        onNew={() => setIsModalOpen(true)}
      >
        + Novo Produto
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
        <CriarProduto
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default TelaProdutos;
