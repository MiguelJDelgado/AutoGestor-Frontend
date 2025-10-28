import styled from "styled-components";
import olhoIcon from "../../assets/olho.png";
import excluirIcon from "../../assets/excluir.png";
import editarIcon from "../../assets/editar.png";
import pesquisarIcon from "../../assets/pesquisa.png";

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  overflow: hidden;
`;

const SearchSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ControlsRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Select = styled.select`
  height: 36px;
  padding: 0 36px 0 12px;
  border-radius: 6px;
  background-color: #00273d;
  color: #fff;
  font-size: 14px;
  width: 100%;
`;

const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  background: #dee3e6;
  font-size: 14px;
  color: #0f2f43;
  width: 98%;
`;

const SearchButton = styled.button`
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #dee3e6;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: #cfd4d7;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TableContainer = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHeader = styled.th`
  background-color: #7f929d;
  color: #fff;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  color: #333;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 4px;
  padding: 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f8f9fa;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const DefaultActions = ({ row, onView, onEdit, onDelete }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
    <IconButton title="Visualizar" onClick={() => onView?.(row)}>
      <img src={olhoIcon} alt="Visualizar" />
    </IconButton>

    <IconButton title="Editar" onClick={() => onEdit?.(row)}>
      <img src={editarIcon} alt="Editar" />
    </IconButton>

    <IconButton title="Excluir" onClick={() => onDelete?.(row)}>
      <img src={excluirIcon} alt="Excluir" />
    </IconButton>
  </div>
);

const DataTable = ({
  columns,
  data,
  searchOptions,
  onSearch,
  renderActions,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Container>
      <SearchSection>
        <Label>Buscar</Label>
        <ControlsRow>
          <Select>
            {searchOptions?.map((col, i) => (
              <option key={i}>{col}</option>
            ))}
          </Select>
          <Input placeholder="Digite para buscar..." />
          <SearchButton onClick={onSearch}>
            <img src={pesquisarIcon} alt="Pesquisar" />
          </SearchButton>
        </ControlsRow>
      </SearchSection>

      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <TableHeader key={i}>{col}</TableHeader>
              ))}
              <TableHeader style={{ textAlign: "center", width: "150px" }}>
                Ações
              </TableHeader>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>{row[col] ?? "—"}</TableCell>
                  ))}
                  <TableCell style={{ textAlign: "center" }}>
                    {/* Se o usuário quiser sobrescrever as ações, ele pode passar renderActions */}
                    {renderActions ? (
                      renderActions(row)
                    ) : (
                      <DefaultActions
                        row={row}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center" }}
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </TableContainer>
      </TableWrapper>
    </Container>
  );
};

export default DataTable;
