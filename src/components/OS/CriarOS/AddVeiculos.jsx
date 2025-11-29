import { useState, useEffect } from "react";
import styled from "styled-components";
import VeiculoIcon from "./icons/VeiculoOS.png";
import { getAllVehicles } from "../../../services/VeiculoService";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 5px;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2b3e50;
  margin-bottom: 12px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

const Label = styled.label`
  font-weight: 600;
  color: #0f2f43;
  font-size: 13px;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 1px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background: #f3f6f9;
  color: #0f2f43;
  font-size: 14px;

  &:disabled {
    background: #f0f2f5;
    color: #8a8a8a;
    cursor: not-allowed;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  color: #0f2f43;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f3f6f9;
  }
`;

const VeiculoOS = ({ vehicleId, setVehicleId, isLocked }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVeiculos, setFilteredVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");

  const [dadosVeiculo, setDadosVeiculo] = useState({
    marca: "",
    modelo: "",
    placa: "",
    ano: "",
    tipoCombustivel: "",
    chassi: "",
    km: "",
  });

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const res = await getAllVehicles();
        setVeiculos(res);
        setFilteredVeiculos(res);
      } catch (err) {
        console.error("Erro ao buscar veículos:", err);
      }
    };
    fetchVeiculos();
  }, []);

  useEffect(() => {
    if (!vehicleId || veiculos.length === 0) return;

    const v = veiculos.find((x) => x._id === vehicleId);
    if (!v) return;

    setVeiculoSelecionado(v);
    setBusca(`${v.name || ""} - ${v.licensePlate || ""}`);

    setDadosVeiculo({
      marca: v.brand || "",
      modelo: v.name || "",
      placa: v.licensePlate || "",
      ano: v.year || "",
      tipoCombustivel: v.fuel || "",
      chassi: v.chassi || "",
      km: v.km || "",
    });
  }, [vehicleId, veiculos]);

  useEffect(() => {
    const termo = busca.toLowerCase();
    const filtrados = veiculos.filter(
      (v) =>
        v.name?.toLowerCase().includes(termo) ||
        v.licensePlate?.toLowerCase().includes(termo)
    );
    setFilteredVeiculos(filtrados);
  }, [busca, veiculos]);

  const handleSelectVeiculo = (veiculo) => {
    if (isLocked) return;

    setVeiculoSelecionado(veiculo);
    setBusca(`${veiculo.name || ""} - ${veiculo.licensePlate || ""}`);

    setDadosVeiculo({
      marca: veiculo.brand || "",
      modelo: veiculo.name || "",
      placa: veiculo.licensePlate || "",
      ano: veiculo.year || "",
      tipoCombustivel: veiculo.fuel || "",
      chassi: veiculo.chassi || "",
      km: veiculo.km || "",
    });

    setVehicleId(veiculo._id);
  };

  return (
     <Section style={{ opacity: isLocked ? 0.6 : 1 }}>
      <SectionHeader>
        <Icon src={VeiculoIcon} alt="Veículo" />
        Veículo
      </SectionHeader>

      <FormGrid>
        <Field>
          <Label>Veículo / Placa</Label>
          <Input
            type="text"
            value={busca}
            placeholder="Digite o nome ou placa..."
            autoComplete="off"
            disabled={isLocked}
            onChange={(e) => {
              if (isLocked) return;
              setBusca(e.target.value);
              setVeiculoSelecionado(null);
              setVehicleId(null);
            }}
          />

          {busca &&
            !veiculoSelecionado &&
            filteredVeiculos.length > 0 &&
            !isLocked && (
              <Dropdown>
                {filteredVeiculos.slice(0, 8).map((v) => (
                  <DropdownItem key={v._id} onClick={() => handleSelectVeiculo(v)}>
                    {v.name} — {v.licensePlate}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
        </Field>

        <Field>
          <Label>Marca</Label>
          <Input value={dadosVeiculo.marca} disabled />
        </Field>

        <Field>
          <Label>Modelo</Label>
          <Input value={dadosVeiculo.modelo} disabled />
        </Field>

        <Field>
          <Label>Ano</Label>
          <Input value={dadosVeiculo.ano} disabled />
        </Field>

        <Field>
          <Label>Tipo de Combustível</Label>
          <Input value={dadosVeiculo.tipoCombustivel} disabled />
        </Field>

        <Field>
          <Label>Chassi</Label>
          <Input value={dadosVeiculo.chassi} disabled />
        </Field>

        <Field>
          <Label>KM</Label>
          <Input value={dadosVeiculo.km} disabled />
        </Field>
      </FormGrid>
    </Section>
  );
};

export default VeiculoOS;
