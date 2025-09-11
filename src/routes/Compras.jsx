import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaComprasComponent from '../components/Tables/Compras/Compras'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaCompras() {
  return (
    <AppContainer>
      <Layout>
        <TelaComprasComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaCompras