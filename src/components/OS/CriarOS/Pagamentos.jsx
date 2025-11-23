import styled from "styled-components";
import PagamentoIcon from "./icons/Pagamento.png"; 

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Icon = styled.img`
  width: 35px;
  height: 25px;
  margin-right: 5px;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2b3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
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

const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f6f9;
  font-size: 14px;
`;

const Input = styled.input`
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f6f9;
  font-size: 14px;
`;

const PagamentosOS = ({ value, onChange, isLocked = false }) => {
  const handleChange = (field) => (e) => {
    if (isLocked) return;

    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    onChange({ ...value, [field]: val });
  };

  return (
    <Section disabled={isLocked}>
      <SectionHeader>
        <Icon src={PagamentoIcon} alt="Pagamento" />
        Pagamento
      </SectionHeader>

      <Grid>
        <Field>
          <Label>Tipo de Pagamento</Label>
          <Select
            value={value?.paymentType || ""}
            onChange={handleChange("paymentType")}
            disabled={isLocked}
          >
            <option value="">Selecione...</option>
            <option value="pix">Pix</option>
            <option value="credito">Cartão Crédito</option>
            <option value="debito">Cartão Débito</option>
            <option value="dinheiro">Dinheiro</option>
          </Select>
        </Field>

        <Field>
          <Label>Foi Pago?</Label>
          <Select
            value={value?.paid ? "sim" : "não"}
            onChange={(e) =>
              !isLocked &&
              onChange({
                ...value,
                paid: e.target.value === "sim",
              })
            }
            disabled={isLocked}
          >
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </Select>
        </Field>

        <Field>
          <Label>Data do Pagamento</Label>
          <Input
            type="date"
            value={value?.paymentDate || ""}
            onChange={handleChange("paymentDate")}
            disabled={isLocked}
          />
        </Field>
      </Grid>
    </Section>
  );
};

export default PagamentosOS;
