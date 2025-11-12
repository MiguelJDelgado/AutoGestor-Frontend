/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import { updateVehicle } from "../../services/VeiculoService";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 40px;
  align-items: center;
  justify-items: center;
  margin-right: 12px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #00273d;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
`;

const Input = styled.input`
  width: 85%;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  text-align: center;
  font-size: 14px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  &:disabled {
    background: #f4f4f4;
    color: #777;
  }
`;

const AcoesVeiculos = ({ onClose = () => {}, onSave = () => {}, veiculo = {}, modo = "visualizar" }) => {
  const [form, setForm] = useState({
    Marca: "",
    Modelo: "",
    Placa: "",
    Ano: "",
    "Tipo de Combustível": "",
    Chassi: "",
    Km: "",
  });

  const firstInputRef = useRef(null);
  const isViewMode = modo === "visualizar";

  useEffect(() => {
    firstInputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (veiculo) {
      setForm({
        Marca: veiculo.brand || "",
        Modelo: veiculo.name || "",
        Placa: veiculo.licensePlate || "",
        Ano: veiculo.year || "",
        "Tipo de Combustível": veiculo.fuel || "",
        Chassi: veiculo.chassi || "",
        Km: veiculo.km || "",
      });
    }
  }, [veiculo]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updatedVehicle = { ...veiculo, km: form.Km };
      const response = await updateVehicle(veiculo.id, { km: form.Km });
      onSave(updatedVehicle);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Erro ao salvar veículo.");
    }
  };

  return (
    <LayoutModal
      title={isViewMode ? "Detalhes do Veículo" : "Editar Veículo"}
      onClose={onClose}
      onSave={!isViewMode ? handleSave : undefined}
      hideSaveButton={isViewMode}
    >
      <FormGrid>
        {Object.keys(form).map((key, i) => (
          <Field key={i}>
            <Label>{key}</Label>
            <Input
              ref={i === 0 ? firstInputRef : null}
              value={form[key]}
              onChange={handleChange(key)}
              disabled={isViewMode || key !== "Km"}
            />
          </Field>
        ))}
      </FormGrid>
    </LayoutModal>
  );
};

export default AcoesVeiculos;
