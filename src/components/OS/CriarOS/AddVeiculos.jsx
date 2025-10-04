import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
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

const VeiculoOS = () => {
  const [placaSelecionada, setPlacaSelecionada] = useState('');
  const [veiculos, setVeiculos] = useState([]);
  const [dadosVeiculo, setDadosVeiculo] = useState({
    marca: '',
    modelo: '',
    placa: '',
    ano: '',
    tipoCombustivel: '',
    chassi: '',
    km: '',
  });

  useEffect(() => {
    setVeiculos([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', placa: 'ABC-1234', ano: '2019', tipoCombustivel: 'Gasolina', chassi: '9BWZZZ377VT004251', km: '45000' },
      { id: 2, marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', ano: '2020', tipoCombustivel: 'Flex', chassi: '19XFC2F59LE000001', km: '30000' },
      { id: 3, marca: 'Ford', modelo: 'Ka', placa: 'DEF-4321', ano: '2018', tipoCombustivel: 'Etanol', chassi: '9BFZZZ377VT123456', km: '60000' },
    ]);
  }, []);

  const handlePlacaChange = (e) => {
    const placa = e.target.value;
    setPlacaSelecionada(placa);

    const veiculoEncontrado = veiculos.find(v => v.placa.toLowerCase() === placa.toLowerCase());
    if (veiculoEncontrado) {
      setDadosVeiculo({ ...veiculoEncontrado });
    } else {
      setDadosVeiculo({
        marca: '',
        modelo: '',
        placa: '',
        ano: '',
        tipoCombustivel: '',
        chassi: '',
        km: '',
      });
    }
  };

  return (
    <Section>
      <SectionHeader>🚗 Dados do Veículo</SectionHeader>

      <FormGrid>
        <Field>
          <Label>Placa</Label>
          <Input
            list="veiculosList"
            value={placaSelecionada}
            onChange={handlePlacaChange}
            placeholder="Digite ou selecione a placa"
          />
          <datalist id="veiculosList">
            {veiculos.map(v => (
              <option key={v.id} value={v.placa} />
            ))}
          </datalist>
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
