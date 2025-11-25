import styled from "styled-components";
import LayoutModal from "../Layout";
import { useState } from "react";

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
  background: #fff;
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

const TableInput = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  pointer-events: none;
`;

const TableSelect = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #eee;
  color: #666;
  pointer-events: none;
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

const ModalSolicitacaoComprada = ({ onClose, solicitacao }) => {
  // Status inicial = "Comprada"
  const [status, setStatus] = useState("Comprada");

  const handleSave = () => {
    const dadosAtualizados = { ...solicitacao, status };
    console.log("Solicitação comprada salva:", dadosAtualizados);
    onClose();
  };

  return (
    <LayoutModal
      title="Solicitação Comprada"
      onClose={onClose}
      onSave={handleSave}
    >
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.solicitante || ""} readOnly />
          </Field>

          <Field>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Comprada">Comprada</option>
              <option value="Rejeitado">Rejeitada</option>
              <option value="Finalizada">Finalizada</option>
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
                <Th>Fornecedor</Th>
                <Th>UN</Th>
                <Th>Valor Pago</Th>
              </tr>
            </thead>

            <tbody>
              {solicitacao?.itens?.map((item, index) => (
                <tr key={index}>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.nome}</Td>

                  <Td>
                    <TableSelect value={item.fornecedor || ""} disabled>
                      <option value={item.fornecedor}>{item.fornecedorNome}</option>
                    </TableSelect>
                  </Td>

                  <Td>
                    <TableInput type="text" value={item.un || ""} disabled />
                  </Td>

                  <Td>
                    <TableInput type="number" value={item.valorPago || ""} disabled />
                  </Td>
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

export default ModalSolicitacaoComprada;
