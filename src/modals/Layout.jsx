import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const Modal = styled.div`
  width: 720px;
  max-width: 95%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(2,15,30,0.2);
  padding: 18px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #00273d;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: 0;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  padding: 6px;
`;

const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: #00273d;
  opacity: 0.15;
  margin: 10px 0 18px;
`;

const Actions = styled.div`
  display:flex;
  justify-content:flex-end;
  gap:12px;
  margin-top:18px;
`;

const CancelBtn = styled.button`
  border: 0;
  background: transparent;
  color: #333;
  padding: 8px 12px;
  cursor: pointer;
  border-radius:6px;
`;

const SaveBtn = styled.button`
  background: #28a745;
  color: #fff;
  padding: 9px 16px;
  border-radius: 6px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LayoutModal = ({ title, onClose, onSave, children }) => {
  return (
    <Overlay role="dialog" aria-modal="true" aria-label={title}>
      <Modal>
        <Header>
          <Title>{title}</Title>
          <CloseBtn aria-label="Fechar" onClick={onClose}>✖</CloseBtn>
        </Header>

        <Divider />

        {children}

        <Actions>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={onSave}>Adicionar</SaveBtn>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default LayoutModal;
