import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 150px;
  align-items: center;
`;

const Full = styled.div`
  grid-column: span 2;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputTitle = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
  margin-left: 25px;
`

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 50px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  width: 400px;
  min-height: 80px;
  resize: none;
`;

const SmallInput = styled(Input)`
  max-width: 100px;
`;

const CurrencyPrefix = styled.span`
  background: #f1f5f7;
  border: 1px solid #d5dde3;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
`;

const IconButton = styled.button`
  height: 36px;
  width: 36px;
  border-radius: 6px;
  border: 1px solid #dee3e6;
  background: #dee3e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
`;

const CriarServico = ({ onClose = () => {}, onSave = () => {} }) => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    horas: 0.5,
    valorHora: "",
    valorTotal: "",
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

  useEffect(() => {
    const vh = parseFloat(String(form.valorHora).replace(",", "."));
    if (!isNaN(vh)) {
      const total = vh * form.horas;
      setForm((prev) => ({
        ...prev,
        valorTotal: isFinite(total) ? total.toFixed(2) : "",
      }));
    } else {
      setForm((prev) => ({ ...prev, valorTotal: "" }));
    }
  }, [form.valorHora, form.horas]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleInc = (val) => {
    setForm((prev) => {
      const newHoras = Math.max(0.5, prev.horas + val * 0.5);
      return { ...prev, horas: newHoras };
    });
  };

  const formatHoras = () => {
    const horas = form.horas;
    if (horas < 1) return `${horas * 60} min`;
    if (horas % 1 === 0) return `${horas} h`;
    return `${Math.floor(horas)}h ${Math.round((horas % 1) * 60)}min`;
  };

  const validate = () => {
    const err = {};
    if (!form.titulo || form.titulo.trim().length < 2)
      err.titulo = "Título é obrigatório";
    if (!form.descricao || form.descricao.trim().length < 5)
      err.descricao = "Descrição é obrigatória";
    if (
      form.valorHora === "" ||
      isNaN(parseFloat(String(form.valorHora).replace(",", ".")))
    )
      err.valorHora = "Informe um valor válido";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <LayoutModal title="Adicionar Serviço" onClose={onClose} onSave={handleSave}>
      <FormGrid>
        <Full>
          <Label>Título</Label>
          <InputTitle
            ref={firstInputRef}
            placeholder="Nome do serviço"
            value={form.titulo}
            onChange={handleChange("titulo")}
            aria-invalid={!!errors.titulo}
          />
          {errors.titulo && (
            <small style={{ color: "crimson" }}>{errors.titulo}</small>
          )}
        </Full>

        <Full>
          <Label>Descrição</Label>
          <TextArea
            placeholder="Descreva o serviço"
            value={form.descricao}
            onChange={handleChange("descricao")}
            aria-invalid={!!errors.descricao}
          />
          {errors.descricao && (
            <small style={{ color: "crimson" }}>{errors.descricao}</small>
          )}
        </Full>

        <div>
          <Label>Horas de Trabalho</Label>
          <InputWrapper>
            <IconButton onClick={() => handleInc(-1)} aria-label="Diminuir horas">
              −
            </IconButton>
            <Input
              readOnly
              value={formatHoras()}
              style={{ textAlign: "center", width: 120 }}
            />
            <IconButton onClick={() => handleInc(1)} aria-label="Aumentar horas">
              +
            </IconButton>
          </InputWrapper>
        </div>

        <div>
          <Label>Valor Hora</Label>
          <InputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <SmallInput
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.valorHora}
              onChange={handleChange("valorHora")}
              aria-invalid={!!errors.valorHora}
            />
          </InputWrapper>
          {errors.valorHora && (
            <small style={{ color: "crimson" }}>{errors.valorHora}</small>
          )}
        </div>

        <div>
          <Label>Valor Total</Label>
          <InputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <SmallInput readOnly value={form.valorTotal} placeholder="—" />
          </InputWrapper>
        </div>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarServico;
