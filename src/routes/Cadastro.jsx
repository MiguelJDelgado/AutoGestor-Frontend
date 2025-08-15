import styled from 'styled-components'
import Cadastro from '../components/Cadastro/cadastro'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg,rgb(20, 22, 22) 35%,rgb(43, 46, 48));
`

function CadastroComponent() {
  return (
    <AppContainer>
      <Cadastro />
    </AppContainer>
  )
}

export default CadastroComponent