import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  max-width: 600px;
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  width: 120px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ErrorMsg = styled.small`
  color: crimson;
  margin-top: 4px;
`;

const CriarMecanico = ({ onClose = () => {}, onSave = () => {} }) => {
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    experiencia: "",
    telefone: "",
    email: "",
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
    if (!form.especialidade.trim()) err.especialidade = "Especialidade é obrigatória";
    if (!form.experiencia.trim()) err.experiencia = "Experiência é obrigatória";
    if (!form.telefone.trim()) err.telefone = "Telefone é obrigatório";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "E-mail válido é obrigatório";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <LayoutModal title="Adicionar Mecânico" onClose={onClose} onSave={handleSave}>
      <FormGrid>
        <Field>
          <Label>Nome</Label>
          <Input
            ref={firstInputRef}
            placeholder="Nome do mecânico"
            value={form.nome}
            onChange={handleChange("nome")}
            aria-invalid={!!errors.nome}
          />
          {errors.nome && <ErrorMsg>{errors.nome}</ErrorMsg>}
        </Field>

        <Field>
          <Label>Especialidade</Label>
          <Input
            placeholder="Ex: Suspensão, Freios, Motor..."
            value={form.especialidade}
            onChange={handleChange("especialidade")}
            aria-invalid={!!errors.especialidade}
          />
          {errors.especialidade && <ErrorMsg>{errors.especialidade}</ErrorMsg>}
        </Field>

        <Field>
          <Label>Experiência</Label>
          <Input
            placeholder="Ex: 5 anos"
            value={form.experiencia}
            onChange={handleChange("experiencia")}
            aria-invalid={!!errors.experiencia}
          />
          {errors.experiencia && <ErrorMsg>{errors.experiencia}</ErrorMsg>}
        </Field>

        <Field>
          <Label>Telefone</Label>
          <Input
            placeholder="Ex: (11) 99999-9999"
            value={form.telefone}
            onChange={handleChange("telefone")}
            aria-invalid={!!errors.telefone}
          />
          {errors.telefone && <ErrorMsg>{errors.telefone}</ErrorMsg>}
        </Field>

        <Field>
          <Label>E-mail</Label>
          <Input
            placeholder="E-mail profissional"
            value={form.email}
            onChange={handleChange("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </Field>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarMecanico;
