import { useState } from "react";
import styled from "styled-components";
import xIcon from '../../../assets/XIcon.png';

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
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

const FormWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
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



const RequestButton = styled.button`
  background: #52ffa0ff;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
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
  background: #f3f6f9;
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

function ProdutosSection() {
  const [produtos, setProdutos] = useState([{}]);

  const adicionarProduto = () => setProdutos([...produtos, {}]);
  const removerProduto = (index) =>
    setProdutos(produtos.filter((_, i) => i !== index));

  return (
    <Section>
      <SectionHeader>📦 Produtos</SectionHeader>
      <RequestButton>+ Solicitar Produto</RequestButton>

      {produtos.map((_, index) => (
        <FormWrapper key={index}>
          <RemoveButton onClick={() => removerProduto(index)}>
            <img src={xIcon} alt="Remover" />
          </RemoveButton>

          <FormGrid>
            <Field>
              <Label>Descrição</Label>
              <Select>
                <option>Lista de produtos cadastrados</option>
              </Select>
            </Field>
            <Field>
              <Label>UN</Label>
              <Input disabled placeholder="Puxado da área de produtos" />
            </Field>
            <Field>
              <Label>Estoque</Label>
              <Input disabled placeholder="Puxado da área de produtos" />
            </Field>
            <Field>
              <Label>Quantidade</Label>
              <Input placeholder="Editável" />
            </Field>
            <Field>
              <Label>Valor unitário</Label>
              <Input disabled placeholder="Puxado da área de produtos" />
            </Field>
            <Field>
              <Label>Tipo de Desconto</Label>
              <Select>
                <option>Desconto %</option>
                <option>Desconto R$</option>
              </Select>
            </Field>
            <Field>
              <Label>Desconto</Label>
              <Input placeholder="Editável" />
            </Field>
            <Field>
              <Label>Subtotal sem desconto</Label>
              <Input disabled placeholder="unitário x quantidade" />
            </Field>
            <Field>
              <Label>Valor total</Label>
              <Input disabled placeholder="cálculo final" />
            </Field>
          </FormGrid>
        </FormWrapper>
      ))}
      <AddButton onClick={adicionarProduto}>+</AddButton>
    </Section>
  );
}

export default ProdutosSection;
