import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaConfiguracoesComponent from '../components/Tables/Configuracoes/Configuracoes'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaConfiguracoes() {
  return (
    <AppContainer>
      <Layout>
        <TelaConfiguracoesComponent/>
      </Layout>
    </AppContainer>
  )
}

export default TelaConfiguracoes