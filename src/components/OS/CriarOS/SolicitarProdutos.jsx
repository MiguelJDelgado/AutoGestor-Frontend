import { useState } from "react";
import styled from "styled-components";
import xIcon from "../../../assets/XIcon.png";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 520px;
  max-width: 95%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 18px 22px;
  max-height: 80vh;
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


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const ProductBlock = styled.div`
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: #fff;
  padding: 16px;
  margin-bottom: 20px;
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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #0f2f43;
  font-size: 13px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  height: 34px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background: #f3f6f9;
  font-size: 14px;
  color: #0f2f43;
  padding: 0 8px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: #dcdfe6;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  &:hover {
    background: #c2c7cc;
  }
`;

const QuantityDisplay = styled.div`
  width: 50px;
  height: 34px;
  background: #f3f6f9;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-align: center;
  font-size: 15px;
  line-height: 34px;
  color: #0f2f43;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 14px;
  ${({ variant }) =>
    variant === "cancel"
      ? `
        background: #e0e0e0;
        color: #333;
        &:hover { background: #c9c9c9; }
      `
      : `
        background: #00c853;
        color: #fff;
        &:hover { background: #00b248; }
      `}
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
  margin-top: 8px;

  &:hover {
    background: #00b248;
  }
`;

export default function SolicitarProdutoModal({ onClose, onAdd }) {
  const [produtos, setProdutos] = useState([
    { produto: "", lista: [], quantidade: 1 },
  ]);

  const buscarProdutos = async (texto, index) => {
    if (texto.trim().length < 2) return;
    try {
      const response = await fetch(`/api/produtos?nome=${encodeURIComponent(texto)}`);
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const data = await response.json();
      setProdutos((prev) =>
        prev.map((p, i) => (i === index ? { ...p, lista: data } : p))
      );
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleChangeProduto = (value, index) => {
    setProdutos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, produto: value } : p))
    );
    buscarProdutos(value, index);
  };

  const handleQuantidade = (index, op) => {
    setProdutos((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, quantidade: Math.max(1, p.quantidade + op) } : p
      )
    );
  };

  const adicionarProduto = () => {
    setProdutos((prev) => [...prev, { produto: "", lista: [], quantidade: 1 }]);
  };

  const removerProduto = (index) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (produtos.some((p) => !p.produto))
      return alert("Preencha todos os produtos!");
    onAdd(produtos);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>Solicitar Produto</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        {produtos.map((p, index) => (
          <ProductBlock key={index}>
            {produtos.length > 0 && (
              <RemoveButton
                onClick={() => removerProduto(index)}
                aria-label={`Remover produto ${index + 1}`}
                title="Remover"
              >
                <img src={xIcon} alt="Remover" />
              </RemoveButton>
            )}

            <Field>
              <Label>Produto {index + 1}</Label>
              <Input
                list={`lista-produtos-${index}`}
                placeholder="Digite para buscar..."
                value={p.produto}
                onChange={(e) => handleChangeProduto(e.target.value, index)}
              />
              <datalist id={`lista-produtos-${index}`}>
                {p.lista.map((item) => (
                  <option key={item.id} value={item.nome} />
                ))}
              </datalist>
            </Field>

            <Field>
              <Label>Quantidade O.S</Label>
              <QuantityContainer>
                <QuantityButton onClick={() => handleQuantidade(index, -1)}>−</QuantityButton>
                <QuantityDisplay>{p.quantidade}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantidade(index, 1)}>+</QuantityButton>
              </QuantityContainer>
            </Field>
          </ProductBlock>
        ))}

        <AddButton onClick={adicionarProduto}>+</AddButton>

        <Footer>
          <Button variant="cancel" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAdd}>Adicionar</Button>
        </Footer>
      </Modal>
    </Overlay>
  );
}
