import { useState } from "react";
import styled from "styled-components";
import NovaOSIcon from "./icons/NovaOS.png";

import ServicosSection from "./AddServicos";
import ProdutosSection from "./AddProdutos";
import DadosOSSection from "./DadosOS";
import SolicitacaoCliente from "./SolicitacaoCliente";
import AnaliseInicial from "./AnaliseInicial";
import DescontoTotal from "./DescontoTotal";
import ObservacaoOS from "./ObservacaoOS";
import CustoTotal from "./ValoresTotais";
import { createServiceOrder } from "../../../services/OrdemServicoService";
import ClienteOS from "./AddClientes";
import VeiculoOS from "./AddVeiculos";

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
  const statusMap = {
    analise: "request",
    pendente: "budget",
    emprogresso: "in_progress",
    "pendente-produto": "pending_product",
    cancelado: "canceled",
    concluido: "completed",
  };

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

const [custoTotal, setCustoTotal] = useState({
  valorProdutos: "",
  valorServicos: "",
  valorTotal: "",
  totalComDesconto: "",
});


  const [clientId, setClientId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
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
        vehicleId: vehicleId,
        technicalAnalysis: dadosOS.technicalAnalysis,
        status: statusMap[dadosOS.status] || "request",
        descriptionClient: dadosOS.descriptionClient,
        notes: observacao,
        entryDate: dadosOS.entryDate,
        deadline: dadosOS.deadline,
        paymentType: dadosOS.paymentType,
        paid: dadosOS.paid,
        discountType: descontoData.tipo,
        discountValue: descontoData.valor,

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

        products: products.map((p) => ({
          productId: p.productId,
          code: p.code,
          name: p.name,
          quantity: p.quantity,
          costUnitPrice: p.costUnitPrice,
          salePrice: p.salePrice,
          totalValue: p.totalValue || 0,
          grossProfitMargin: p.grossProfitMargin,
          providerIds: p.providerIds || [],
        })),
      };

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
      <VeiculoOS vehicleId={vehicleId} setVehicleId={setVehicleId} />
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

      <CustoTotal
        value={custoTotal}
        onChange={setCustoTotal}
        products={products}
        services={servicos}
        descontoData={descontoData}
      />

      <ObservacaoOS value={observacao} onChange={setObservacao} />

      <ButtonsWrapper>
        <SaveButton onClick={handleSave}>SALVAR</SaveButton>
        <SaveExitButton>SALVAR E SAIR</SaveExitButton>
      </ButtonsWrapper>
    </Container>
  );
}

export default CriarOS;