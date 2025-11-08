import { useState } from "react";
import styled from "styled-components";
import NovaOSIcon from "./icons/NovaOS.png";

import ServicosSection from "./AddServicos";
import ProdutosSection from "./AddProdutos";
import DadosOSSection from "./DadosOS";
import VeiculosSection from "./AddVeiculos";
import SolicitacaoCliente from "./SolicitacaoCliente";
import AnaliseInicial from "./AnaliseInicial";
import DescontoTotal from "./DescontoTotal";
import ObservacaoOS from "./ObservacaoOS";
import CustoTotal from "./CustoTotal";
import { createServiceOrder } from "../../../services/OrdemServicoService";
import ClienteOS from "./AddClientes";

const Container = styled.div`
  background: #7f929d;
  border-radius: 8px;
  padding: 16px;
  font-family: "Segoe UI", sans-serif;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #ffffffff;
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
  // 🔹 Estados principais
  const [dadosOS, setDadosOS] = useState({
    description: "",
    technicalAnalysis: "",
    status: "budget",
    descriptionClient: "",
    notes: "",
    entryDate: "",
    deadline: "",
    paymentType: "",
    paid: false,
  });

  const [clientId, setClientId] = useState(null);
  const [veiculo, setVeiculo] = useState({});
  const [servicos, setServicos] = useState([{ colaboradores: [] }]);
  const [products, setProducts] = useState([]);
  const [observacao, setObservacao] = useState("");
  const [descontoData, setDescontoData] = useState({
    tipo: "percent",
    valor: 0,
    subtotal: 0,
    total: 0,
  });

  // 🔹 Função principal de salvar
  const handleSave = async () => {
    try {
      const payload = {
        clientId: clientId,
        vehicleId: veiculo._id,
        description: dadosOS.description,
        technicalAnalysis: dadosOS.technicalAnalysis,
        status: dadosOS.status,
        descriptionClient: dadosOS.descriptionClient,
        notes: dadosOS.notes,
        entryDate: dadosOS.entryDate,
        deadline: dadosOS.deadline,
        paymentType: dadosOS.paymentType,
        paid: dadosOS.paid,
        discountType: descontoData.tipo,
        discountValue: descontoData.valor,

        // 🔸 Monta os serviços no formato que o backend espera
        services: servicos.map((s) => ({
          serviceId: s.serviceId,
          title: s.title,
          description: s.description || "",
          quantity: s.quantidade || 1,
          workHours: s.workHours || 0,
          hourValue: s.hourValue || 0,
          totalValue: s.totalValue || 0,
          mechanicIds: s.colaboradores || [],
        })),

        // 🔸 Monta os produtos no formato esperado
        products: products.map((p) => ({
          productId: p.productId,
          code: p.code,
          name: p.name,
          quantity: p.quantity,
          costUnitPrice: p.costUnitPrice,
          salePrice: p.salePrice,
          grossProfitMargin: p.grossProfitMargin,
          providerIds: p.providerIds || [],
        })),
      };

      console.log("📦 Payload final para o backend:", payload);

      const res = await createServiceOrder(payload);

      alert("✅ Ordem de serviço criada com sucesso!");
      console.log("Resposta do backend:", res);
    } catch (error) {
      console.error("❌ Erro ao criar OS:", error);
      alert("Erro ao criar ordem de serviço: " + error.message);
    }
  };

  return (
    <Container>
      <Title>
        <Icon src={NovaOSIcon} alt="Nova OS" />
        Nova Ordem de Serviço
      </Title>

      <DadosOSSection dadosOS={dadosOS} setDadosOS={setDadosOS} />
      <ClienteOS clientId={clientId} setClientId={setClientId} />
      <VeiculosSection veiculo={veiculo} setVeiculo={setVeiculo} />
      <ServicosSection servicos={servicos} setServicos={setServicos} />
      <ProdutosSection products={products} setProducts={setProducts} />
      <SolicitacaoCliente
        value={dadosOS.descriptionClient}
        onChange={(e) =>
          setDadosOS({ ...dadosOS, descriptionClient: e.target.value })
        }
      />

      <AnaliseInicial
        value={dadosOS.technicalAnalysis}
        onChange={(value) => setDadosOS({ ...dadosOS, technicalAnalysis: value })}
      />
      <DescontoTotal
        value={descontoData}
        onChange={(novo) => setDescontoData(novo)}
      />

      <CustoTotal servicos={servicos} products={products} descontoData={descontoData} />
      <ObservacaoOS observacao={observacao} setObservacao={setObservacao} />

      <ButtonsWrapper>
        <SaveButton onClick={handleSave}>SALVAR</SaveButton>
        <SaveExitButton>SALVAR E SAIR</SaveExitButton>
      </ButtonsWrapper>
    </Container>
  );
}

export default CriarOS;