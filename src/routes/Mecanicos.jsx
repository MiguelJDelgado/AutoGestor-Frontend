import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TelaMecanicosComponent from '../components/Tables/Mecanicos/Mecanicos'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function TelaMecanicos() {
  return (
    <AppContainer>
      <Layout>
        <TelaMecanicosComponent />
      </Layout>
    </AppContainer>
  )
}

export default TelaMecanicos