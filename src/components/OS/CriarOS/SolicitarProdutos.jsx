import { useState, useEffect } from "react";
import styled from "styled-components";

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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #0f2f43;
  font-size: 13px;
  margin-bottom: 4px;
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

export default function SolicitarProdutoModal({ onClose, onAdd }) {
  const [produto, setProduto] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const buscarProdutos = async () => {
      if (produto.trim().length < 2) return;
      try {
        const response = await fetch(`/api/produtos?nome=${encodeURIComponent(produto)}`);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    const delay = setTimeout(buscarProdutos, 300);
    return () => clearTimeout(delay);
  }, [produto]);

  const handleAdd = () => {
    if (!produto) return alert("Selecione um produto válido!");
    onAdd({ produto, quantidade });
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>Solicitar Produto</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Field>
          <Label>Produto</Label>
          <Input
            list="lista-produtos"
            placeholder="Digite para buscar..."
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />
          <datalist id="lista-produtos">
            {produtos.map((p) => (
              <option key={p.id} value={p.nome} />
            ))}
          </datalist>
        </Field>

        <Field>
          <Label>Quantidade O.S</Label>
          <QuantityContainer>
            <QuantityButton onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>−</QuantityButton>
            <QuantityDisplay>{quantidade}</QuantityDisplay>
            <QuantityButton onClick={() => setQuantidade((q) => q + 1)}>+</QuantityButton>
          </QuantityContainer>
        </Field>

        <Footer>
          <Button variant="cancel" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleAdd}>Adicionar</Button>
        </Footer>
      </Modal>
    </Overlay>
  );
}
