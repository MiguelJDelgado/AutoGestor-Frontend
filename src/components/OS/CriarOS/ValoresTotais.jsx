import styled from 'styled-components';
import CalculadoraIcon from "./icons/Calculadora.png";
import { calculateServiceOrderTotals } from '../../../services/OrdemServicoService';

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
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

const Input = styled.input`
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f6f9;
  font-size: 14px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const CalculateButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#a0a0a0" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#a0a0a0" : "#0056b3")};
  }
`;

const ValoresTotais = ({ value, onChange, products = [], services = [], descontoData, isLocked = false }) => {

  const handleCalcularTotais = async () => {
    if (isLocked) return;

    try {
      const payload = {
        discountType: descontoData?.tipo || "none",
        discountValue: descontoData?.valor || 0,
        services: services.map((s) => ({ totalValue: s.totalValue || 0 })),
        products: products.map((p) => ({
          totalValue: (p.totalValue ?? p.quantity * (p.salePrice || 0)) || 0,
        })),
      };

      const res = await calculateServiceOrderTotals(payload);

      if (onChange) {
        onChange({
          valorProdutos: res.totalValue.totalValueProducts || 0,
          valorServicos: res.totalValue.totalValueServices || 0,
          valorTotal: res.totalValue.totalValueGeneral || 0,
          totalComDesconto: res.totalValue.totalValueWithDiscount || 0,
        });
      }
    } catch (err) {
      console.error("Erro ao calcular totais:", err);
      alert("Erro ao calcular totais: " + err.message);
    }
  };

  return (
    <Section disabled={isLocked}>
      <SectionHeader>
        <Icon src={CalculadoraIcon} alt="Cálculo Total" />
        Valores Totais
      </SectionHeader>

      <Grid>
        <Field>
          <Label>Valor Produtos</Label>
          <Input type="number" value={value?.valorProdutos || ""} placeholder="0,00" disabled />
        </Field>

        <Field>
          <Label>Valor Serviços</Label>
          <Input type="number" value={value?.valorServicos || ""} placeholder="0,00" disabled />
        </Field>

        <Field>
          <Label>Valor Total</Label>
          <Input type="number" value={value?.valorTotal || ""} placeholder="0,00" disabled />
        </Field>

        <Field>
          <Label>Total com Desconto</Label>
          <Input type="number" value={value?.totalComDesconto || ""} placeholder="0,00" disabled />
        </Field>
      </Grid>

      <ButtonsWrapper>
        <CalculateButton type="button" disabled={isLocked} onClick={handleCalcularTotais}>
          CALCULAR TOTAIS
        </CalculateButton>
      </ButtonsWrapper>
    </Section>
  );
};

export default ValoresTotais;
