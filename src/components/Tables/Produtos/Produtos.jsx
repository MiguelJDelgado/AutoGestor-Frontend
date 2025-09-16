import { useEffect, useState } from "react";
import Table from "../Table";
import Header from "../../Header/Header";
import { getProducts } from "../../../services/ProdutoService";

const TelaProdutos = () => {
  const columns = ["Código", "Data", "Nome", "Estoque Disponível", "Valor Unit. Venda", "Valor Unit. Pago"];
  const [data, setData] = useState([]);

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

  return (
    <div>
      <Header title="Produtos" children="+ Novo Produto" />
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

export default TelaProdutos;
