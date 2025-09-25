// src/components/Dashboard/Indicators.jsx
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  gap: 16px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const Box = styled.div`
  flex: 1 1 240px;
  min-width: 200px;
  border-radius: 12px;
  padding: 16px;
  background: #2f3e46;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 14px;
  opacity: 0.85;
`;

const Value = styled.strong`
  font-size: 22px;
`;

function Indicators({ osEmitidas = 85, novosClientes = 25 }) {
  return (
    <Wrap>
      <Box>
        <Label>O.S Emitidas</Label>
        <Value>{osEmitidas}</Value>
      </Box>
      <Box>
        <Label>Novos Clientes</Label>
        <Value>{novosClientes}</Value>
      </Box>
    </Wrap>
  );
}

export default Indicators;
