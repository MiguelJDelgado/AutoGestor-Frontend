import styled from "styled-components";

const Headers = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  padding: 20px;
`
function Header() {
    return(
        <Headers>
            <Title></Title>
        </Headers>
    );
}

export default Header;
