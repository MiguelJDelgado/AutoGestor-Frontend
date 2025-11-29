import { useState, useEffect } from "react";
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

import { useLocation } from "react-router-dom";
import {
  createServiceOrder,
  updateServiceOrder,
  getServiceOrderById,
} from "../../../services/OrdemServicoService";

import ClienteOS from "./AddClientes";
import VeiculoOS from "./AddVeiculos";
import PagamentosOS from "./Pagamentos";

import ModalSucesso from "../../../modals/Sucesso/SucessoModal";
import ModalErro from "../../../modals/Erro/ErroModal";
import { getAllMechanics } from "../../../services/MecanicoService";

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
  width: 500px;
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
`;

function CriarOS() {
  const location = useLocation();

  const editingMode = location?.state?.mode === "edit";
  const viewingMode = location?.state?.mode === "view";
  const orderIdFromLocation = location?.state?.orderId || null;

  const isCreateLock = !editingMode && !viewingMode;
  const isViewLock = viewingMode;

  const [mechanics, setMechanics] = useState([]);

  const pageTitle = viewingMode
    ? "Visualizar Ordem de Serviço"
    : editingMode
    ? "Editar Ordem de Serviço"
    : "Nova Ordem de Serviço";

  const [modalSuccess, setModalSuccess] = useState({ open: false, message: "" });
  const [modalError, setModalError] = useState({ open: false, message: "" });

  const statusMap = {
    analise: "request",
    pendente: "budget",
    emprogresso: "in_progress",
    "pendente-produto": "pending_product",
    cancelado: "canceled",
    concluido: "completed",
  };

  const [dadosOS, setDadosOS] = useState({
    description: "",
    technicalAnalysis: "",
    status: "budget",
    descriptionClient: "",
    notes: "",
    entryDate: "",
    deadline: "",
  });

  const [serviceOrderId, setServiceOrderId] = useState(null);
  const [serviceOrderCode, setServiceOrderCode] = useState(null);

  const [clientId, setClientId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

  const [pagamento, setPagamento] = useState({
    paymentType: "",
    paid: false,
    paymentDate: "",
  });

  const [custoTotal, setCustoTotal] = useState({
    valorProdutos: "",
    valorServicos: "",
    valorTotal: "",
    totalComDesconto: "",
  });

  const [servicos, setServicos] = useState([{ colaboradores: [] }]);
  const [products, setProducts] = useState([]);

  const [observacao, setObservacao] = useState("");

  const [descontoData, setDescontoData] = useState({
    tipo: "percent",
    valor: 0,
    subtotal: 0,
    total: 0,
  });

  const saveOrder = async () => {
    const servicosValidos = servicos.filter((s) => s.serviceId);

    const payload = {
      clientId,
      vehicleId,
      technicalAnalysis: dadosOS.technicalAnalysis,
      status: statusMap[dadosOS.status] || dadosOS.status,
      descriptionClient: dadosOS.descriptionClient,
      notes: observacao,
      entryDate: dadosOS.entryDate,
      deadline: dadosOS.deadline,
      paymentType: pagamento.paymentType,
      paid: pagamento.paid,
      paymentDate: pagamento.paymentDate,
      discountType: descontoData.tipo,
      discountValue: descontoData.valor,
      totalValueProducts: custoTotal.valorProdutos || 0,
      totalValueServices: custoTotal.valorServicos || 0,
      totalValueGeneral: custoTotal.valorTotal || 0,
      totalValueWithDiscount: custoTotal.totalComDesconto || 0,
      services: servicosValidos.map((s) => ({
        serviceId: s.serviceId,
        title: s.title,
        description: s.description || "",
        quantity: s.quantidade || 1,
        workHours: s.workHours || 0,
        hourValue: s.hourValue || 0,
        totalValue: s.totalValue || 0,
        mechanicIds: (s.colaboradores || []).map((m) => m._id),
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

    if (serviceOrderId || editingMode) {
      const id = serviceOrderId || orderIdFromLocation;
      return await updateServiceOrder(id, payload);
    }

    return await createServiceOrder(payload);
  };

  const handleSave = async () => {
    try {
      const res = await saveOrder();

      setServiceOrderId(res._id);
      setServiceOrderCode(res.code);

      location.state = { mode: "edit", orderId: res._id };

      setModalSuccess({ open: true, message: "Ordem de serviço salva com sucesso!" });
    } catch (error) {
      setModalError({ open: true, message: "Erro ao salvar OS: " + error.message });
    }
  };


  const handleSaveAndExit = async () => {
    try {
      await saveOrder();
      setModalSuccess({
        open: true,
        message: "Ordem de Serviço salva com sucesso!",
      });
      setTimeout(() => {
        window.location.href = "/ordem-de-serviço";
      }, 1200);
    } catch (error) {
      setModalError({ open: true, message: "Erro ao salvar OS: " + error.message });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!orderIdFromLocation) return;

      try {
        const [res, mecList] = await Promise.all([
          getServiceOrderById(orderIdFromLocation),
          getAllMechanics(),
        ]);

        if (!res) return;

        setMechanics(mecList);

        setServiceOrderId(res._id || res.id);
        setServiceOrderCode(res.code || null);

        setClientId(res.clientId || null);
        setVehicleId(res.vehicleId || null);

        setDadosOS((prev) => ({
          ...prev,
          code: res.code || "",
          technicalAnalysis: res.technicalAnalysis || res.technical_analysis || "",
          descriptionClient: res.descriptionClient || res.description_client || "",
          entryDate: res.entryDate || res.entry_date || "",
          deadline: res.deadline || "",
          status:
            Object.entries(statusMap).find(([, v]) => v === res.status)?.[0] ||
            res.status ||
            prev.status,
        }));

        setServicos(
          (res.services || []).map((s) => ({
            ...s,
            colaboradores: (s.mechanicIds || []).map((id) => {
              const mec = mecList.find((m) => m._id === id);
              return { _id: id, name: mec ? mec.name : id };
            }),
          }))
        );

        setProducts(res.products || []);

        setPagamento({
          paymentType: res.paymentType || "",
          paid: !!res.paid,
          paymentDate: res.paymentDate || "",
        });

        setDescontoData({
          tipo: res.discountType || "percent",
          valor: res.discountValue || 0,
          subtotal: 0,
          total: 0,
        });

        setObservacao(res.notes || "");

        setCustoTotal({
          valorProdutos: res.totalValueProducts ?? "",
          valorServicos: res.totalValueServices ?? "",
          valorTotal: res.totalValueGeneral ?? "",
          totalComDesconto: res.totalValueWithDiscount ?? "",
        });
      } catch (error) {
        return error
      }
    };

    if (editingMode || viewingMode) loadData();
  }, [orderIdFromLocation, editingMode, viewingMode]);

  return (
    <Container>
      <Title>
        <Icon src={NovaOSIcon} alt="Nova OS" />
        {pageTitle}
      </Title>

      <DadosOSSection dadosOS={dadosOS} setDadosOS={setDadosOS} isLocked={isViewLock} />
      <ClienteOS clientId={clientId} setClientId={setClientId} isLocked={isViewLock} />
      <VeiculoOS vehicleId={vehicleId} setVehicleId={setVehicleId} isLocked={isViewLock} />

      <ServicosSection
        servicos={servicos}
        setServicos={setServicos}
        isLocked={isViewLock || isCreateLock}
      />

      <ProdutosSection
        products={products}
        setProducts={setProducts}
        isLocked={isViewLock || isCreateLock}
        serviceOrderId={serviceOrderId}
        serviceOrderCode={serviceOrderCode}
      />

      <SolicitacaoCliente
        value={dadosOS.descriptionClient}
        onChange={(e) => setDadosOS({ ...dadosOS, descriptionClient: e.target.value })}
        isLocked={isViewLock}
      />

      <AnaliseInicial
        value={dadosOS.technicalAnalysis}
        onChange={(v) => setDadosOS({ ...dadosOS, technicalAnalysis: v })}
        isLocked={isViewLock || isCreateLock}
      />

      <DescontoTotal value={descontoData} onChange={setDescontoData} isLocked={isViewLock || isCreateLock} />

      <CustoTotal
        value={custoTotal}
        onChange={setCustoTotal}
        products={products}
        services={servicos}
        descontoData={descontoData}
        isLocked={isViewLock || isCreateLock}
      />

      <PagamentosOS value={pagamento} onChange={setPagamento} isLocked={isViewLock || isCreateLock} />

      <ObservacaoOS value={observacao} onChange={setObservacao} isLocked={isViewLock} />

      {!viewingMode && (
        <ButtonsWrapper>
          <SaveButton onClick={handleSave}>SALVAR</SaveButton>
          <SaveExitButton onClick={handleSaveAndExit}>SALVAR E SAIR</SaveExitButton>
        </ButtonsWrapper>
      )}

      {modalSuccess.open && (
        <ModalSucesso
          message={modalSuccess.message}
          onClose={() => setModalSuccess({ open: false, message: "" })}
        />
      )}

      {modalError.open && (
        <ModalErro
          message={modalError.message}
          onClose={() => setModalError({ open: false, message: "" })}
        />
      )}
    </Container>
  );
}

export default CriarOS;
