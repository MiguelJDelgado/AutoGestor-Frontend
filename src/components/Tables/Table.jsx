import styled from "styled-components";
import olhoIcon from "../../assets/olho.png";
import editarIcon from "../../assets/editar.png";
import excluirIcon from "../../assets/excluir.png";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const TableHeader = styled.th`
  padding: 10px;
  background: #2f4858;
  color: white;
  text-align: left;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 4px;

  img {
    width: 18px;
    height: 18px;
  }
`;


const Table = ({ columns, data, onView, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <TableHeader key={index}>{col}</TableHeader>
          ))}
          <TableHeader></TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
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
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Table;
