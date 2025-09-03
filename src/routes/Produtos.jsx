import styled from 'styled-components'
import Layout from '../components/Layout/Layout'
import TelaProdutos from '../components/Tables/Produtos/Produtos.jsx'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function Produtos() {
  return (
    <AppContainer>
      <Layout>
        <TelaProdutos />
      </Layout>
    </AppContainer>
  )
}

export default Produtos
