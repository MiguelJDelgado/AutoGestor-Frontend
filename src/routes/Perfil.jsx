import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaPerfilComponent from '../components/Perfil/Perfil'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaPerfil() {
  return (
    <AppContainer>
      <Layout>
        <TelaPerfilComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaPerfil