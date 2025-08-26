import styled from 'styled-components';

const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  background: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
  padding: 12px 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Company = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const CompanyName = styled.strong`
  font-size: 18px;
  color: #0b2239;
`;

const CompanyDoc = styled.span`
  font-size: 13px;
  color: #6c7a89;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

function TopHeader({
  companyName = 'EMPRESA OFICINA MECÂNICA',
  cnpj = '12.345.678/0001-05',
  right = null, // ex: botão/menu se quiser
}) {
  return (
    <Wrap>
      <Row>
        <Company>
          <CompanyName>{companyName}</CompanyName>
          <CompanyDoc>CNPJ: {cnpj}</CompanyDoc>
        </Company>
        <RightActions>{right}</RightActions>
      </Row>
    </Wrap>
  );
}

export default TopHeader;
