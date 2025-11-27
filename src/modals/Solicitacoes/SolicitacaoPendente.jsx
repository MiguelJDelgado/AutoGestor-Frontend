import styled from "styled-components";
import LayoutModal from "../Layout";
import { useState } from "react";
import { authorize } from "../../services/SolicitacaoService";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

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
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 14px;
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

const ModalSolicitacaoPendente = ({ onClose, solicitacao, onStatusUpdated }) => {
  const [status, setStatus] = useState(
    solicitacao?.status?.toLowerCase() || "pending"
  );

  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const role = user.role.toLowerCase();

  const canEdit = role === "admin" || role === "manager";



  const handleSave = async () => {
    if (!canEdit) return;
    try {
      if (status === "approved") {
        await authorize(solicitacao._id, true); // aprovar
      } else if (status === "rejected") {
        await authorize(solicitacao._id, false); // rejeitar
      }

      if (onStatusUpdated) await onStatusUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status da solicitação");
    }
  };

  return (
    <LayoutModal
        title="Solicitação Pendente"
        onClose={onClose}
        onSave={handleSave}
        hideSaveButton={user ? !canEdit : true}
      >
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.userName || "—"} readOnly />
          </Field>

          <Field>
            <Label>Status</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!canEdit}
            >
              <option value="pending">Pendente</option>
              <option value="approved">Autorizada</option>
              <option value="rejected">Rejeitada</option>
            </Select>

          </Field>
        </Row>

        <Row>
          <Field>
            <Label>O.S</Label>
            <Input type="text" value={solicitacao?.serviceOrderCode || "-"} readOnly />
          </Field>

          <Field>
            <Label>Data Solicitação</Label>
            <Input
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

export default ModalSolicitacaoPendente;
