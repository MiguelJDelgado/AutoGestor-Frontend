import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

/* ---------- styles ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const Modal = styled.div`
  width: 720px;
  max-width: 95%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(2,15,30,0.2);
  padding: 18px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #00273d;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: 0;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  padding: 6px;
`;

const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: #00273d;
  opacity: 0.15;
  margin: 10px 0 18px;
`;

/* Grid */
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  align-items: center;
`;

/* Helpers */
const Full = styled.div`
  grid-column: span 2;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  color: #0f2f43;
  margin-bottom: 6px;
`;

const InputWrapper = styled.div`
  display:flex;
  align-items:center;
  gap:8px;
`;

const Input = styled.input`
  height: 36px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  background: #eef3f6;
  padding: 0 10px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const SmallInput = styled(Input)`
  width: 120px;
`;

const CurrencyPrefix = styled.span`
  display:inline-block;
  background: #f1f5f7;
  border: 1px solid #d5dde3;
  padding: 8px 10px;
  border-radius: 6px;
  height: 36px;
  line-height: 18px;
  color: #0f2f43;
  font-weight: 600;
`;

const IconButton = styled.button`
  height:36px;
  width:36px;
  border-radius:6px;
  border: 1px solid #d5dde3;
  background: #eef3f6;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
`;

/* footer */
const Actions = styled.div`
  display:flex;
  justify-content:flex-end;
  gap:12px;
  margin-top:18px;
`;

const CancelBtn = styled.button`
  border: 0;
  background: transparent;
  color: #333;
  padding: 8px 12px;
  cursor: pointer;
  border-radius:6px;
`;

