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

const ModalSolicitacaoAceita = ({ onClose, solicitacao, fornecedores }) => {
  const [status, setStatus] = useState(solicitacao?.status || "Aceita");
  const [itens, setItens] = useState(solicitacao?.itens || []);

  const handleChangeItem = (index, field, value) => {
    const novosItens = [...itens];
    novosItens[index][field] = value;
    setItens(novosItens);
  };

  const handleSave = () => {
    if (status === "Finalizada") {
      for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        if (!item.fornecedor || !item.un || !item.valorPago) {
          alert(
            `Preencha todos os campos obrigatórios antes de finalizar a solicitação. (Linha ${i + 1})`
          );
          return;
        }
      }
    }

    const dadosAtualizados = { ...solicitacao, status, itens };
    console.log("Solicitação salva:", dadosAtualizados);
    onClose();
  };

  return (
    <LayoutModal title="Editar Solicitação" onClose={onClose} onSave={handleSave}>
      <Container>
        <Row>
          <Field>
            <Label>Solicitante</Label>
            <Input type="text" value={solicitacao?.solicitante || ""} readOnly />
          </Field>
          <Field>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Aceita">Aceita</option>
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
              {itens.map((item, index) => (
                <tr key={index}>
                  <Td>{item.quantidade}</Td>
                  <Td>{item.nome}</Td>

                  <Td>
                    <TableSelect
                      value={item.fornecedor || ""}
                      onChange={(e) =>
                        handleChangeItem(index, "fornecedor", e.target.value)
                      }
                    >
                      <option value="">Selecione</option>
                      {fornecedores?.map((f, i) => (
                        <option key={i} value={f.id}>
                          {f.nome}
                        </option>
                      ))}
                    </TableSelect>
                  </Td>

                  {/* UN */}
                  <Td>
                    <TableInput
                      type="text"
                      value={item.un || ""}
                      placeholder="Unidade"
                      onChange={(e) =>
                        handleChangeItem(index, "un", e.target.value)
                      }
                    />
                  </Td>

                  <Td>
                    <TableInput
                      type="number"
                      step="0.01"
                      value={item.valorPago || ""}
                      placeholder="0,00"
                      onChange={(e) =>
                        handleChangeItem(index, "valorPago", e.target.value)
                      }
                    />
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

export default ModalSolicitacaoAceita;
