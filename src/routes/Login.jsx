import styled from "styled-components";
import LoginBox from '../components/Login/Login.jsx'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg,rgb(20, 22, 22) 35%,rgb(43, 46, 48));
`

function Login() {
    return(
        <AppContainer>
            <LoginBox></LoginBox>
        </AppContainer>
    );
}

export default Login