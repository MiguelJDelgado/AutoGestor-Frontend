import styled from "styled-components";
import olhoIcon from "../../assets/olho.png";
import editarIcon from "../../assets/editar.png";
import excluirIcon from "../../assets/excluir.png";

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  background-color: #0f2f43;
  font-size: 14px;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-sxize: 18px;
  width: 100%;
`;

const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  background: #e4eaef;
  font-size: 14px;
  color: #0f2f43;
  width: 95%;

  &::placeholder {
    color: #6b7a86;
  }
`;

const SearchButton = styled.button`
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e9eff3;
  color: #0f2f43;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background:rgb(13, 158, 255);
    border-color: #c7d2da;
  }
`;

const TableContainer = styled.table`
  width: 100%;
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

  &:hover {
    background-color: #f8f9fa;
  }

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
`;

const DataTableWithSearch = ({ 
  columns, 
  data, 
  searchOptions = ["Data", "Descrição", "Estoque", "Fornecedor", "Valor.Unit"], 
  onSearch, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Container>
      <SearchSection>
        <Label>Buscar</Label>
        <ControlsRow>
          <Select>
            {searchOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
          <Input type="text" placeholder="Digite para buscar..." />
          <SearchButton onClick={onSearch}>🔍</SearchButton>
        </ControlsRow>
      </SearchSection>

      <TableContainer>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <TableHeader key={index}>{col}</TableHeader>
            ))}
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>{row[col]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => onView(row)}>
                    <img src={olhoIcon} alt="Ver" />
                  </IconButton>
                  <IconButton onClick={() => onEdit(row)}>
                    <img src={editarIcon} alt="Editar" />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row)}>
                    <img src={excluirIcon} alt="Excluir" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </TableContainer>
    </Container>
  );
};

export default DataTableWithSearch;
