import styled from 'styled-components';

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2b3e50;
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background: #f3f6f9;
  font-size: 14px;
  color: #0f2f43;
  resize: vertical;
`;

const SolicitacaoCliente = ({ value, onChange }) => {
  return (
    <Section>
      <SectionHeader>📋 Solicitação do Cliente</SectionHeader>
      <TextArea
        placeholder="Descrição do problema relatado"
        value={value}
        onChange={onChange}
      />
    </Section>
  );
};

export default SolicitacaoCliente;
