import styled from 'styled-components'
import Layout from '../components/Layout/Layout';
import TopHeader from '../components/Dashboard/HeaderDashboard';
import CardsFinancas from '../components/Dashboard/CardsFinancas'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function Home() {
  return (
    <AppContainer>
      <Layout>
        <TopHeader />
        <CardsFinancas />
      </Layout>
    </AppContainer>
  );
}

export default Home
