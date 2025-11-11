import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getProducts } from "../../../services/ProdutoService";
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

  // 🔹 Opções de pesquisa com mapeamento correto dos campos do backend
  const searchOptions = [
    { label: "Código", value: "code" },
    { label: "Nome", value: "name" },
    { label: "Unidade de Medida", value: "unitMeasure" },
    { label: "Estoque Disponível", value: "quantity" },
  ];

  // 🔹 Função para formatar produtos retornados
  const formatProducts = (productsArray) =>
    productsArray.map((p) => ({
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

  // 🔹 Função que busca produtos (usada tanto no carregamento quanto na pesquisa)
  const fetchProducts = async (filters = {}) => {
    try {
      const response = await getProducts({
        page: 1,
        limit: 10,
        ...filters, // se tiver identifier e search, eles vão aqui
      });

      const productsArray = response.data || [];
      setData(formatProducts(productsArray));
    } catch (error) {
      console.error("Erro ao carregar produtos:", error.message);
    }
  };

  // 🔹 Carrega todos os produtos ao iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Pesquisa: envia campos `identifier` e `search` para o backend
  const handleSearch = async ({ identifier, search }) => {
    if (!identifier || !search) {
      await fetchProducts(); // se limpar os filtros, volta a exibir tudo
      return;
    }
    await fetchProducts({ identifier, search });
  };

  // 🔹 Ações básicas
  const handleView = (row) => console.log("Visualizar", row);
  const handleEdit = (row) => console.log("Editar", row);
  const handleDelete = (row) => console.log("Excluir", row);
  const handleSaveProduct = (produto) => {
    console.log("Novo produto salvo:", produto);
    fetchProducts(); // atualiza tabela após salvar novo produto
  };

  return (
    <div>
      <Header title="Produtos" onNew={() => setIsModalOpen(true)}>
        + Novo Produto
      </Header>

      <Table
        columns={columns}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch} // 🔹 mesma estrutura de pesquisa
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
