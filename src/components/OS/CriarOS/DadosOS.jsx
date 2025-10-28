import styled from "styled-components";
import DadosIcon from "./icons/DadosOS.png";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const Icon = styled.img`
  width: 20px;
  height: 25px;
  vertical-align: middle;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #2b3e50;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

const Select = styled.select`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

function DadosOSSection() {
  return (
    <Section>
      <SectionHeader> 
        <Icon src={DadosIcon} alt="Dados OS" />
        Dados da OS
      </SectionHeader>

      <FormGrid>
        <Field>
          <Label>Número da OS</Label>
          <Input placeholder="Gerado automaticamente" disabled />
        </Field>

        <Field>
          <Label>Status</Label>
          <Select defaultValue="analise">
            <option value="analise">Solicitação</option>
            <option value="pendente">Orçamento</option>
            <option value="finalizado">Em Progresso</option>
            <option value="finalizado">Pendente de Produto</option>
            <option value="finalizado">Cancelado</option>
            <option value="finalizado">Concluído</option>
          </Select>
        </Field>

        <Field>
          <Label>Entrada do veículo</Label>
          <Input type="date" />
        </Field>

        <Field>
          <Label>Previsão de entrega</Label>
          <Input type="date" />
        </Field>

        <Field>
          <Label>Colaborador</Label>
          <Select>
            <option>Selecione o colaborador</option>
          </Select>
        </Field>
      </FormGrid>
    </Section>
  );
}

export default DadosOSSection;
