import styled from "styled-components";
import Layout from '../components/Layout/Layout'
import TelaServicos from '../components/Tables/Servicos/Servicos'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function Servicos() {
  return (
    <AppContainer>
      <Layout>
        <TelaServicos />
      </Layout>
    </AppContainer>
  )
}

export default Servicos;
