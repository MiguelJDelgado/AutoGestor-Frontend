import styled from 'styled-components'
import Layout from '../components/Layout/Layout'
import TelaFornecedores from '../components/Tables/Fornecedores/Fornecedores'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function Fornecedores() {
  return (
    <AppContainer>
      <Layout>
        <TelaFornecedores />
      </Layout>
    </AppContainer>
  )
}

export default Fornecedores
