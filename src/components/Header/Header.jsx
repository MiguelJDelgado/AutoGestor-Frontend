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
  font-size: 30px;
  color: #333;
  margin: 0;
  padding: 20px;
`
function Header({ title, children }) {
  return (
    <Headers>
      <Title>{title}</Title>
      {children}
    </Headers>
  );
}

export default Header;
