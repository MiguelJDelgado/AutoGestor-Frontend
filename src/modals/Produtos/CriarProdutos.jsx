import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import PesquisaIcon from "../../assets/pesquisa.png";

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
  font-size: 14px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d5dde3;
`;

const SmallInput = styled(Input)`
  max-width: 100px;
`;

const CurrencyPrefix = styled.span`
  background: #f1f5f7;
  border: 1px solid #d5dde3;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
`;

const IconButton = styled.button`
  height: 36px;
  width: 36px;
  border-radius: 6px;
  border: 1px solid #dee3e6;
  background: #dee3e6;
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
    return () => {
      document.body.style.overflow = prev;
    };
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
      const venda = vp * (1 + margin / 100);
      setForm((prev) => ({
        ...prev,
        valorVenda: isFinite(venda) ? venda.toFixed(2) : "",
      }));
    } else {
      setForm((prev) => ({ ...prev, valorVenda: "" }));
    }
  }, [form.valorPago, form.margem]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleInc = (val) => {
    setForm((prev) => ({
      ...prev,
      estoque: Math.max(0, prev.estoque + val),
    }));
  };

  const validate = () => {
    const err = {};
    if (!form.descricao || form.descricao.trim().length < 2)
      err.descricao = "Descrição é obrigatória";
    if (!form.fornecedor || form.fornecedor.trim().length < 2)
      err.fornecedor = "Fornecedor é obrigatório";
    if (
      form.valorPago === "" ||
      isNaN(parseFloat(String(form.valorPago).replace(",", ".")))
    )
      err.valorPago = "Informe um valor válido";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  const handleOpenSupplierPicker = () => {
    if (typeof onOpenSupplierPicker === "function") {
      onOpenSupplierPicker({
        onSelect: (fornecedor) =>
          setForm((prev) => ({ ...prev, fornecedor })),
      });
    }
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
            <IconButton title="Pesquisar descrição">
              <img src={PesquisaIcon} alt="Pesquisar" style={{ width: 18, height: 18 }} />
            </IconButton>

          </InputWrapper>
          {errors.descricao && (
            <small style={{ color: "crimson" }}>{errors.descricao}</small>
          )}
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
            <IconButton title="Selecionar fornecedor" onClick={handleOpenSupplierPicker}>
              <img src={PesquisaIcon} alt="Selecionar fornecedor" style={{ width: 18, height: 18 }} />
            </IconButton>

          </InputWrapper>
          {errors.fornecedor && (
            <small style={{ color: "crimson" }}>{errors.fornecedor}</small>
          )}
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
          {errors.valorPago && (
            <small style={{ color: "crimson" }}>{errors.valorPago}</small>
          )}
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
            <span style={{ fontSize: 14, color: "#0f2f43" }}>%</span>
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconButton onClick={() => handleInc(-1)} aria-label="Diminuir estoque">
              −
            </IconButton>
            <Input
              type="number"
              min="0"
              value={form.estoque}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  estoque: Math.max(0, Number(e.target.value || 0)),
                }))
              }
              style={{ textAlign: "center", width: 120 }}
            />
            <IconButton onClick={() => handleInc(1)} aria-label="Aumentar estoque">
              +
            </IconButton>
          </div>
        </Full>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarProduto;
