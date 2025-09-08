import styled from 'styled-components'
import editarIcon from '../../assets/editar.png'
import excluirIcon from '../../assets/excluir.png'
import olhoIcon from '../../assets/olho.png'
import aprovarIcon from '../../assets/aprovar.png'
import imprimirIcon from '../../assets/imprimir.png'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0 20px 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
`

const Header = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`

const NewOrderButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`

const MainContent = styled.div`
  background-color:rgb(253, 253, 253);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  padding: 20px;
`

const SearchSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
`

const SearchTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0 0 20px 0;
`

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: end;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  font-weight: 500;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }

  &.status-select {
    background-color:#333;
    color: #ffffff;
    border-color: #1f2937;
  }
`

const FilterButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #0056b3;
  }
`

const TableSection = styled.div`
  padding: 20px;
`

const TableTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0 0 20px 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`

const Th = styled.th`
  background-color:#7f929d;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  color:rgb(255, 255, 255);
  font-weight: 600;
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  color: #333;
`

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  
  &.analise {
    background-color:rgb(224, 187, 64);
    color: #856404;
  }
  
  &.finalizado {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.pendente {
    background-color: #f8d7da;
    color: #721c24;
  }
`

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`

const ActionIcon = styled.span`
  font-size: 16px;
  color: #6c757d;
`

const IconImage = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
`

function Os({
  orders = [],
  onApprove = () => {},
  onPrint = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {}
}) {
  const formatCurrencyBRL = (value) => {
    if (value === null || value === undefined) return ''
    try {
      const numeric = typeof value === 'number' ? value : Number(value)
      if (Number.isNaN(numeric)) return String(value)
      return numeric.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    } catch {
      return String(value)
    }
  }

  const formatDateTimeBR = (value) => {
    if (!value) return ''
    try {
      const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value
      if (Number.isNaN(date.getTime())) return String(value)
      const datePart = date.toLocaleDateString('pt-BR')
      const timePart = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      return `${datePart} ${timePart}`
    } catch {
      return String(value)
    }
  }

  return (
      <AppContainer>
        <Header>
              <Title>Ordem de Serviço</Title>
            <NewOrderButton>+ Nova ordem de serviço</NewOrderButton>
        </Header>

        <MainContent>
          
          <SearchSection>
            <SearchTitle>Buscar</SearchTitle>
            <SearchForm>
              <FormGroup>
                <Label>Cliente</Label>
                <Input type="text" placeholder="Nome do cliente" />
              </FormGroup>
              
              <FormGroup>
                <Label>Código</Label>
                <Input type="text" placeholder="Código" />
              </FormGroup>
              
              <FormGroup>
                <Label>O.S</Label>
                <Input type="text" placeholder="Número da OS" />
              </FormGroup>
              
              <FormGroup>
                <Label>Data</Label>
                <Input type="date" />
              </FormGroup>
              
              <FormGroup>
                <Label>Status</Label>
                <Select className="status-select">
                  <option value="analise">Análise/Orçamento</option>
                  <option value="pendente">Pendente</option>
                  <option value="finalizado">Finalizado</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Valor</Label>
                <Input type="number" placeholder="Valor" />
              </FormGroup>
              
              <FormGroup>
                <FilterButton>
                  Filtrar
                </FilterButton>
              </FormGroup>
            </SearchForm>
          </SearchSection>

          <TableSection>
            <TableTitle>Ordens de Serviço</TableTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Código</Th>
                  <Th>O.S</Th>
                  <Th>Cliente</Th>
                  <Th>Veículo</Th>
                  <Th>Placa</Th>
                  <Th>Status</Th>
                  <Th>Data</Th>
                  <Th>Valor</Th>
                  <Th>Ações</Th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id ?? order.codigo ?? order.osNumero}>
                    <Td>{order.codigo}</Td>
                    <Td>{order.osNumero}</Td>
                    <Td>{order.clienteNome}</Td>
                    <Td>{order.veiculoDescricao}</Td>
                    <Td>{order.placa}</Td>
                    <Td>
                      <StatusBadge className={order.status}>
                        {order.statusLabel ?? order.status}
                      </StatusBadge>
                    </Td>
                    <Td>
                      {formatDateTimeBR(order.dataCriacao)}
                      <br/>
                      <small>
                        {order.dataFinalizacao
                          ? `Finalizada em ${formatDateTimeBR(order.dataFinalizacao)}`
                          : 'Finalizada em 00/00/0000 00:00'}
                      </small>
                    </Td>
                    <Td>{formatCurrencyBRL(order.valor)}</Td>
                    <Td>
                      {order.status !== 'finalizado' && (
                        <ActionButton title="Aprovar" onClick={() => onApprove(order)}>
                          <IconImage src={aprovarIcon} alt="Aprovar" />
                        </ActionButton>
                      )}
                      <ActionButton title="Imprimir" onClick={() => onPrint(order)}>
                        <IconImage src={imprimirIcon} alt="Imprimir" />
                      </ActionButton>
                      <ActionButton title="Editar" onClick={() => onEdit(order)}>
                        <IconImage src={editarIcon} alt="Editar" />
                      </ActionButton>
                      <ActionButton title="Excluir" onClick={() => onDelete(order)}>
                        <IconImage src={excluirIcon} alt="Excluir" />
                      </ActionButton>
                      <ActionButton title="Visualizar" onClick={() => onView(order)}>
                        <IconImage src={olhoIcon} alt="Visualizar" />
                      </ActionButton>
                    </Td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <Td colSpan="9">Nenhuma ordem encontrada.</Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableSection>
        </MainContent>
      </AppContainer>
  )
}

export default Os

