import { useState, useEffect, useRef } from "react";
import React from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Select = styled.select`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
`;

const ButtonAdd = styled.button`
  background: #00c853;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #00b248;
  }
`;

const ChipsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background: #f3f6f9;
  padding: 10px;
  border-radius: 4px;
`;

const Chip = styled.span`
  background: #dbeafe;
  color: #1e40af;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveChip = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #dc2626;
  font-weight: bold;
`;

const ColaboradoresModal = ({ onClose = () => {}, onSave = () => {}, colaboradoresIniciais = [] }) => {
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState("");
  const selectRef = useRef(null);

  const colaboradoresDisponiveis = ["Talisson", "Maicol", "Furilo", "Marcos", "Amanda"];

  useEffect(() => {
    selectRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const adicionarColaborador = () => {
    if (colaboradorSelecionado && !colaboradores.includes(colaboradorSelecionado)) {
      setColaboradores((prev) => [...prev, colaboradorSelecionado]);
      setColaboradorSelecionado("");
    }
  };

  const removerColaborador = (nome) => {
    setColaboradores((prev) => prev.filter((c) => c !== nome));
  };

  const handleSave = () => {
    onSave(colaboradores);
    onClose();
  };

  return (
    <LayoutModal title="Mecânicos" onClose={onClose} onSave={handleSave}>
      <FormGrid>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Select
            ref={selectRef}
            value={colaboradorSelecionado}
            onChange={(e) => setColaboradorSelecionado(e.target.value)}
          >
            <option value="">Selecione um mecânico</option>
            {colaboradoresDisponiveis.map((colab) => (
              <option key={colab} value={colab}>
                {colab}
              </option>
            ))}
          </Select>
          <ButtonAdd type="button" onClick={adicionarColaborador}>Adicionar</ButtonAdd>
        </div>

        <label>Mecânicos adicionados anteriormente:</label>
        <ChipsArea>
          {colaboradores.map((colab, i) => (
            <Chip key={i}>
              {colab}
              <RemoveChip type="button" onClick={() => removerColaborador(colab)}>×</RemoveChip>
            </Chip>
          ))}
        </ChipsArea>
      </FormGrid>
    </LayoutModal>
  );
};

export default ColaboradoresModal;
