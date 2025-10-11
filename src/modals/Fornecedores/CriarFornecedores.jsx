import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d5dde3;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const BigInput = styled.input`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d5dde3;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const FullWidth = styled.div`
  grid-column: span 4;
`;

const HalfWidth = styled.div`
  grid-column: span 2;
`;

const ThirdWidth = styled.div`
  grid-column: span 1;
`;

const CriarFornecedor = ({ onClose = () => {}, onSave = () => {} }) => {
  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    inscricaoEstadual: "",
    cep: "",
    endereco: "",
    numero: "",
    municipio: "",
    uf: "",
    email: "",
    telefone: "",
    anotacao: "",
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <LayoutModal
      title="Adicionar Novo Fornecedor"
      onClose={onClose}
      onSave={handleSave}
    >
      <FormGrid>
        <HalfWidth>
          <Label>Nome/Razão Social</Label>
          <Input
            ref={firstInputRef}
            value={form.nome}
            onChange={handleChange("nome")}
          />
        </HalfWidth>

        <HalfWidth>
          <Label>CPF/CNPJ</Label>
          <Input value={form.cpfCnpj} onChange={handleChange("cpfCnpj")} />
        </HalfWidth>

        <FullWidth>
          <Label>Inscrição Estadual</Label>
          <Input
            value={form.inscricaoEstadual}
            onChange={handleChange("inscricaoEstadual")}
          />
        </FullWidth>

        <ThirdWidth>
          <Label>CEP</Label>
          <Input value={form.cep} onChange={handleChange("cep")} />
        </ThirdWidth>

        <HalfWidth>
          <Label>Endereço</Label>
          <Input value={form.endereco} onChange={handleChange("endereco")} />
        </HalfWidth>

        <ThirdWidth>
          <Label>Número</Label>
          <Input value={form.numero} onChange={handleChange("numero")} />
        </ThirdWidth>

        <ThirdWidth>
          <Label>Município</Label>
          <Input value={form.municipio} onChange={handleChange("municipio")} />
        </ThirdWidth>

        <ThirdWidth>
          <Label>UF</Label>
          <Input value={form.uf} onChange={handleChange("uf")} />
        </ThirdWidth>

        <HalfWidth>
          <Label>Email</Label>
          <Input value={form.email} onChange={handleChange("email")} />
        </HalfWidth>

        <HalfWidth>
          <Label>Telefone</Label>
          <Input value={form.telefone} onChange={handleChange("telefone")} />
        </HalfWidth>

        <FullWidth>
          <Label>Anotação</Label>
          <BigInput
            value={form.anotacao}
            onChange={handleChange("anotacao")}
          />
        </FullWidth>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarFornecedor;
