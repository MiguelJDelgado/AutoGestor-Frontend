import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import PesquisaIcon from "../../assets/pesquisa.png";
import { createProduct } from "../../services/ProdutoService";
import SuccessModal from "../Sucesso/SucessoModal";
import ErrorModal from "../Erro/ErroModal";
import { getSuppliers } from "../../services/FornecedorService";

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
  margin-right: 10px;
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
  text-align: center;

  &[disabled] {
    background: #e5e7eb;
    cursor: not-allowed;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
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

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const DropdownContainer = styled.ul`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f3f6f9;
  }
`;


const CriarProduto = ({ mode = "create", data = null, onClose = () => {}, onSave = () => {}, onOpenSupplierPicker }) => {
  const isView = mode === "view";

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

  const [fornecedores, setFornecedores] = useState([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [buscaFornecedor, setBuscaFornecedor] = useState("");
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);


  useEffect(() => {
    if (data) {
      setForm({
        descricao: data.name || "",
        fornecedor: data.providerIds?.[0] || "",
        valorPago: data.costUnitPrice || "",
        margem: data.grossProfitMargin || "",
        valorVenda: data.salePrice || "",
        unidade: data.unitMeasure || "",
        data: data.createdAt ? data.createdAt.split("T")[0] : "",
        estoque: data.quantity || 0,
      });
    }
  }, [data]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const res = await getSuppliers();
        setFornecedores(res.data);
        setFilteredFornecedores(res.data);
      } catch (err) {
        console.error("Erro ao buscar fornecedores:", err);
      }
    };

    fetchFornecedores();
  }, []);

  useEffect(() => {
    const termo = buscaFornecedor.toLowerCase();
    const filtrados = fornecedores.filter((f) =>
      f.name?.toLowerCase().includes(termo)
    );
    setFilteredFornecedores(filtrados);
  }, [buscaFornecedor, fornecedores]);


  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [, setErrors] = useState({});
  const [, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isView) firstInputRef.current?.focus();
  }, [isView]);

  const handleChange = (field) => (e) => {
    if (isView) return;
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(() => {
    if (isView) return;

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

  const validate = () => {
    if (isView) return true;

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

  const handleSelectFornecedor = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setBuscaFornecedor(fornecedor.name);
    setForm((prev) => ({ ...prev, fornecedor: fornecedor._id }));
  };


  const handleSave = async () => {
    if (isView) return onClose();
    if (!validate()) return;

    setLoading(true);
    try {
      const novoProduto = {
        name: form.descricao,
        quantity: form.estoque,
        costUnitPrice: parseFloat(String(form.valorPago).replace(",", ".")),
        salePrice: form.valorVenda ? parseFloat(String(form.valorVenda).replace(",", ".")) : undefined,
        grossProfitMargin: form.margem ? parseFloat(String(form.margem).replace(",", ".")) : undefined,
        unitMeasure: form.unidade || undefined,
        providerIds: form.fornecedor ? [form.fornecedor] : [],
      };

      await createProduct(novoProduto);

      // MOSTRAR MODAL DE SUCESSO
      setSuccessMessage("Produto cadastrado com sucesso!");
      
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Erro ao salvar produto."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <LayoutModal
      title={
        mode === "view" ? "Visualizar Produto"
        : mode === "edit" ? "Editar Produto"
        : "Adicionar Novo Produto"
      }
      onClose={onClose}
      onSave={isView ? null : handleSave}
      hideSaveButton={isView}
    >

      {successMessage && (
    <SuccessModal
      message={successMessage}
      onClose={() => {
        setSuccessMessage("");
        onSave();   // Agora sim dispara o pai
        onClose();  // Agora sim fecha o modal raiz
      }}
    />
  )}

  {errorMessage && (
    <ErrorModal
      message={errorMessage}
      onClose={() => setErrorMessage("")}
    />
  )}

      <FormGrid>
        <Full>
          <Label>Descrição</Label>
          <InputWrapper>
            <Input
              disabled={isView}
              ref={firstInputRef}
              value={form.descricao}
              onChange={handleChange("descricao")}
            />
            <IconButton disabled={isView}>
              <img src={PesquisaIcon} alt="Pesquisar" style={{ width: 18, height: 18 }} />
            </IconButton>
          </InputWrapper>
        </Full>

        <Full>
          <Label>Fornecedor</Label>
          <InputWrapper style={{ position: "relative", flex: 1 }}>
            <Input
              disabled={isView}
              value={buscaFornecedor}
              onChange={(e) => {
                setBuscaFornecedor(e.target.value);
                setFornecedorSelecionado(null);
                setForm((prev) => ({ ...prev, fornecedor: "" })); 
              }}
              placeholder="Digite para buscar fornecedor..."
              autoComplete="off"
            />
            {buscaFornecedor &&
              !fornecedorSelecionado &&
              filteredFornecedores.length > 0 && (
                <DropdownContainer>
                  {filteredFornecedores.slice(0, 8).map((f) => (
                    <DropdownItem
                      key={f._id}
                      onClick={() => handleSelectFornecedor(f)}
                    >
                      {f.name}
                    </DropdownItem>
                  ))}
                </DropdownContainer>
              )}
            <IconButton disabled={isView} onClick={onOpenSupplierPicker}>
              <img src={PesquisaIcon} alt="Selecionar fornecedor" style={{ width: 18, height: 18 }} />
            </IconButton>
          </InputWrapper>
        </Full>

        <div>
          <Label>Valor Unit. Pago</Label>
          <InputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <Input
              disabled={isView}
              type="number"
              value={form.valorPago}
              onChange={handleChange("valorPago")}
            />
          </InputWrapper>
        </div>

        <div>
          <Label>Margem Bruta</Label>
          <InputWrapper>
            <SmallInput
              disabled={isView}
              type="number"
              value={form.margem}
              onChange={handleChange("margem")}
            />
            <span>%</span>
          </InputWrapper>
        </div>

        <Full>
          <Label>Valor Unit. Venda</Label>
          <InputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <Input readOnly value={form.valorVenda} />
          </InputWrapper>
        </Full>

        <div>
          <Label>Unidade de Medida</Label>
          <Input
            disabled={isView}
            value={form.unidade}
            onChange={handleChange("unidade")}
          />
        </div>

        <div>
          <Label>Data</Label>
          <Input
            disabled={isView}
            type="date"
            value={form.data}
            onChange={handleChange("data")}
          />
        </div>

        <Full>
          <Label>Estoque Disponível</Label>
          <Input
            disabled={isView}
            type="number"
            value={form.estoque}
            onChange={(e) =>
              setForm((p) => ({ ...p, estoque: Number(e.target.value) }))
            }
          />
        </Full>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarProduto;
