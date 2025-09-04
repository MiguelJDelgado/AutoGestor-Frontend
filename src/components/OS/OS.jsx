import styled from 'styled-components'
import Layout from '../components/Layout/Layout.jsx'

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
  background-color: #ffffff;
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
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
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
    background-color: #fff3cd;
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

function Os() {
  return (
    <Layout>
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
                <Select>
                  <option value="">Todos</option>
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
                  🔍 Filtrar
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
                <tr>
                  <Td>1</Td>
                  <Td>25072101</Td>
                  <Td>Thalisson Misgael</Td>
                  <Td>Ford Fiesta (Gasolina)</Td>
                  <Td>DOW2P22</Td>
                  <Td><StatusBadge className="analise">Analise/Orçamento</StatusBadge></Td>
                  <Td>21/07/2025 09:30<br/><small>Finalizada em 00/00/0000 00:00</small></Td>
                  <Td>R$ 2.685,00</Td>
                  <Td>
                    <ActionButton title="Aprovar">✅</ActionButton>
                    <ActionButton title="Documento">📄</ActionButton>
                    <ActionButton title="Editar">✏️</ActionButton>
                    <ActionButton title="Excluir">🗑️</ActionButton>
                  </Td>
                </tr>
                <tr>
                  <Td>2</Td>
                  <Td>25072201</Td>
                  <Td>Maicol Tanuel</Td>
                  <Td>Ford Focus (Flex)</Td>
                  <Td>ABW3K20</Td>
                  <Td><StatusBadge className="finalizado">Finalizado</StatusBadge></Td>
                  <Td>22/07/2025 10:05<br/><small>Finalizada em 23/07/2025 11:30</small></Td>
                  <Td>R$ 1.405,00</Td>
                  <Td>
                    <ActionButton title="Imprimir">🖨️</ActionButton>
                    <ActionButton title="Visualizar">👁️</ActionButton>
                  </Td>
                </tr>
                <tr>
                  <Td>3</Td>
                  <Td>25072202</Td>
                  <Td>Fikete Jenseniel</Td>
                  <Td>Fiat Palio (Álcool)</Td>
                  <Td>ABC9P20</Td>
                  <Td><StatusBadge className="pendente">Pendente</StatusBadge></Td>
                  <Td>22/07/2025 15:10<br/><small>Finalizada em 00/00/0000 00:00</small></Td>
                  <Td>R$ 805,00</Td>
                  <Td>
                    <ActionButton title="Aprovar">✅</ActionButton>
                    <ActionButton title="Documento">📄</ActionButton>
                    <ActionButton title="Editar">✏️</ActionButton>
                    <ActionButton title="Excluir">🗑️</ActionButton>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </TableSection>
        </MainContent>
      </AppContainer>
    </Layout>
  )
}

export default Os

