import styled from "styled-components";
import DadosIcon from "./icons/DadosOS.png";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  overflow: hidden;
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
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

function DadosOSSection({ dadosOS = {}, setDadosOS, isLocked }) {
  const formatForDateInput = (iso) => {
    if (!iso) return "";
    try {
      return iso.slice(0, 10);
    } catch {
      return "";
    }
  };

  const entryDate = formatForDateInput(dadosOS.entryDate);
  const deadline = formatForDateInput(dadosOS.deadline);
  const status = dadosOS.status || "analise";

  const handleChange = (field) => (e) => {
    if (isLocked) return;
    const value = e.target.value;
    setDadosOS({ ...dadosOS, [field]: value });
  };

  return (
    <Section style={{ opacity: isLocked ? 0.6 : 1, pointerEvents: isLocked ? "none" : "auto" }}>
      <SectionHeader>
        <Icon src={DadosIcon} alt="Dados OS" />
        Dados da OS
      </SectionHeader>

      <FormGrid>
        <Field>
          <Label>Número da OS</Label>
          <Input
            placeholder="Gerado automaticamente"
            value={dadosOS.code ?? ""}
            disabled
          />
        </Field>

        <Field>
          <Label>Status</Label>
          <Select value={status} onChange={handleChange("status")} disabled={isLocked}>
            <option value="analise">Solicitação</option>
            <option value="pendente">Orçamento</option>
            <option value="emprogresso">Em Progresso</option>
            <option value="pendente-produto">Pendente de Produto</option>
            <option value="cancelado">Cancelado</option>
            <option value="concluido">Concluído</option>
          </Select>
        </Field>

        <Field>
          <Label>Entrada do veículo</Label>
          <Input
            type="date"
            value={entryDate}
            disabled={isLocked}
            onChange={(e) =>
              !isLocked && setDadosOS({ ...dadosOS, entryDate: e.target.value })
            }
          />
        </Field>

        <Field>
          <Label>Previsão de entrega</Label>
          <Input
            type="date"
            value={deadline}
            disabled={isLocked}
            onChange={(e) =>
              !isLocked && setDadosOS({ ...dadosOS, deadline: e.target.value })
            }
          />
        </Field>
      </FormGrid>
    </Section>
  );
}

export default DadosOSSection
