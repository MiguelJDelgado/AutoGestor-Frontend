import styled from 'styled-components'
import Header from '../components/Header/header'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff
`

function Home() {
  return (
    <AppContainer>
      <Header />
    </AppContainer>
  )
}

export default Home
