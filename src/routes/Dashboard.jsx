import styled from 'styled-components'
import Header from '../components/Header/header'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg,rgb(20, 22, 22) 35%,rgb(43, 46, 48));
`

function Dashboard() {
  return (
    <AppContainer>
        <h1>ESSA É A DASHBOARD</h1>
      <Header />
    </AppContainer>
  )
}

export default Dashboard