const SaveBtn = styled.button`
  background: #28a745;
  color: #fff;
  padding: 9px 16px;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ---------- component ---------- */
const CriarProduto = ({ onClose = () => {}, onSave = () => {}, onOpenSupplierPicker }) => {
  const [form, setForm] = useState({
    descricao: "",
    fornecedor: "",
    valorPago: "",
    margem: "", // em %
    valorVenda: "", // calculado
    unidade: "",
    data: "",
    estoque: 0,
  });

  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  // focus inicial
  useEffect(() => {
    firstInputRef.current?.focus();
    // prevenir scroll do body enquanto modal estiver aberto
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // fecha ao pressionar ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // recalcula valor de venda quando valorPago ou margem mudam
  useEffect(() => {
    const vp = parseFloat(String(form.valorPago).replace(",", "."));
    const mg = parseFloat(String(form.margem).replace(",", "."));
    if (!isNaN(vp)) {
      const margin = isNaN(mg) ? 0 : mg;
      const venda = +(vp * (1 + (margin / 100)));
      // arredondar para 2 casas
      setForm((prev) => ({ ...prev, valorVenda: isFinite(venda) ? venda.toFixed(2) : "" }));
    } else {
      setForm((prev) => ({ ...prev, valorVenda: "" }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.valorPago, form.margem]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleInc = (delta) => {
    setForm((prev) => {
      const next = Math.max(0, Number(prev.estoque || 0) + delta);
      return { ...prev, estoque: next };
    });
  };

  const validate = () => {
    const err = {};
    if (!form.descricao || form.descricao.trim().length < 2) err.descricao = "Descrição é obrigatória";
    if (!form.fornecedor || form.fornecedor.trim().length < 2) err.fornecedor = "Fornecedor é obrigatório";
    // valorPago pode ser zero, mas deve ser número
    if (form.valorPago === "" || isNaN(parseFloat(String(form.valorPago).replace(",", ".")))) err.valorPago = "Informe um valor válido";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = {
      descricao: form.descricao.trim(),
      fornecedor: form.fornecedor.trim(),
      costUnitPrice: parseFloat(String(form.valorPago).replace(",", ".")) || 0,
      marginPercent: parseFloat(String(form.margem).replace(",", ".")) || 0,
      salePrice: parseFloat(String(form.valorVenda).replace(",", ".")) || 0,
      unit: form.unidade.trim() || null,
      date: form.data ? new Date(form.data).toISOString() : null,
      quantity: Number(form.estoque || 0),
    };

    onSave(payload);
    onClose();
  };

  // quando clicar lupa de fornecedor
  const handleOpenSupplierPicker = () => {
    if (typeof onOpenSupplierPicker === "function") {
      onOpenSupplierPicker({
        onSelect: (supplierName) => {
          setForm((prev) => ({ ...prev, fornecedor: supplierName }));
        }
      });
      return;
    }
    // fallback: apenas foco / log
    console.log("Abrir picker de fornecedores (implemente onOpenSupplierPicker)");
  };

  return (
    <Overlay role="dialog" aria-modal="true" aria-label="Adicionar Novo Produto">
      <Modal>
        <Header>
          <Title>Adicionar Novo Produto</Title>
          <CloseBtn aria-label="Fechar" onClick={onClose}>✖</CloseBtn>
        </Header>

        <Divider />

        <FormGrid>
          <Full>
            <Label>Descrição</Label>
            <InputWrapper>
              <Input
                ref={firstInputRef}
                placeholder="Descrição do produto"
                value={form.descricao}
                onChange={handleChange("descricao")}
                aria-invalid={!!errors.descricao}
              />
              <IconButton title="Pesquisar descrição">🔍</IconButton>
            </InputWrapper>
            {errors.descricao && <small style={{color:"crimson"}}>{errors.descricao}</small>}
          </Full>

          <Full>
            <Label>Fornecedor</Label>
            <InputWrapper>
              <Input
                placeholder="Nome do fornecedor"
                value={form.fornecedor}
                onChange={handleChange("fornecedor")}
                aria-invalid={!!errors.fornecedor}
              />
              <IconButton title="Selecionar fornecedor" onClick={handleOpenSupplierPicker}>🔎</IconButton>
            </InputWrapper>
            {errors.fornecedor && <small style={{color:"crimson"}}>{errors.fornecedor}</small>}
          </Full>

          <div>
            <Label>Valor Unit. Pago</Label>
            <InputWrapper>
              <CurrencyPrefix>R$</CurrencyPrefix>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.valorPago}
                onChange={handleChange("valorPago")}
                aria-invalid={!!errors.valorPago}
              />
            </InputWrapper>
            {errors.valorPago && <small style={{color:"crimson"}}>{errors.valorPago}</small>}
          </div>

          <div>
            <Label>Margem Bruta</Label>
            <InputWrapper>
              <SmallInput
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                value={form.margem}
                onChange={handleChange("margem")}
              />
              <span style={{fontSize:14, color:"#0f2f43"}}>%</span>
            </InputWrapper>
          </div>

          <Full>
            <Label>Valor Unit. Venda (calculado)</Label>
            <InputWrapper>
              <CurrencyPrefix>R$</CurrencyPrefix>
              <Input
                readOnly
                value={form.valorVenda !== "" ? Number(form.valorVenda).toFixed(2) : ""}
                aria-readonly="true"
                placeholder="—"
              />
            </InputWrapper>
          </Full>

          <div>
            <Label>Unidade de Medida</Label>
            <Input
              placeholder="Ex: UN, KG, LT"
              value={form.unidade}
              onChange={handleChange("unidade")}
            />
          </div>

          <div>
            <Label>Data</Label>
            <Input
              type="date"
              value={form.data}
              onChange={handleChange("data")}
            />
          </div>

          <Full>
            <Label>Estoque Disponível</Label>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <IconButton onClick={() => handleInc(-1)} aria-label="Diminuir estoque">−</IconButton>
              <Input
                type="number"
                min="0"
                value={form.estoque}
                onChange={(e) => setForm((p) => ({...p, estoque: Math.max(0, Number(e.target.value || 0)) }))}
                style={{ textAlign: "center", width: 120 }}
              />
              <IconButton onClick={() => handleInc(1)} aria-label="Aumentar estoque">+</IconButton>
            </div>
          </Full>
        </FormGrid>

        <Actions>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={handleSave}>Adicionar</SaveBtn>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default CriarProduto;
