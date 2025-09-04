import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import Os from "../components/OS/OS";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function OS() {
  return (
    <AppContainer>
      <Layout>
        <Os />
      </Layout>
    </AppContainer>
  )
}

export default OS