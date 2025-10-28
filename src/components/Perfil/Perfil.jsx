import Header from "../Header/Header";
import styled from "styled-components";

const Input = styled.input` 
  margin-bottom: 30px;
  margin-right: 20px;
  width: 350px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background: #f3f6f9;
  color: #0f2f43;
  font-size: 14px;

  &:disabled {
    background: #f0f2f5;
    color: #8a8a8a;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 600;
  color: #0f2f43;
  font-size: 13px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
`;

const Actions = styled.div`
  margin-left: 20px;
  display:flex;
  justify-content:flex-start;
  gap:12px;
  margin-top:18px;
`;

const CancelBtn = styled.button`
  border: 0;
  background-color: #b5c8df;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  border-radius:6px;
`;

const SaveBtn = styled.button`
  background: #7ed957;
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

const TelaPerfil = ({onClose, onSave}) => {
  return (
    <>
      <Header title="Editar Perfil" />

      <Row>
        <Field>
          <Label>Nome</Label>
          <Input placeholder="Digite seu nome" />
        </Field>

        <Field>
          <Label>Email</Label>
          <Input placeholder="Digite seu email" />
        </Field>
      </Row>

      <Row>
        <Field>
          <Label>Senha</Label>
          <Input type="password" placeholder="Digite sua senha" />
        </Field>

        <Field>
          <Label>Confirmar Senha</Label>
          <Input type="password" placeholder="Confirme sua senha" />
        </Field>
      </Row>

        <Actions>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={onSave}>Salvar</SaveBtn>
        </Actions>
    </>
  );
};

export default TelaPerfil;
