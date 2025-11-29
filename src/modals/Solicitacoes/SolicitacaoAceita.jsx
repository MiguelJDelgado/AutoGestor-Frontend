import styled from "styled-components";
import LayoutModal from "../Layout";
import { useState, useEffect } from "react";
import { authorize, updateSolicitacao } from "../../services/SolicitacaoService";
import { getSuppliers } from "../../services/FornecedorService";
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
  width: 90%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TableSelect = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const formatInitialItems = (solicitacao) => {
  const products = solicitacao?.products || [];
  return products.map((p) => ({
    productId: p.productId || p._id || null,
    quantidade: p.quantity ?? 0,
    nome: p.name ?? "",
    fornecedor: (p.providerIds && p.providerIds[0]) || "",
    un: p.unit || "",
    valorPago: p.paidPrice ?? "",
  }));
};

const ModalSolicitacaoAceita = ({ onClose, solicitacao, onStatusUpdated }) => {
  const [status, setStatus] = useState(
    solicitacao?.status?.toLowerCase() || "approved"
  );
  const [itens, setItens] = useState(formatInitialItems(solicitacao));
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const res = await getSuppliers();
        setListaFornecedores(res.data || []);
      } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
      }
    };

    loadSuppliers();
  }, []);

  
  if (!user) return null;

  const role = user.role?.toLowerCase();
  const canEdit = role === "admin" || role === "manager";

  const handleChangeItem = (index, field, value) => {
    const novos = [...itens];
    novos[index] = { ...novos[index], [field]: value };
    setItens(novos);
  };

  const handleSave = async () => {
    if (!canEdit) return; 
    try {
      if (status === "rejected") {
        await authorize(solicitacao._id, false);
        onStatusUpdated?.();
        onClose();
        return;
      }

      if (status === "approved") {
        await authorize(solicitacao._id, true);
        onStatusUpdated?.();
        onClose();
        return;
      }

      if (status === "purchased") {
        for (let i = 0; i < itens.length; i++) {
          const it = itens[i];
          if (!it.fornecedor || !it.un || it.valorPago === "") {
            alert(`Preencha fornecedor, UN e valor pago no item ${i + 1}`);
            return;
          }
        }

        const hasServiceOrder = !!solicitacao.serviceOrderId;
        const updatedProducts = itens.map((it, idx) => {
        const original = solicitacao.products[idx];

          return {
            productId: original.productId,
            name: original.name,
            code: original.code,
            quantity: original.quantity,

            quantityToServiceOrder: hasServiceOrder ? Number(it.quantidade) : 0,
            quantityToStock: hasServiceOrder ? 0 : Number(it.quantidade),

            providerIds: [it.fornecedor],
            costUnitPrice: Number(it.valorPago),
            salePrice: original.salePrice,
            grossProfitMargin: original.grossProfitMargin,
          };
        });

        const payload = {
          status: "purchased",
          products: updatedProducts,
        };

        await updateSolicitacao(solicitacao._id, payload);
        onStatusUpdated?.();
        onClose();
        return;
      }

      onClose();
    } catch (err) {
      console.error("Erro ao salvar solicitação:", err);
      alert(err?.message || "Erro ao atualizar solicitação");
    }
  };

  return (
    <LayoutModal
      title="Editar Solicitação"
      onClose={onClose}
      onSave={handleSave}
      hideSaveButton={!canEdit}
    >
      <Container>
        
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input
              type="text"
              value={solicitacao?.userName || solicitacao?.userId?.name || "—"}
              readOnly
            />
          </Field>

          <Field>
            <Label>Status</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!canEdit}
            >
              <option value="approved">Autorizada</option>
              <option value="purchased">Comprada</option>
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
                <Th>Itens solicitados</Th>
                <Th>Fornecedor</Th>
                <Th>UN</Th>
                <Th>Valor Pago</Th>
              </tr>
            </thead>

            <tbody>
              {itens.map((item, index) => (
                <tr key={index}>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.nome}</Td>

                  <Td>
                    <TableSelect
                      value={item.fornecedor || ""}
                      onChange={(e) => handleChangeItem(index, "fornecedor", e.target.value)}
                      disabled={!canEdit}
                    >
                      <option value="">Selecione</option>

                      {listaFornecedores.map((f) => (
                        <option key={f._id} value={f._id}>
                          {f.name}
                        </option>
                      ))}
                    </TableSelect>
                  </Td>

                  <Td>
                    <TableInput
                      type="text"
                      value={item.un || ""}
                      onChange={(e) => handleChangeItem(index, "un", e.target.value)}
                      disabled={!canEdit}
                    />
                  </Td>

                  <Td>
                    <TableInput
                      type="number"
                      step="0.01"
                      value={item.valorPago || ""}
                      onChange={(e) => handleChangeItem(index, "valorPago", e.target.value)}
                      disabled={!canEdit}
                    />
                  </Td>
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

export default ModalSolicitacaoAceita;
