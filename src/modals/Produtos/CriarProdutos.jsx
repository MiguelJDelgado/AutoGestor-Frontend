import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  align-items: center;
`;

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
  display: flex;
  align-items: center;
  gap: 8px;
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
  display: inline-block;
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
  height: 36px;
  width: 36px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
  background: #eef3f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CriarProduto = ({ onClose = () => {}, onSave = () => {}, onOpenSupplierPicker }) => {
  const [form, setForm] = useState({
    descricao: "",
    fornecedor: "",
    valorPago: "",
    margem: "",
    valorVenda: "",
    unidade: "",
    data: "",
    estoque: 0,
  });

  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const vp = parseFloat(String(form.valorPago).replace(",", "."));
    const mg = parseFloat(String(form.margem).replace(",", "."));
    if (!isNaN(vp)) {
      const margin = isNaN(mg) ? 0 : mg;
      const venda = +(vp * (1 + (margin / 100)));
      setForm((prev) => ({ ...prev, valorVenda: isFinite(venda) ? venda.toFixed(2) : "" }));
    } else {
      setForm((prev) => ({ ...prev, valorVenda: "" }));
    }
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

  const handleOpenSupplierPicker = () => {
    if (typeof onOpenSupplierPicker === "function") {
      onOpenSupplierPicker({
        onSelect: (supplierName) => {
          setForm((prev) => ({ ...prev, fornecedor: supplierName }));
        }
      });
      return;
    }

    console.log("Abrir picker de fornecedores (implemente onOpenSupplierPicker)");
  };

  return (
    <LayoutModal title="Adicionar Novo Produto" onClose={onClose} onSave={handleSave}>
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
          {errors.descricao && <small style={{ color: "crimson" }}>{errors.descricao}</small>}
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
          {errors.fornecedor && <small style={{ color: "crimson" }}>{errors.fornecedor}</small>}
        </Full>

      </FormGrid>
    </LayoutModal>
  );
};

export default CriarProduto;
