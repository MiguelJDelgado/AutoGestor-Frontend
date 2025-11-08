import styled from 'styled-components';
import CalculadoraIcon from "./icons/Calculadora.png";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const Icon = styled.img`
  width: 20px;
  height: 30px;
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

const CustoTotal = ({ value, onChange }) => {
  const handleChange = (field) => (e) => {
    if (onChange) onChange({ ...value, [field]: e.target.value });
  };

  return (
    <Section>
      <SectionHeader>
        <Icon src={CalculadoraIcon} alt="Cálculo Total" />
        Valores Totais
      </SectionHeader>

      <Grid>
        <Field>
          <Label>Valor Produtos</Label>
          <Input
            type="number"
            value={value?.valorProdutos || ""}
            onChange={handleChange("valorProdutos")}
            placeholder="0,00"
          />
        </Field>

        <Field>
          <Label>Valor Serviços</Label>
          <Input
            type="number"
            value={value?.valorServicos || ""}
            onChange={handleChange("valorServicos")}
            placeholder="0,00"
          />
        </Field>

        <Field>
          <Label>Valor Total</Label>
          <Input
            type="number"
            value={value?.valorTotal || ""}
            onChange={handleChange("valorTotal")}
            placeholder="0,00"
          />
        </Field>

        <Field>
          <Label>Total com Desconto</Label>
          <Input
            type="number"
            value={value?.totalComDesconto || ""}
            onChange={handleChange("totalComDesconto")}
            placeholder="0,00"
          />
        </Field>
      </Grid>
    </Section>
  );
};

export default CustoTotal;