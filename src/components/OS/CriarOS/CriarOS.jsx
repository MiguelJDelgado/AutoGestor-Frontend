import { useState } from "react";
import styled from "styled-components";

import ServicosSection from "./AddServicos";
import ProdutosSection from "./AddProdutos";
import DadosOSSection from "./DadosOS";
import ClientesSection from "./AddClientes";
import VeiculosSection from "./AddVeiculos";
import SolicitacaoCliente from "./SolicitacaoCliente";
import AnaliseInicial from "./AnaliseInicial";
import DescontoTotal from "./DescontoTotal";
import ObservacaoOS from "./ObservacaoOS";

const Container = styled.div`
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #2b3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
`;

const SaveButton = styled.button`
  background: #00c853;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  padding: 15px 0;
  cursor: pointer;
  font-size: 14px;
  width: 500px; /* largura maior */

  &:hover {
    background: #00b248;
  }
`;

const SaveExitButton = styled.button`
  background: #2979ff;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  width: 500px;

  &:hover {
    background: #1565c0;
  }
`;


function CriarOS() {
  const [descontoData, setDescontoData] = useState({
    tipo: "%",
    valor: 0,
    subtotal: 0,
    total: 0,
  });

  return (
    <Container>
      <Title>➕ Nova Ordem de Serviço</Title>

      <DadosOSSection />
      <ClientesSection />
      <VeiculosSection />
      <SolicitacaoCliente />
      <AnaliseInicial />
      <ServicosSection />
      <ProdutosSection />
      <DescontoTotal descontoData={descontoData} setDescontoData={setDescontoData} />
      <ObservacaoOS />

      <ButtonsWrapper>
        <SaveButton>SALVAR</SaveButton>
        <SaveExitButton>SALVAR E SAIR</SaveExitButton>
      </ButtonsWrapper>
    </Container>
  );
}

export default CriarOS;
