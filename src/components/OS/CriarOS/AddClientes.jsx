import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClienteIcon from "./icons/ClienteOS.png";

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

const ClienteOS = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [clientes, setClientes] = useState([]);
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    cpfCnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    municipio: '',
    uf: '',
  });

  useEffect(() => {
    setClientes([
      { id: 1, nome: 'João da Silva', cpfCnpj: '123.456.789-00', telefone: '(15) 99999-9999', email: 'joao@email.com', endereco: 'Rua das Flores', numero: '123', municipio: 'Sorocaba', uf: 'SP' },
      { id: 2, nome: 'Empresa XPTO LTDA', cpfCnpj: '12.345.678/0001-90', telefone: '(11) 4002-8922', email: 'contato@xpto.com.br', endereco: 'Av. Central', numero: '500', municipio: 'São Paulo', uf: 'SP' },
    ]);
  }, []);

  const handleClienteChange = (e) => {
    const nomeSelecionado = e.target.value;
    setClienteSelecionado(nomeSelecionado);

    const clienteEncontrado = clientes.find((c) => c.nome.toLowerCase() === nomeSelecionado.toLowerCase());
    if (clienteEncontrado) {
      setDadosCliente({ ...clienteEncontrado });
    } else {
      setDadosCliente({ nome: '', cpfCnpj: '', telefone: '', email: '', endereco: '', numero: '', municipio: '', uf: '' });
    }
  };

  return (
    <Section>
      <SectionHeader>
        <Icon src={ClienteIcon} alt="Cliente" />
        Cliente
      </SectionHeader>

      <FormGrid>
        <Field>
          <Label>Nome / Razão Social</Label>
          <Input 
            list="clientesList" 
            value={clienteSelecionado} 
            onChange={handleClienteChange} 
            placeholder="Digite para buscar..."
          />
          <datalist id="clientesList">
            {clientes.map(c => (
              <option key={c.id} value={c.nome} />
            ))}
          </datalist>
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
