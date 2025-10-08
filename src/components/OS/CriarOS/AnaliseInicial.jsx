import styled from 'styled-components';
import AnaliseIcon from "./icons/DiagnosticoOS.png";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
`;

const Icon = styled.img`
  width: 25px;
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

const AnaliseInicial = ({ value, onChange }) => {
  return (
    <Section>
      <SectionHeader>
        <Icon src={AnaliseIcon} alt="Análise Inicial / Diagnóstico" />
        Análise Inicial / Diagnóstico
      </SectionHeader>
      <TextArea
        placeholder="Descrição do diagnóstico"
        value={value}
        onChange={onChange}
      />
    </Section>
  );
};

export default AnaliseInicial;
