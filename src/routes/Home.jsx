// src/routes/Home.jsx
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import TopHeader from '../components/Dashboard/HeaderDashboard';
import CardsFinancas from '../components/Dashboard/CardsFinancas';
import Indicators from '../components/Dashboard/Indicadores';
import ChartBilling from '../components/Dashboard/GraficoFinancas';
import ServiceOrders from '../components/Dashboard/OrdemDeServico';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffffff;
`;

const dataGrafico = [
  { mes: 'Janeiro', valor: 250000 },
  { mes: 'Fevereiro', valor: 210000 },
  { mes: 'Março', valor: 420000 },
  { mes: 'Abril', valor: 470000 },
  { mes: 'Maio', valor: 390000 },
  { mes: 'Junho', valor: 360000 },
  { mes: 'Julho', valor: 410000 },
  { mes: 'Agosto', valor: 520000 },
];

const proximas = [
  { id: '25081501', cliente: 'Transportadora Carrion', veiculo: 'Montana', data: '18/08/25' },
  { id: '25081502', cliente: 'Transportadora Delgado', veiculo: 'Montana', data: '19/08/25' },
];

const vencidas = [
  { id: '25031204', cliente: 'Transportadora Dimas', veiculo: 'Montana', data: '14/08/25' },
  { id: '25041503', cliente: 'Transportadora Fekete', veiculo: 'Montana', data: '13/07/25' },
];

function Home() {
  return (
    <AppContainer>
      <Layout>
        <TopHeader />
        <CardsFinancas />
        <Indicators osEmitidas={85} novosClientes={25} />
        <ChartBilling data={dataGrafico} />
        <ServiceOrders proximas={proximas} vencidas={vencidas} />
      </Layout>
    </AppContainer>
  );
}

export default Home;
