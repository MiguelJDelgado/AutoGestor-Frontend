import { useEffect, useState } from "react";
import styled from "styled-components";
import SolicitarProdutoModal from "./SolicitarProdutos";
import ProdutoIcon from "./icons/ProdutoOS.png";
import xIcon from '../../../assets/XIcon.png';
import { getProducts } from "../../../services/ProdutoService";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  width: 100%;
  overflow-x: auto; /* evita que o conteúdo vaze */
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 23px;
  height: 25px;
  vertical-align: middle;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #2b3e50;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequestButton = styled.button`
  background: #1e862cff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  padding: 6px 12px;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background: #46e08c;
  }
`;

const FormWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  background: #fafafa;
  overflow-x: auto;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 3px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
  gap: 12px;
  min-width: 600px; /* garante scroll horizontal se faltar espaço */

  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? "#e9ecef" : "#f3f6f9")};
  font-size: 14px;
  color: #333;
`;

const Select = styled.select`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

const AddButton = styled.button`
  width: 100%;
  background: #00c853;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 6px 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #00b248;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  color: #0f2f43;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f3f6f9;
  }
`;

function ProdutosSection({ products, setProducts }) {
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [buscas, setBuscas] = useState([""]); // 🔹 inicia com 1 busca vazia
  const [dropdownAtivo, setDropdownAtivo] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  // 🔹 Adiciona 1 produto vazio SOMENTE na primeira renderização
  useEffect(() => {
    if (!products || products.length === 0) {
      setProducts([{}]);
      setBuscas([""]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- apenas na montagem

  // Buscar produtos
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await getProducts();
        setTodosProdutos(res?.data || []);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setTodosProdutos([]);
      }
    };
    fetchProdutos();
  }, []);

  const adicionarProduto = () => {
    setProducts([...products, {}]);
    setBuscas([...buscas, ""]);
  };

  const removerProduto = (index) => {
    const novosProdutos = products.filter((_, i) => i !== index);
    const novasBuscas = buscas.filter((_, i) => i !== index);
    setProducts(novosProdutos);
    setBuscas(novasBuscas);
  };

  const handleBuscaChange = (index, termo) => {
    const novasBuscas = [...buscas];
    novasBuscas[index] = termo;
    setBuscas(novasBuscas);
    setDropdownAtivo(index);

    const novosProdutos = [...products];
    novosProdutos[index] = {};
    setProducts(novosProdutos);
  };

  const handleSelectProduto = (index, produto) => {
    const novosProdutos = [...products];
    novosProdutos[index] = {
      productId: produto._id,
      code: produto.code,
      name: produto.name,
      quantity: 1,
      costUnitPrice: produto.costUnitPrice || 0,
      salePrice: produto.salePrice || 0,
      grossProfitMargin: produto.grossProfitMargin ?? 0,
      providerIds: produto.providerIds || [],
      unitMeasure: produto.unitMeasure || "",
      stock: produto.quantity ?? 0,
      total: (produto.salePrice || 0) * 1,
    };
    setProducts(novosProdutos);

    const novasBuscas = [...buscas];
    novasBuscas[index] = produto.name;
    setBuscas(novasBuscas);
    setDropdownAtivo(null);
  };

  const handleQuantidadeChange = (index, quantidade) => {
    const novosProdutos = [...products];
    const p = novosProdutos[index] || {};
    p.quantity = quantidade;
    p.total = (p.salePrice || 0) * (quantidade || 0);
    novosProdutos[index] = p;
    setProducts(novosProdutos);
  };

  const produtosFiltrados = (termo) => {
    if (!termo) return [];
    const lower = termo.toLowerCase();
    return todosProdutos.filter((p) => p.name?.toLowerCase().includes(lower));
  };

  return (
    <Section>
      <SectionHeader>
        <Icon src={ProdutoIcon} alt="Produto" />
        Produtos
      </SectionHeader>

      <RequestButton onClick={() => setModalAberto(true)}>
        + Solicitar Produto
      </RequestButton>

      {modalAberto && (
        <SolicitarProdutoModal
          onClose={() => setModalAberto(false)}
          onAdd={(novoProduto) => setProducts([...products, novoProduto])}
        />
      )}

      {products.map((produto, index) => (
          <FormWrapper key={index}>
            <RemoveButton onClick={() => removerProduto(index)}>
              <img src={xIcon} alt="Remover" />
            </RemoveButton>

            <FormGrid>
              <Field style={{ position: "relative" }}>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  placeholder="Digite para buscar..."
                  value={buscas[index] || produto.name || ""}
                  onChange={(e) => handleBuscaChange(index, e.target.value)}
                  onFocus={() => setDropdownAtivo(index)}
                  autoComplete="off"
                />

                {dropdownAtivo === index &&
                  buscas[index] &&
                  produtosFiltrados(buscas[index]).length > 0 && (
                    <Dropdown style={{ zIndex: 50 }}>
                      {produtosFiltrados(buscas[index])
                        .slice(0, 8)
                        .map((p) => (
                          <DropdownItem
                            key={p._id}
                            onClick={() => handleSelectProduto(index, p)}
                          >
                            {p.name}
                          </DropdownItem>
                        ))}
                    </Dropdown>
                  )}
              </Field>

              <Field>
                <Label>UN</Label>
                <Input
                  disabled
                  value={produto.unitMeasure || ""}
                  placeholder="Puxado da área de produtos"
                />
              </Field>

              <Field>
                <Label>Estoque</Label>
                <Input
                  disabled
                  value={produto.stock ?? produto.quantity ?? ""}
                  placeholder="Puxado da área de produtos"
                />
              </Field>

              <Field>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min="1"
                  value={produto.quantity || ""}
                  onChange={(e) =>
                    handleQuantidadeChange(index, Number(e.target.value))
                  }
                  placeholder="Editável"
                />
              </Field>

              <Field>
                <Label>Valor unitário</Label>
                <Input
                  disabled
                  value={
                    produto.salePrice !== undefined && produto.salePrice !== null
                      ? `R$ ${Number(produto.salePrice).toFixed(2)}`
                      : ""
                  }
                  placeholder="Puxado da área de produtos"
                />
              </Field>

              <Field>
                <Label>Valor total</Label>
                <Input
                  disabled
                  value={
                    produto.total !== undefined && produto.total !== null
                      ? `R$ ${Number(produto.total).toFixed(2)}`
                      : ""
                  }
                  placeholder="Cálculo final"
                />
              </Field>
            </FormGrid>
          </FormWrapper>
        ))
      }

      <AddButton onClick={adicionarProduto}>+</AddButton>
    </Section>
  );
}

export default ProdutosSection;