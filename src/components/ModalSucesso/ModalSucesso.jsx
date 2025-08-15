import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #2f3e46;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #e0f7fa;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #a8dadc;
`;

const Button = styled.button`
  background-color: #76c7c0;
  color: #1a1a1a;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b2f7ef;
  }
`;

export default function ModalCadastro({ onConfirm }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Cadastro realizado com sucesso!</Title>
        <p>Você já pode fazer login.</p>
        <Button onClick={onConfirm}>Ir para o Login</Button>
      </ModalContent>
    </ModalOverlay>
  );
}
