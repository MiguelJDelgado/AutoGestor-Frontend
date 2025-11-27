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

const formatarValor = (num) => {
  if (num == null || num === "") return "";
  const n = Number(num);
  if (Number.isNaN(n)) return "";
  return `R$ ${n.toFixed(2)}`;
};

const ValoresTotais = ({ value, onChange, products = [], services = [], descontoData, isLocked = false }) => {

  const normalizeDiscountType = (tipo) => {
    if (!tipo) return "none";
    const t = String(tipo).toLowerCase();
    if (t === "percent" || t === "percentage" || t === "percentual") return "percent";
    if (t === "real" || t === "value" || t === "money") return "real";
    return "none";
  };

  const calcularLocalComDesconto = (totalGeneral, tipo, valor) => {
    if (!tipo || !valor) return totalGeneral;
    if (tipo === "percent") {
      return totalGeneral - (totalGeneral * (Number(valor) / 100));
    } else if (tipo === "real") {
      return totalGeneral - Number(valor);
    }
    return totalGeneral;
  };

  const handleCalcularTotais = async () => {
    if (isLocked) return;

    try {
      const produtosTratados = (products || []).map((p) => ({
        totalValue: p.totalValue ?? ((p.quantity || 0) * (p.salePrice || 0))
      }));

      const servicosTratados = (services || []).map((s) => ({
        totalValue: s.totalValue ?? 0
      }));

      const discountTypeNormalized = normalizeDiscountType(descontoData?.tipo);
      const discountValueNumber = Number(descontoData?.valor || 0);

      const payload = {
        products: produtosTratados,
        services: servicosTratados,
        discountType: discountTypeNormalized,
        discountValue: discountValueNumber,
      };

      const res = await calculateServiceOrderTotals(payload);

      const tv = res?.totalValue || {};

      let totalWithDiscount = tv.totalValueWithDiscount;
      if (totalWithDiscount === undefined || totalWithDiscount === null) {
        totalWithDiscount = calcularLocalComDesconto(
          tv.totalValueGeneral ?? ( (tv.totalValueProducts || 0) + (tv.totalValueServices || 0) ),
          discountTypeNormalized,
          discountValueNumber
        );
      }

      const result = {
        valorProdutos: tv.totalValueProducts ?? 0,
        valorServicos: tv.totalValueServices ?? 0,
        valorTotal: tv.totalValueGeneral ?? ((tv.totalValueProducts ?? 0) + (tv.totalValueServices ?? 0)),
        totalComDesconto: totalWithDiscount ?? 0,
      };

      if (onChange) onChange(result);
    } catch (err) {
      console.error("Erro ao calcular totais:", err);
      alert("Erro ao calcular totais: " + (err.message || err));
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
          <Input
            type="text"
            value={formatarValor(value?.valorProdutos)}
            disabled
          />
        </Field>

        <Field>
          <Label>Valor Serviços</Label>
          <Input
            type="text"
            value={formatarValor(value?.valorServicos)}
            disabled
          />
        </Field>

        <Field>
          <Label>Valor Total</Label>
          <Input
            type="text"
            value={formatarValor(value?.valorTotal)}
            disabled
          />
        </Field>

        <Field>
          <Label>Total com Desconto</Label>
          <Input
            type="text"
            value={formatarValor(value?.totalComDesconto)}
            disabled
          />
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
