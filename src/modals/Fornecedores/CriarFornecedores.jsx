import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  width: 100%;
`;

const Field = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d5dde3;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ErrorMsg = styled.small`
  color: crimson;
  grid-column: 2;
`;

const CriarFornecedor = ({ onClose = () => {}, onSave = () => {} }) => {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    celular: "",
    cnpj: "",
  });
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const err = {};
    if (!form.nome || form.nome.trim().length < 2)
      err.nome = "Nome é obrigatório";
    if (!form.endereco || form.endereco.trim().length < 5)
      err.endereco = "Endereço é obrigatório";
    if (!form.celular || form.celular.trim().length < 8)
      err.celular = "Celular é obrigatório";
    if (!form.cnpj || form.cnpj.trim().length < 11)
      err.cnpj = "CNPJ é obrigatório";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <LayoutModal
      title="Adicionar Fornecedor"
      onClose={onClose}
      onSave={handleSave}
    >
      <FormGrid>
        <Field>
          <Label>Nome</Label>
          <Input
            ref={firstInputRef}
            placeholder="Nome do fornecedor"
            value={form.nome}
            onChange={handleChange("nome")}
            aria-invalid={!!errors.nome}
          />
          {errors.nome && <ErrorMsg>{errors.nome}</ErrorMsg>}
        </Field>

        <Field>
          <Label>Endereço</Label>
          <Input
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange("endereco")}
            aria-invalid={!!errors.endereco}
          />
          {errors.endereco && <ErrorMsg>{errors.endereco}</ErrorMsg>}
        </Field>

        <Field>
          <Label>Celular</Label>
          <Input
            placeholder="Telefone"
            value={form.celular}
            onChange={handleChange("celular")}
            aria-invalid={!!errors.celular}
          />
          {errors.celular && <ErrorMsg>{errors.celular}</ErrorMsg>}
        </Field>

        <Field>
          <Label>CNPJ</Label>
          <Input
            placeholder="CNPJ"
            value={form.cnpj}
            onChange={handleChange("cnpj")}
            aria-invalid={!!errors.cnpj}
          />
          {errors.cnpj && <ErrorMsg>{errors.cnpj}</ErrorMsg>}
        </Field>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarFornecedor;
