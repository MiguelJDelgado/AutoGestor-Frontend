import { useEffect, useState } from "react";
import styled from "styled-components";
import xIcon from "../../assets/XIcon.png";
import { getProducts } from "../../services/ProdutoService"
import LayoutModal from "../Layout";
import ErrorModal from "../Erro/ErroModal";
import SuccessModal from "../Sucesso/SucessoModal";
import { createSolicitacao } from "../../services/SolicitacaoService";

const Content = styled.div`
  padding: 10px 0;
  color: #555;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
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
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const FieldQtd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 30px;
  margin-top: 16px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  height: 36px;
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
  padding: 0 10px;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 38px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 6px 10px;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100px;
  text-align: center;
  height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  margin-bottom: 15px;

  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const IconButton = styled.button`
  height: 32px;
  width: 32px;
  border-radius: 6px;
  border: 1px solid #dee3e6;
  background: #dee3e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  line-height: 0;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  min-height: 60px;
  padding: 8px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
  resize: none;
`;

const AddButton = styled.button`
  width: 100%;
  background: #00c853;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding: 6px 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #00b248;
  }
`;

const ModalNovaSolicitacao = ({ onClose, onSave }) => {
  const [produtos, setProdutos] = useState([
    { produtoNome: "", produtoId: "", quantidade: 1, observacao: "" }
  ]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getProducts();

        const produtosArray =
          Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.products)
            ? response.products
            : [];

        setListaProdutos(produtosArray);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  const adicionarProduto = () =>
    setProdutos([
      ...produtos,
      { produtoNome: "", produtoId: "", quantidade: 1, observacao: "" }
    ]);

  const removerProduto = (index) =>
    setProdutos(produtos.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    const updated = [...produtos];
    updated[index][field] = value;
    setProdutos(updated);
  };

  const handleInc = (index, val) => {
    const updated = [...produtos];
    updated[index].quantidade = Math.max(1, updated[index].quantidade + val);
    setProdutos(updated);
  };

  const handleSearch = (index, value) => {
    setFiltro(value);
    const updated = [...produtos];
    updated[index].produtoNome = value;
    setProdutos(updated);
    setShowOptions(true);
  };

  const handleSelectProduto = (index, produto) => {
    const updated = [...produtos];
    updated[index].produtoId = produto._id;
    updated[index].produtoNome = produto.name;
    updated[index].code = produto.code;
    setProdutos(updated);
    setShowOptions(false);
    setFiltro("");
  };

  const handleSave = async () => {
    try {
      const payload = {
        products: produtos.map((p) => {
          const item = {
            name: p.produtoNome,
            quantityToStock: p.quantidade,
          };

          if (p.produtoId) {
            item.productId = p.produtoId;
            item.code = p.code;
          }

          return item;
        }),
        status: "pending",
      };

      console.log("Enviando payload:", payload);

      await createSolicitacao(payload);

      setSuccessMessage("Solicitação criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar solicitação:", err);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
    <LayoutModal title="Adicionar Nova Solicitação" onClose={onClose} onSave={handleSave}>
      <Content>
        {produtos.map((produto, index) => (
          <Section key={index}>
            <RemoveButton onClick={() => removerProduto(index)}>
              <img src={xIcon} alt="Remover" />
            </RemoveButton>
            <FormGrid>
              <Field>
                <Label>Produto</Label>
                <SelectWrapper>
                  <SearchInput
                    type="text"
                    placeholder="Digite para buscar..."
                    value={produto.produtoNome}
                    onChange={(e) => handleSearch(index, e.target.value)}
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                  />
                  {showOptions && filtro.trim().length > 0 && (
                    <OptionsList>
                      {listaProdutos
                        .filter((p) =>
                          p.name?.toLowerCase().includes(filtro.toLowerCase())
                        )
                        .map((p) => (
                          <li
                            key={p.id}
                            onClick={() => handleSelectProduto(index, p)}
                          >
                            {p.name}
                          </li>
                        ))}
                    </OptionsList>
                  )}
                </SelectWrapper>
              </Field>

              <FieldQtd>
                <Label>Quantidade</Label>
                <InputWrapper>
                  <IconButton onClick={() => handleInc(index, -1)}>−</IconButton>
                  <Input readOnly value={produto.quantidade} />
                  <IconButton onClick={() => handleInc(index, 1)}>+</IconButton>
                </InputWrapper>
              </FieldQtd>
            </FormGrid>

            <Field>
              <Label>Observação</Label>
              <TextArea
                placeholder="Adicione uma observação (opcional)"
                value={produto.observacao}
                onChange={(e) =>
                  handleChange(index, "observacao", e.target.value)
                }
              />
            </Field>
          </Section>
        ))}

        <AddButton onClick={adicionarProduto}>+</AddButton>
      </Content>
    </LayoutModal>
    <ErrorModal
      message={errorMessage}
      onClose={() => setErrorMessage("")}
    />
    <SuccessModal
      message={successMessage}
      onClose={() => {
        setSuccessMessage("");
        if (onSave) onSave();
        onClose();
      }}
    />
    </>
  );
};

export default ModalNovaSolicitacao;
