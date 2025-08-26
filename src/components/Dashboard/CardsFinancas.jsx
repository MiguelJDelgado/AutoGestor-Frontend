// src/components/FinanceSummary.jsx
import styled from 'styled-components';
import { useMemo, useState } from 'react';

const Block = styled.section`
  padding: 16px 20px;
`;

const RowHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const MonthSelect = styled.select`
  padding: 8px 10px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #fff;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Card = styled.div`
  flex: 1 1 240px; /* cresce, mas tem base mínima */
  min-width: 220px;
  border-radius: 14px;
  padding: 16px 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const Value = styled.strong`
  font-size: 24px;
  letter-spacing: 0.3px;
`;

const cardBg = {
  faturado: 'linear-gradient(135deg, #5ecf68, #9ad84d)',   // verde
  servicos: 'linear-gradient(135deg, #0aa1dd, #1864ab)',   // azul
  pecas:    'linear-gradient(135deg, #ffd452, #f0b429)',   // amarelo
  custos:   'linear-gradient(135deg, #ff6b6b, #f06543)',   // vermelho
};

const months = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

function formatBRL(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function FinanceSummary({
  initialMonthIndex = new Date().getMonth(),
  dataByMonth = {
    Janeiro:   { faturado: 250000, servicos: 110000, pecas:  80000, custos: 120000 },
    Fevereiro: { faturado: 210000, servicos:  90000, pecas:  70000, custos: 110000 },
    Março:     { faturado: 420000, servicos: 180000, pecas: 130000, custos: 160000 },
    Abril:     { faturado: 470000, servicos: 200000, pecas: 145000, custos: 170000 },
    Maio:      { faturado: 390000, servicos: 175000, pecas: 120000, custos: 150000 },
    Junho:     { faturado: 360000, servicos: 160000, pecas: 115000, custos: 140000 },
    Julho:     { faturado: 410000, servicos: 185000, pecas: 125000, custos: 155000 },
    Agosto:    { faturado: 520000, servicos: 220000, pecas: 300000, custos: 200000 },
  }
}) {
  const [month, setMonth] = useState(months[initialMonthIndex] || 'Agosto');

  const mdata = useMemo(
    () => dataByMonth[month] || { faturado: 0, servicos: 0, pecas: 0, custos: 0 },
    [month, dataByMonth]
  );

  return (
    <Block>
      <RowHead>
        <strong>{month}</strong>
        <MonthSelect value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </MonthSelect>
      </RowHead>

      <Cards>
        <Card style={{ background: cardBg.faturado }}>
          <Label>Faturado no mês</Label>
          <Value>{formatBRL(mdata.faturado)}</Value>
        </Card>

        <Card style={{ background: cardBg.servicos }}>
          <Label>Serviços</Label>
          <Value>{formatBRL(mdata.servicos)}</Value>
        </Card>

        <Card style={{ background: cardBg.pecas }}>
          <Label>Peças</Label>
          <Value>{formatBRL(mdata.pecas)}</Value>
        </Card>

        <Card style={{ background: cardBg.custos }}>
          <Label>Custo do mês</Label>
          <Value>{formatBRL(mdata.custos)}</Value>
        </Card>
      </Cards>
    </Block>
  );
}

export default FinanceSummary;