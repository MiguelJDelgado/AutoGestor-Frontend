import React from "react";
import {
  Overlay,
  ModalBox,
  CancelButton,
  ConfirmButton,
} from "../styles/style";

const ConfirmModal = ({ message, onCancel, onConfirm }) => {
  return (
    <Overlay>
      <ModalBox>
        <p>{message}</p>
        <div style={{ marginTop: 20 }}>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
        </div>
      </ModalBox>
    </Overlay>
  );
};

export default ConfirmModal;
