import { useState, useEffect, useRef } from "react";
import React from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import { getAllMechanics } from "../../services/MecanicoService";

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

export const InputSearch = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: calc(100% - 90px);
  max-height: 160px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const ColaboradoresModal = ({ onClose = () => {}, onSave = () => {}, colaboradoresIniciais = [] }) => {
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState("");
  const selectRef = useRef(null);

  const [mechanics, setMechanics] = useState([]);
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const dropdownRef = useRef(null);


 useEffect(() => {
  const loadMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(data);
    } catch (err) {
      console.error("Erro ao buscar mecânicos", err);
    }
  };
  loadMechanics();

  selectRef.current?.focus();

  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = prev;
  };
}, []);


      const filteredMechanics = mechanics.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !selectRef.current?.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const adicionarColaborador = () => {
   if (colaboradorSelecionado && !colaboradores.find(c => c._id === colaboradorSelecionado._id)) {
      setColaboradores((prev) => [...prev, colaboradorSelecionado]);
      setSearch("");
      setColaboradorSelecionado("");
    }
  };


  const handleSelectMechanic = (mec) => {
    setColaboradorSelecionado(mec);
    setSearch(mec.name);
    setShowOptions(false);
  };




  const removerColaborador = (id) => {
    setColaboradores(prev => prev.filter(c => c._id !== id));
  };


  const handleSave = () => {
    onSave(colaboradores.map(c => c._id));
    onClose();
  };

  return (
    <LayoutModal title="Mecânicos" onClose={onClose} onSave={handleSave}>
      <FormGrid>
       <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <div style={{ position: "relative", width: "100%" }}>
    <InputSearch
      ref={selectRef}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Buscar mecânico..."
      onFocus={() => setShowOptions(true)}
    />

    {showOptions && filteredMechanics.length > 0 && (
      <Dropdown ref={dropdownRef}>
        {filteredMechanics.map((mec) => (
          <DropdownItem
            key={mec._id}
            onClick={() => handleSelectMechanic(mec)}
          >
            {mec.name}
          </DropdownItem>
        ))}
      </Dropdown>
    )}
  </div>

  <ButtonAdd type="button" onClick={adicionarColaborador}>
    Adicionar
  </ButtonAdd>
</div>


        <label>Mecânicos adicionados anteriormente:</label>
        <ChipsArea>
          {colaboradores.map((colab) => (
            <Chip key={colab._id}>
              {colab.name}
              <RemoveChip onClick={() => removerColaborador(colab._id)}>×</RemoveChip>
            </Chip>
          ))}

        </ChipsArea>
      </FormGrid>
    </LayoutModal>
  );
};

export default ColaboradoresModal;
