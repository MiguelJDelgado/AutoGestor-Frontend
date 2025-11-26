import styled from "styled-components";
import LayoutModal from "../Layout";
import { useState, useEffect } from "react";
import { authorize } from "../../services/SolicitacaoService";
import { updateSolicitacao } from "../../services/SolicitacaoService";
import { getSupplierById } from "../../services/FornecedorService";

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
          results[id] = supplier.name;
        } catch {
          results[id] = "—";
        }
      }

      setSupplierNames(results);
    };

    loadSuppliers();
  }, [solicitacao]);

  const handleSave = async () => {
    try {
      if (status === "rejected") {
        await authorize(solicitacao._id, { approved: false });
      } else if (status === "delivered") {
        await updateSolicitacao(solicitacao._id, { status: "delivered" });
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar status!");
    }
  };

  return (
    <LayoutModal title="Solicitação Comprada" onClose={onClose} onSave={handleSave}>
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.userName || ""} readOnly />
          </Field>

          <Field>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
              value={new Date(solicitacao?.requestDate).toLocaleDateString()}
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
                const supplierName = supplierNames[supplierId] || "Carregando...";

                return (
                  <tr key={index}>
                    <Td>{item.quantity}</Td>
                    <Td>{item.name}</Td>
                    <Td>{supplierName}</Td>
                    <Td>{item.quantityToStock + item.quantityToServiceOrder}</Td>
                    <Td>
                      {item.costUnitPrice
                        ? `R$ ${Number(item.costUnitPrice).toFixed(2)}`
                        : "—"}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>


        <div>
          <Label>Observação</Label>
          <TextArea readOnly value={solicitacao?.notes || ""} />
        </div>
      </Container>
    </LayoutModal>
  );
};

export default ModalSolicitacaoComprada;
