import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import CriarOSComponent from '../components/OS/CriarOS'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function CriarOS() {
  return (
    <AppContainer>
      <Layout>
        <CriarOSComponent />
      </Layout>
    </AppContainer>
  )
}

export default CriarOS