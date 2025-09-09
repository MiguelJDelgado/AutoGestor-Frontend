import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0f2f43;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #0f2f43;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  background: #e4eaef;
  font-size: 14px;
  color: #0f2f43;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #6b7a86;
  }
`;

const Select = styled.select`
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  background: #e4eaef;
  font-size: 14px;
  color: #0f2f43;
  width: 100%;
  box-sizing: border-box;
`;

const DescriptionSection = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
`;

const DescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #0f2f43;
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #d5dde3;
  border-radius: 6px;
  background: #e4eaef;
  font-size: 14px;
  color: #0f2f43;
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    color: #6b7a86;
  }
`;

function CriarOS() {
  return (
    <Container>
      <Title>Nova Ordem de Serviço</Title>

      {/* DADOS */}
      <Section>
        <SectionHeader>📄 Dados</SectionHeader>
        <FormGrid>
          <div>
            <Label>Número da O.S</Label>
            <Input placeholder="Digite o número" />
          </div>
          <div>
            <Label>Status</Label>
            <Select>
              <option>Orçamento</option>
              <option>Aprovado</option>
              <option>Em execução</option>
              <option>Finalizado</option>
            </Select>
          </div>
          <div>
            <Label>Entrada do veículo</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Previsão de entrega</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Colaborador</Label>
            <Input placeholder="Digite o colaborador" />
          </div>
        </FormGrid>
      </Section>

      {/* CLIENTE */}
      <Section>
        <SectionHeader>👤 Cliente</SectionHeader>
        <FormGrid>
          <div>
            <Label>Nome</Label>
            <Input placeholder="Nome do cliente" />
          </div>
          <div>
            <Label>CPF/CNPJ</Label>
            <Input placeholder="000.000.000-00" />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input placeholder="(00) 00000-0000" />
          </div>
          <div>
            <Label>Email</Label>
            <Input placeholder="exemplo@email.com" />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input placeholder="Rua/Avenida" />
          </div>
          <div>
            <Label>Número</Label>
            <Input placeholder="Nº" />
          </div>
          <div>
            <Label>Município</Label>
            <Input placeholder="Cidade" />
          </div>
        </FormGrid>
      </Section>

      {/* VEÍCULO */}
      <Section>
        <SectionHeader>🚗 Dados do veículo</SectionHeader>
        <FormGrid>
          <div>
            <Label>Marca</Label>
            <Input placeholder="Marca" />
          </div>
          <div>
            <Label>Modelo</Label>
            <Input placeholder="Modelo" />
          </div>
          <div>
            <Label>Placa</Label>
            <Input placeholder="XXX-0000" />
          </div>
          <div>
            <Label>Ano</Label>
            <Input placeholder="Ano do veículo" />
          </div>
          <div>
            <Label>Cor</Label>
            <Input placeholder="Cor do veículo" />
          </div>
          <div>
            <Label>Quilometragem</Label>
            <Input placeholder="KM rodados" />
          </div>
        </FormGrid>
      </Section>

      {/* PRODUTOS */}
      <Section>
        <SectionHeader>🛠️ Produtos</SectionHeader>
        <FormGrid>
          <div>
            <Label>Nome do Produto</Label>
            <Input placeholder="Digite o nome" />
          </div>
          <div>
            <Label>Quantidade</Label>
            <Input type="number" placeholder="Ex.: 1" />
          </div>
          <div>
            <Label>Valor Unitário</Label>
            <Input type="text" placeholder="Ex.: R$ 100,00" />
          </div>
          <div>
            <Label>Código</Label>
            <Input placeholder="Digite o código" />
          </div>
        </FormGrid>
      </Section>

      {/* SOLICITAÇÃO DO CLIENTE */}
      <DescriptionSection>
        <DescriptionHeader>📩 Solicitação do cliente</DescriptionHeader>
        <Label>Descrição do problema relatado</Label>
        <DescriptionInput placeholder="Descreva o problema relatado..." />
      </DescriptionSection>

      {/* ANÁLISE INICIAL / DIAGNÓSTICO */}
      <DescriptionSection>
        <DescriptionHeader>🔍 Análise Inicial / Diagnóstico</DescriptionHeader>
        <Label>Descrição do diagnóstico</Label>
        <DescriptionInput placeholder="Descreva o diagnóstico..." />
      </DescriptionSection>
    </Container>
  );
}

export default CriarOS;