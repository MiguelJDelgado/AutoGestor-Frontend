import { useEffect, useState} from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import {
  createService,
  updateService,
} from "../../services/ServicoService";
import SuccessModal from "../Sucesso/SucessoModal";
import ErrorModal from "../Erro/ErroModal";

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
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  text-align: center;

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
`;

const CriarServico = ({ mode = "create", data = null, onClose, onSave }) => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    horas: 0.5,
    valorHora: "",
    valorTotal: "",
  });

  // const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const isView = mode === "view";

  useEffect(() => {
    if (data) {
      setForm({
        titulo: data.title,
        descricao: data.description,
        horas: Number(data.workHours) || 0.5,
        valorHora: data.hourValue,
        valorTotal: data.totalValue,
      });
    }
  }, [data]);

  useEffect(() => {
    const vh = parseFloat(String(form.valorHora).replace(",", "."));
    if (!isNaN(vh)) {
      const total = vh * form.horas;
      setForm((prev) => ({
        ...prev,
        valorTotal: isFinite(total) ? total.toFixed(2) : "",
      }));
    }
  }, [form.valorHora, form.horas]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleInc = (val) => {
    if (isView) return;
    setForm((prev) => ({
      ...prev,
      horas: Math.max(0.5, prev.horas + val * 0.5),
    }));
  };

  const handleSave = async () => {
    if (isView) return;

    try {
      const payload = {
        title: form.titulo,
        description: form.descricao,
        workHours: form.horas,
        hourValue: form.valorHora,
        totalValue: form.valorTotal,
      };

      if (mode === "edit" && data?._id) {
        await updateService(data._id, payload);
        setSuccessMessage("Serviço atualizado com sucesso!");
      } else {
        await createService(payload);
        setSuccessMessage("Serviço criado com sucesso!");
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || "Erro ao salvar serviço."
      );
    }
  };


  return (
    <LayoutModal
      title={
        mode === "view"
          ? "Visualizar Serviço"
          : mode === "edit"
          ? "Editar Serviço"
          : "Adicionar Serviço"
      }
      onClose={onClose}
      onSave={isView ? null : handleSave}
      hideSaveButton={isView}
    >
      {successMessage && (
    <SuccessModal
      message={successMessage}
      onClose={() => {
        setSuccessMessage("");
        onSave();
        onClose();
      }}
    />
  )}

  {errorMessage && (
    <ErrorModal
      message={errorMessage}
      onClose={() => setErrorMessage("")}
    />
  )}

      <FormGrid>
        <Full>
          <Label>Título</Label>
          <InputTitle
            placeholder="Nome do serviço"
            value={form.titulo}
            onChange={handleChange("titulo")}
            disabled={isView}
          />
        </Full>

        <Full>
          <Label>Descrição</Label>
          <TextArea
            placeholder="Descreva o serviço"
            value={form.descricao}
            onChange={handleChange("descricao")}
            disabled={isView}
          />
        </Full>

        <div>
          <Label>Horas de Trabalho</Label>
          <InputWrapper>
            <IconButton onClick={() => handleInc(-1)} disabled={isView}>−</IconButton>
            <Input readOnly value={form.horas} />
            <IconButton onClick={() => handleInc(1)} disabled={isView}>+</IconButton>
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
              value={form.valorHora}
              onChange={handleChange("valorHora")}
              disabled={isView}
            />
          </InputWrapper>
        </div>

        <div>
          <Label>Valor Total</Label>
          <InputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <SmallInput readOnly value={form.valorTotal} />
          </InputWrapper>
        </div>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarServico;
