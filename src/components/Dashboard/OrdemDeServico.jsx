// src/components/Dashboard/ServiceOrders.jsx
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Box = styled.div`
  flex: 1 1 320px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Item = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
`;

function ServiceOrders({
  proximas = [],
  vencidas = []
}) {
  return (
    <Wrap>
      <Box>
        <Title>Próximas do vencimento</Title>
        {proximas.map((o) => (
          <Item key={o.id}>
            {o.id} | {o.cliente} | {o.veiculo} | {o.data}
          </Item>
        ))}
      </Box>

      <Box>
        <Title>Vencidas</Title>
        {vencidas.map((o) => (
          <Item key={o.id}>
            {o.id} | {o.cliente} | {o.veiculo} | {o.data}
          </Item>
        ))}
      </Box>
    </Wrap>
  );
}

export default ServiceOrders;
