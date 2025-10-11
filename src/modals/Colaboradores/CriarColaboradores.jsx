import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  max-width: 800px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 160px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  background: #e9edf0;
  width: 90%;

  &:focus {
    outline: none;
    border-color: #999;
    background: #fff;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 40px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  background: #e9edf0;
  width: 100%;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #999;
    background: #fff;
  }
`;

const ErrorMsg = styled.small`
  color: crimson;
  margin-top: 4px;
`;

const CriarColaborador = ({ onClose = () => {}, onSave = () => {} }) => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    cep: "",
    endereco: "",
    numero: "",
    municipio: "",
    uf: "",
    email: "",
    telefone: "",
    anotacao: "",
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

    if (!form.nome.trim()) err.nome = "Nome é obrigatório";
    if (!form.cpf.trim()) err.cpf = "CPF é obrigatório";
    if (!form.cargo.trim()) err.cargo = "Cargo é obrigatório";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "E-mail válido é obrigatório";
    if (!form.telefone.trim()) err.telefone = "Telefone é obrigatório";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <LayoutModal title="Adicionar Novo Colaborador" onClose={onClose} onSave={handleSave}>
      <FormGrid>
        <Row>
          <Field>
            <Label>Nome</Label>
            <Input
              ref={firstInputRef}
              value={form.nome}
              onChange={handleChange("nome")}
              placeholder="Nome completo"
            />
            {errors.nome && <ErrorMsg>{errors.nome}</ErrorMsg>}
          </Field>
          <Field>
            <Label>CPF</Label>
            <Input
              value={form.cpf}
              onChange={handleChange("cpf")}
              placeholder="000.000.000-00"
            />
            {errors.cpf && <ErrorMsg>{errors.cpf}</ErrorMsg>}
          </Field>
          <Field>
            <Label>Cargo</Label>
            <Input
              value={form.cargo}
              onChange={handleChange("cargo")}
              placeholder="Cargo do colaborador"
            />
            {errors.cargo && <ErrorMsg>{errors.cargo}</ErrorMsg>}
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>CEP</Label>
            <Input
              value={form.cep}
              onChange={handleChange("cep")}
              placeholder="00000-000"
            />
          </Field>
          <Field style={{ flex: 2 }}>
            <Label>Endereço</Label>
            <Input
              value={form.endereco}
              onChange={handleChange("endereco")}
              placeholder="Rua, Avenida..."
            />
          </Field>
          <Field style={{ maxWidth: "120px" }}>
            <Label>Número</Label>
            <Input
              value={form.numero}
              onChange={handleChange("numero")}
              placeholder="Nº"
            />
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>Município</Label>
            <Input
              value={form.municipio}
              onChange={handleChange("municipio")}
              placeholder="Cidade"
            />
          </Field>
          <Field style={{ maxWidth: "100px" }}>
            <Label>UF</Label>
            <Input
              value={form.uf}
              onChange={handleChange("uf")}
              placeholder="SP"
              maxLength={2}
            />
          </Field>
          <Field>
            <Label>Telefone</Label>
            <Input
              value={form.telefone}
              onChange={handleChange("telefone")}
              placeholder="(11) 99999-9999"
            />
            {errors.telefone && <ErrorMsg>{errors.telefone}</ErrorMsg>}
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={handleChange("email")}
              placeholder="email@empresa.com"
            />
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          </Field>
        </Row>

        <Field>
          <Label>Anotação</Label>
          <TextArea
            value={form.anotacao}
            onChange={handleChange("anotacao")}
            placeholder="Observações adicionais..."
          />
        </Field>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarColaborador;
