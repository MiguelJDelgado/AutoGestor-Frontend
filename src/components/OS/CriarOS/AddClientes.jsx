import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClienteIcon from "./icons/ClienteOS.png";
import { getAllClients } from '../../../services/ClienteService';

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const Icon = styled.img`
  width: 20px;
  height: 25px;
  vertical-align: middle;
  margin-right: 5px;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2b3e50;
  margin-bottom: 12px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #0f2f43;
  font-size: 13px;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 1px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background: #f3f6f9;
  color: #0f2f43;
  font-size: 14px;

  &:disabled {
    background: #f0f2f5;
    color: #8a8a8a;
    cursor: not-allowed;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  color: #0f2f43;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f3f6f9;
  }
`;


const ClienteOS = ({ clientId, setClientId }) => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    endereco: "",
    numero: "",
    municipio: "",
    uf: "",
  });

  // Buscar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await getAllClients();
        setClientes(res);
        setFilteredClientes(res);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
      }
    };
    fetchClientes();
  }, []);

  // Filtrar clientes conforme busca
  useEffect(() => {
    const termo = busca.toLowerCase();
    const filtrados = clientes.filter((c) =>
      c.name.toLowerCase().includes(termo)
    );
    setFilteredClientes(filtrados);
  }, [busca, clientes]);

  // Quando cliente é selecionado
  const handleSelectCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setClientId(cliente._id); // 🔹 Envia ID para o CriarOS
    setBusca(cliente.name);

    setDadosCliente({
      nome: cliente.name || "",
      cpfCnpj: cliente.cpf || cliente.cnpj || "",
      telefone: cliente.cellphone || "",
      email: cliente.email || "",
      endereco: cliente.address || "",
      numero: cliente.number || "",
      municipio: cliente.city || "",
      uf: cliente.state || "",
    });
  };

  return (
    <Section>
      <SectionHeader>
        <Icon src={ClienteIcon} alt="Cliente" />
        Cliente
      </SectionHeader>

      <FormGrid>
        <Field style={{ position: "relative" }}>
          <Label>Nome / Razão Social</Label>
          <Input
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setClienteSelecionado(null);
            }}
            placeholder="Digite para buscar..."
            autoComplete="off"
          />

          {busca && !clienteSelecionado && filteredClientes.length > 0 && (
            <Dropdown>
              {filteredClientes.slice(0, 8).map((cliente) => (
                <DropdownItem
                  key={cliente._id}
                  onClick={() => handleSelectCliente(cliente)}
                >
                  {cliente.name}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </Field>

        <Field>
          <Label>CPF / CNPJ</Label>
          <Input value={dadosCliente.cpfCnpj} disabled />
        </Field>
        <Field>
          <Label>Telefone</Label>
          <Input value={dadosCliente.telefone} disabled />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input value={dadosCliente.email} disabled />
        </Field>
        <Field>
          <Label>Endereço</Label>
          <Input value={dadosCliente.endereco} disabled />
        </Field>
        <Field>
          <Label>Número</Label>
          <Input value={dadosCliente.numero} disabled />
        </Field>
        <Field>
          <Label>Município</Label>
          <Input value={dadosCliente.municipio} disabled />
        </Field>
        <Field>
          <Label>UF</Label>
          <Input value={dadosCliente.uf} disabled />
        </Field>
      </FormGrid>
    </Section>
  );
};

export default ClienteOS;