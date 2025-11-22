
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import {
  createSupplier,
  updateSupplier,
} from "../../services/FornecedorService";
import { getAddressByCep } from "../../services/CepService";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d5dde3;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const BigInput = styled.textarea`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d5dde3;
  resize: none;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const FullWidth = styled.div`
  grid-column: span 4;
`;
const HalfWidth = styled.div`
  grid-column: span 2;
`;
const ThirdWidth = styled.div`
  grid-column: span 1;
`;

const CriarFornecedor = ({
  mode = "create",
  fornecedor = null,
  onClose = () => {},
  onSave = () => {},
}) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    inscricaoEstadual: "",
    cep: "",
    endereco: "",
    numero: "",
    municipio: "",
    uf: "",
    email: "",
    telefone: "",
    anotacao: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!fornecedor) {
      setForm({
        nome: "",
        cpfCnpj: "",
        inscricaoEstadual: "",
        cep: "",
        endereco: "",
        numero: "",
        municipio: "",
        uf: "",
        email: "",
        telefone: "",
        anotacao: "",
      });
      return;
    }

    setForm({
      nome: fornecedor?.name ?? "",
      cpfCnpj: fornecedor?.cnpj ?? "",
      inscricaoEstadual: fornecedor?.stateRegistration ?? "",
      cep: fornecedor?.cep ?? "",
      endereco: fornecedor?.address ?? "",
      numero: fornecedor?.number ?? "",
      municipio: fornecedor?.city ?? "",
      uf: fornecedor?.state ?? "",
      email: fornecedor?.email ?? "",
      telefone: fornecedor?.cellphone ?? "",
      anotacao: fornecedor?.notes ?? "",
    });
  }, [fornecedor]);

  useEffect(() => {
    firstInputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  const applyMask = (field, value) => {
    let v = value ?? "";

    if (["cpfCnpj", "telefone", "cep"].includes(field)) {
      v = v.replace(/\D/g, "");
    }

    switch (field) {
      case "cpfCnpj":
        if (v.length <= 11) {
          v = v.replace(/(\d{3})(\d)/, "$1.$2");
          v = v.replace(/(\d{3})(\d)/, "$1.$2");
          v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
          v = v.replace(/^(\d{2})(\d)/, "$1.$2");
          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
          v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
          v = v.replace(/(\d{4})(\d)/, "$1-$2");
        }
        break;

      case "telefone":
        if (v.length <= 10) {
          v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
          v = v.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
          v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
          v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }
        break;

      case "cep":
        v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        break;
    }

    return v;
  };

  const handleChange = (field) => async (e) => {
    if (isView) return;

    let rawValue = e.target.value ?? "";

    if (field === "numero") {
      rawValue = rawValue.replace(/\D/g, "");
    }

    const masked = applyMask(field, rawValue);
    setForm((prev) => ({ ...prev, [field]: masked }));

    if (field === "cep") {
      const onlyDigits = rawValue.replace(/\D/g, "");
      if (onlyDigits.length === 8) {
        try {
          const address = await getAddressByCep(onlyDigits);
          setForm((prev) => ({
            ...prev,
            cep: masked,
            endereco: address.logradouro || "",
            municipio: address.localidade || "",
            uf: address.uf || "",
          }));
        } catch (err) {
          console.error("Erro ao buscar CEP:", err);
        }
      }
    }
  };

  const validate = () => {
    if (isView) return true;
    if (!form.nome || form.nome.trim().length < 2) {
      alert("Nome é obrigatório");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (isView) return onClose();
    if (!validate()) return;

    setIsSaving(true);
    try {
      const unmasked = (v) => (v ? String(v).replace(/\D/g, "") : "");

      const supplierData = {
        name: form.nome,
        cnpj: unmasked(form.cpfCnpj),
        stateRegistration: form.inscricaoEstadual,
        cep: unmasked(form.cep),
        address: form.endereco,
        number: form.numero,
        city: form.municipio,
        state: form.uf,
        email: form.email,
        cellphone: unmasked(form.telefone),
        notes: form.anotacao,
      };

      let savedSupplier = null;

      if (isEdit && fornecedor && fornecedor._id) {
        const updated = await updateSupplier(fornecedor._id, supplierData);
        savedSupplier = updated || { ...supplierData, _id: fornecedor._id };
      } else {
        const created = await createSupplier(supplierData);
        savedSupplier = created || { ...supplierData };
      }

      savedSupplier = {
        _id: savedSupplier._id ?? fornecedor?._id ?? null,
        name: savedSupplier.name ?? supplierData.name,
        cnpj: savedSupplier.cnpj ?? supplierData.cnpj,
        stateRegistration: savedSupplier.stateRegistration ?? supplierData.stateRegistration,
        cep: savedSupplier.cep ?? supplierData.cep,
        address: savedSupplier.address ?? supplierData.address,
        number: savedSupplier.number ?? supplierData.number,
        city: savedSupplier.city ?? supplierData.city,
        state: savedSupplier.state ?? supplierData.state,
        email: savedSupplier.email ?? supplierData.email,
        cellphone: savedSupplier.cellphone ?? supplierData.cellphone,
        notes: savedSupplier.notes ?? supplierData.notes,
      };

      onSave(savedSupplier);
      onClose();
    } catch (err) {
      console.error("Erro ao salvar fornecedor:", err);
      alert("Erro ao salvar fornecedor. Verifique os dados e tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LayoutModal
      title={
        mode === "view"
          ? "Visualizar Fornecedor"
          : mode === "edit"
          ? "Editar Fornecedor"
          : "Adicionar Novo Fornecedor"
      }
      onClose={onClose}
      onSave={isView ? null : handleSave}
      hideSaveButton={isView}
      saveDisabled={isSaving}
      disableSave={isSaving}
    >
      <FormGrid>
        <HalfWidth>
          <Label>Nome/Razão Social</Label>
          <Input
            ref={firstInputRef}
            value={form.nome}
            onChange={handleChange("nome")}
            disabled={isView}
          />
        </HalfWidth>

        <HalfWidth>
          <Label>CPF/CNPJ</Label>
          <Input
            value={form.cpfCnpj}
            onChange={handleChange("cpfCnpj")}
            maxLength={18}
            disabled={isView}
          />
        </HalfWidth>

        <FullWidth>
          <Label>Inscrição Estadual</Label>
          <Input
            value={form.inscricaoEstadual}
            onChange={handleChange("inscricaoEstadual")}
            disabled={isView}
          />
        </FullWidth>

        <ThirdWidth>
          <Label>CEP</Label>
          <Input
            value={form.cep}
            onChange={handleChange("cep")}
            maxLength={9}
            disabled={isView}
          />
        </ThirdWidth>

        <HalfWidth>
          <Label>Endereço</Label>
          <Input
            value={form.endereco}
            onChange={handleChange("endereco")}
            disabled={isView}
          />
        </HalfWidth>

        <ThirdWidth>
          <Label>Número</Label>
          <Input
            value={form.numero}
            onChange={handleChange("numero")}
            disabled={isView}
          />
        </ThirdWidth>

        <ThirdWidth>
          <Label>Município</Label>
          <Input
            value={form.municipio}
            onChange={handleChange("municipio")}
            disabled={isView}
          />
        </ThirdWidth>

        <ThirdWidth>
          <Label>UF</Label>
          <Input
            value={form.uf}
            onChange={handleChange("uf")}
            disabled={isView}
          />
        </ThirdWidth>

        <HalfWidth>
          <Label>Email</Label>
          <Input
            value={form.email}
            onChange={handleChange("email")}
            disabled={isView}
          />
        </HalfWidth>

        <HalfWidth>
          <Label>Telefone</Label>
          <Input
            value={form.telefone}
            onChange={handleChange("telefone")}
            maxLength={15}
            disabled={isView}
          />
        </HalfWidth>

        <FullWidth>
          <Label>Anotação</Label>
          <BigInput
            value={form.anotacao}
            onChange={handleChange("anotacao")}
            disabled={isView}
          />
        </FullWidth>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarFornecedor;
