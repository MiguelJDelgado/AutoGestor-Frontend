import styled from "styled-components";
import LayoutModal from "../Layout";
import { useEffect, useState } from "react";
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

const ModalSolicitacaoFinalizada = ({ onClose, solicitacao }) => {
  const [supplierNames, setSupplierNames] = useState({});

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

  return (
    <LayoutModal
      title="Solicitação Finalizada"
      onClose={onClose}
      hideSaveButton
    >
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <ReadonlyInput
              type="text"
              value={solicitacao?.userName || solicitacao?.userId?.name || "—"}
              readOnly
            />
          </Field>

          <Field>
            <Label>Status</Label>
            <ReadonlySelect value="delivered" disabled>
              <option value="delivered">Finalizada</option>
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
                <Th>Fornecedor</Th>
                <Th>UN</Th>
                <Th>Valor Pago</Th>
              </tr>
            </thead>

            <tbody>
              {solicitacao?.products?.map((p, index) => {
                const supplierId = p.providerIds?.[0];
                const supplierName = supplierNames[supplierId] || "Carregando...";

                return (
                  <tr key={index}>
                    <Td>{p.quantity}</Td>
                    <Td>{p.name}</Td>
                    <Td>{supplierName}</Td>
                    <Td>{p.quantityToStock + p.quantityToServiceOrder}</Td>
                    <Td>
                      {p.costUnitPrice
                        ? `R$ ${Number(p.costUnitPrice).toFixed(2)}`
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
          <TextArea
            readOnly
            value={solicitacao?.observation || solicitacao?.notes || ""}
          />
        </div>
      </Container>
    </LayoutModal>
  );
};

export default ModalSolicitacaoFinalizada;
