import styled from 'styled-components';
import DescontoIcon from "./icons/DescontoOS.png";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f6f9;
  font-size: 14px;
`;

const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f6f9;
  font-size: 14px;
`;

const DescontoTotal = ({ value, onChange }) => {
  const handleChange = (field) => (e) => {
    let val = e.target.value;

    // 🔹 Converte para o formato que o backend espera
    if (field === "tipo") {
      if (val === "%") val = "percent";
      if (val === "R$") val = "real";
    }

    if (onChange) onChange({ ...value, [field]: val });
  };

  // 🔹 Mostra no Select o valor no formato amigável
  const displayTipo = value?.tipo === "percent" ? "%" : value?.tipo === "real" ? "R$" : "%";

  return (
    <Section>
      <SectionHeader>
        <Icon src={DescontoIcon} alt="Desconto" />
        Desconto Total
      </SectionHeader>

      <Grid>
        <Field>
          <Label>Tipo de Desconto</Label>
          <Select value={displayTipo} onChange={handleChange("tipo")}>
            <option value="%">Desconto %</option>
            <option value="R$">Desconto R$</option>
          </Select>
        </Field>

        <Field>
          <Label>Valor do Desconto</Label>
          <Input
            type="number"
            value={value?.valor || ""}
            onChange={handleChange("valor")}
            placeholder="0,00"
          />
        </Field>
      </Grid>
    </Section>
  );
};

export default DescontoTotal;
