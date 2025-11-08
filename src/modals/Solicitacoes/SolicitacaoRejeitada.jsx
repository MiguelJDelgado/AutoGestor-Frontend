import styled from "styled-components";
import LayoutModal from "../Layout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: Arial, sans-serif;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  pointer-events: none;
`;

const Select = styled.select`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  pointer-events: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
`;

const Th = styled.th`
  text-align: left;
  background: #f5f5f5;
  padding: 6px;
  font-size: 14px;
`;

const Td = styled.td`
  padding: 6px;
  border-top: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 70px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  resize: none;
  pointer-events: none;
`;

const ModalSolicitacaoRejeitada = ({ onClose, solicitacao }) => {
  return (
    <LayoutModal
      title="Visualizar Solicitação"
      onClose={onClose}
      hideSaveButton
    >
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.solicitante || ""} readOnly />
          </Field>
          <Field>
            <Label>Status</Label>
            <Select value="Rejeitado" disabled>
              <option value="Rejeita">Rejeitada</option>
            </Select>
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>O.S</Label>
            <Input type="text" value={solicitacao?.os || "-"} readOnly />
          </Field>
          <Field>
            <Label>Data Solicitação</Label>
            <Input type="text" value={solicitacao?.data || ""} readOnly />
          </Field>
        </Row>

        <div>
          <Label>Itens solicitados</Label>
          <Table>
            <thead>
              <tr>
                <Th>Quantidade</Th>
                <Th>Itens solicitados</Th>
              </tr>
            </thead>
            <tbody>
              {solicitacao?.itens?.map((item, index) => (
                <tr key={index}>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.nome}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div>
          <Label>Observação</Label>
          <TextArea readOnly value={solicitacao?.observacao || ""} />
        </div>
      </Container>
    </LayoutModal>
  );
};

export default ModalSolicitacaoRejeitada;
