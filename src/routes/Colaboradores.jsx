import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaColaboradoresComponent from '../components/Tables/Colaboradores/Colaboradores'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaColaboradores() {
  return (
    <AppContainer>
      <Layout>
        <TelaColaboradoresComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaColaboradores