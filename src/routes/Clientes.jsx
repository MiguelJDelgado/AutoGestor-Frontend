import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaClientesComponent from '../components/Tables/Clientes/Clientes'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaMecanicos() {
  return (
    <AppContainer>
      <Layout>
        <TelaClientesComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaMecanicos