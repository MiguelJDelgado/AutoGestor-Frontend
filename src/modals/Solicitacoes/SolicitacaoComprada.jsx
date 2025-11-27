import styled from "styled-components";
import LayoutModal from "../Layout";
import { useState, useEffect } from "react";
import { authorize, updateSolicitacao } from "../../services/SolicitacaoService";
import { getSupplierById } from "../../services/FornecedorService";
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

const Select = styled.select`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
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

const ModalSolicitacaoComprada = ({ onClose, solicitacao }) => {
  const [status, setStatus] = useState("purchased");
  const [supplierNames, setSupplierNames] = useState({}); // <- armazena nomes dos fornecedores
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadSuppliers = async () => {
      if (!solicitacao?.products) return;

      const ids = [
        ...new Set(
          solicitacao.products.map((p) => p.providerIds?.[0]).filter(Boolean)
        ),
      ];

      const results = {};
      for (const id of ids) {
        try {
          const supplier = await getSupplierById(id);
          results[id] = supplier?.name || "—";
        } catch {
          results[id] = "—";
        }
      }

      setSupplierNames(results);
    };

    loadSuppliers();
  }, [solicitacao]);

    if (!user) return null;

    const role = user.role?.toLowerCase();
    const canEdit = role === "admin" || role === "manager";

  const handleSave = async () => {
    if (!canEdit) return;
    
    try {
      if (status === "rejected") {
        // enviar boolean FALSE (não um objeto)
        await authorize(solicitacao._id, false);
      } else if (status === "delivered") {
        await updateSolicitacao(solicitacao._id, { status: "delivered" });
      }

      // notifica pai preferencialmente via callback específico
      if (typeof onStatusUpdated === "function") {
        await onStatusUpdated();
      } else {
        // compatibilidade: avisa com flag via onClose
        onClose && onClose(true);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar status!");
      return;
    }

    // Fecha modal (se onStatusUpdated existiu, pai já atualizou)
    onClose && onClose(false);
  };

  return (
      <LayoutModal
        title="Solicitação Comprada"
        onClose={onClose}
        onSave={handleSave}
        hideSaveButton={!canEdit}
      >

      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.userName || ""} readOnly />
          </Field>

          <Field>
            <Label>Status</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!canEdit}
            >
              <option value="purchased">Comprada</option>
              <option value="rejected">Rejeitada</option>
              <option value="delivered">Finalizada</option>
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
              value={solicitacao?.requestDate ? new Date(solicitacao.requestDate).toLocaleDateString("pt-BR") : "-"}
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
                <Th>Fornecedor</Th>
                <Th>UN</Th>
                <Th>Valor Pago</Th>
              </tr>
            </thead>

            <tbody>
              {solicitacao?.products?.map((item, index) => {
                const supplierId = item.providerIds?.[0];
                const supplierName = supplierNames[supplierId] || "—";

                return (
                  <tr key={index}>
                    <Td>{item.quantity}</Td>
                    <Td>{item.name}</Td>
                    <Td>{supplierName}</Td>
                    <Td>{(item.quantityToStock ?? 0) + (item.quantityToServiceOrder ?? 0)}</Td>
                    <Td>
                      {item.costUnitPrice ? `R$ ${Number(item.costUnitPrice).toFixed(2)}` : "—"}
                    </Td>
                  </tr>
                );
              })}
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

export default ModalSolicitacaoComprada;
