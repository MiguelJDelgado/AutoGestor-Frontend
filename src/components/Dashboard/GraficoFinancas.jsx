// src/components/Dashboard/ChartBilling.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const Wrap = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

function ChartBilling({ data }) {
  return (
    <Wrap>
      <h3>Faturamento</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#8884d8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Wrap>
  );
}

export default ChartBilling;
