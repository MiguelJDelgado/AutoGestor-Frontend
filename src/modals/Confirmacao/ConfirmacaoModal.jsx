import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
`;

const ModalContainer = styled.div`
  width: 380px;
  background: #fff;
  border-radius: 12px;
  padding: 26px 22px 22px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.22s ease;
  text-align: center;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const IconWrapper = styled.div`
  width: 62px;
  height: 62px;
  background: #f4b400; /* amarelo */
  border-radius: 50%;
  margin: -10px auto 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 34px;
  font-weight: bold;
  animation: pop 0.25s ease;

  @keyframes pop {
    from { transform: scale(0.7); opacity: 0; }
    to { transform: scale(1); opacity: 1); }
  }
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #f4b400;
`;

const Message = styled.p`
  font-size: 15px;
  color: #444;
  margin: 0 0 20px 0;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  background: #999;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #777;
  }
`;

const ConfirmBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  background: #f4b400;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #d9a200;
  }
`;

export default function ConfirmModal({
  message = "Tem certeza que deseja continuar?",
  title = "Confirmação",
  onConfirm,
  onCancel
}) {
  return (
    <Overlay>
      <ModalContainer>

        <IconWrapper>!</IconWrapper>

        <Title>{title}</Title>

        <Message>{message}</Message>

        <ButtonsRow>
          <CancelBtn onClick={onCancel}>Cancelar</CancelBtn>
          <ConfirmBtn onClick={onConfirm}>Confirmar</ConfirmBtn>
        </ButtonsRow>

      </ModalContainer>
    </Overlay>
  );
}
