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
`;

const Title = styled.h1`
  font-size: 30px;
  color: #333;
  margin: 0;
  padding: 20px;
`;

const NewOrderButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

function Header({ title, children, onNew }) {
  return (
    <Headers>
      <Title>{title}</Title>
      {onNew && (
        <NewOrderButton onClick={onNew}>
          {children}
        </NewOrderButton>
      )}
    </Headers>
  );
}

export default Header;
