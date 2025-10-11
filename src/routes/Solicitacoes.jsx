import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaSolicitacoesComponent from '../components/Tables/Solicitacoes/Solicitacoes'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaSolicitacoes() {
  return (
    <AppContainer>
      <Layout>
        <TelaSolicitacoesComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaSolicitacoes