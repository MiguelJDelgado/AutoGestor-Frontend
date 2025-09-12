import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaVeiculoss from '../components/Tables/Veiculos/Veiculos'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaVeiculos() {
  return (
    <AppContainer>
      <Layout>
        <TelaVeiculoss />
      </Layout>
    </AppContainer>
  )
}

export default TelaVeiculos