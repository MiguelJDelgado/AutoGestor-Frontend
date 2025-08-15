import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.$onlyWeb && "display: none;"}
  }
`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.$alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  max-width: 350px;
  width: 90%;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 8px 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

export const CancelButton = styled(Button)`
  background: #bbb;
  color: #222;

  &:hover {
    background: #999;
  }
`;

export const ConfirmButton = styled(Button)`
  background: #d9534f;
  color: white;

  &:hover {
    background: #c9302c;
  }
`;