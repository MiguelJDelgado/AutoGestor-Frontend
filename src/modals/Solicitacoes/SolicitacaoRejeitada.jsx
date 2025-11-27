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

const ReadonlyInput = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  pointer-events: none;
`;

const ReadonlySelect = styled.select`
  width: 100%;
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
      title="Solicitação Rejeitada"
      onClose={onClose}
      hideSaveButton
    >
      <Container>

        <Row>
          <Field>
            <Label>Solicitante</Label>
            <ReadonlyInput
              type="text"
              value={solicitacao?.userName || "—"}
              readOnly
            />
          </Field>

          <Field>
            <Label>Status</Label>
            <ReadonlySelect value="rejected" disabled>
              <option value="rejected">Rejeitada</option>
            </ReadonlySelect>
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>O.S</Label>
            <ReadonlyInput
              type="text"
              value={solicitacao?.serviceOrderCode || "-"}
              readOnly
            />
          </Field>

          <Field>
            <Label>Data Solicitação</Label>
            <ReadonlyInput
              type="text"
              value={
                solicitacao?.requestDate
                  ? new Date(solicitacao.requestDate).toLocaleString("pt-BR")
                  : "-"
              }
              readOnly
            />
          </Field>
        </Row>

        <div>
          <Label>Itens solicitados</Label>
          <Table>
            <thead>
              <tr>
                <Th>Quantidade</Th>
                <Th>Item</Th>
              </tr>
            </thead>

            <tbody>
              {solicitacao?.products?.map((item, index) => (
                <tr key={index}>
                  <Td>{item.quantity}</Td>
                  <Td>{item.name}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div>
          <Label>Observação</Label>
          <TextArea
            readOnly
            value={
              solicitacao?.products
                ?.map((p) => `${p.name}: ${p.observations || "—"}`)
                .join("\n") || "—"
            }
          />
        </div>

      </Container>
    </LayoutModal>
  );
};

export default ModalSolicitacaoRejeitada;
