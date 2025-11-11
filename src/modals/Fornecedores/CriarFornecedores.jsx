import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LayoutModal from "../Layout";
import { createSupplier } from "../../services/FornecedorService";
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

const BigInput = styled.input`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d5dde3;

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

const CriarFornecedor = ({ onClose = () => {}, onSave = () => {} }) => {
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
    firstInputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  // 🔧 Aplica máscara apenas quando necessário
  const applyMask = (field, value) => {
    let v = value;

    if (["cpfCnpj", "telefone", "cep"].includes(field)) {
      v = v.replace(/\D/g, ""); // remove tudo que não é número
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
  let rawValue = e.target.value;

  // 🔢 Impede caracteres não numéricos no campo "numero"
  if (field === "numero") {
    rawValue = rawValue.replace(/\D/g, "");
  }

  const maskedValue = applyMask(field, rawValue);
  setForm((prev) => ({ ...prev, [field]: maskedValue }));

  // 📦 Busca endereço automático quando CEP completo
  if (field === "cep") {
    const onlyDigits = rawValue.replace(/\D/g, "");
    if (onlyDigits.length === 8) {
      try {
        const address = await getAddressByCep(onlyDigits);
        setForm((prev) => ({
          ...prev,
          cep: maskedValue,
          endereco: address.logradouro || "",
          municipio: address.localidade || "",
          uf: address.uf || "",
        }));
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        alert("CEP não encontrado.");
      }
    }
  }
};



  const handleSave = async () => {
    setIsSaving(true);

    try {
      const unmasked = (v) => v?.replace(/\D/g, "") || "";

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

      const createdSupplier = await createSupplier(supplierData);
      onSave(createdSupplier);
      onClose();
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      alert("Erro ao criar fornecedor. Verifique os dados e tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LayoutModal
      title="Adicionar Novo Fornecedor"
      onClose={onClose}
      onSave={handleSave}
      saveDisabled={isSaving}
    >
      <FormGrid>
        <HalfWidth>
          <Label>Nome/Razão Social</Label>
          <Input
            ref={firstInputRef}
            value={form.nome}
            onChange={handleChange("nome")}
          />
        </HalfWidth>

        <HalfWidth>
          <Label>CPF/CNPJ</Label>
          <Input
            value={form.cpfCnpj}
            onChange={handleChange("cpfCnpj")}
            maxLength={18}
          />
        </HalfWidth>

        <FullWidth>
          <Label>Inscrição Estadual</Label>
          <Input
            value={form.inscricaoEstadual}
            onChange={handleChange("inscricaoEstadual")}
          />
        </FullWidth>

        <ThirdWidth>
          <Label>CEP</Label>
          <Input
            value={form.cep}
            onChange={handleChange("cep")}
            maxLength={9}
          />
        </ThirdWidth>

        <HalfWidth>
          <Label>Endereço</Label>
          <Input value={form.endereco} onChange={handleChange("endereco")} />
        </HalfWidth>

        <ThirdWidth>
          <Label>Número</Label>
          <Input value={form.numero} onChange={handleChange("numero")} />
        </ThirdWidth>

        <ThirdWidth>
          <Label>Município</Label>
          <Input value={form.municipio} onChange={handleChange("municipio")} />
        </ThirdWidth>

        <ThirdWidth>
          <Label>UF</Label>
          <Input value={form.uf} onChange={handleChange("uf")} />
        </ThirdWidth>

        <HalfWidth>
          <Label>Email</Label>
          <Input value={form.email} onChange={handleChange("email")} />
        </HalfWidth>

        <HalfWidth>
          <Label>Telefone</Label>
          <Input
            value={form.telefone}
            onChange={handleChange("telefone")}
            maxLength={15}
          />
        </HalfWidth>

        <FullWidth>
          <Label>Anotação</Label>
          <BigInput
            value={form.anotacao}
            onChange={handleChange("anotacao")}
          />
        </FullWidth>
      </FormGrid>
    </LayoutModal>
  );
};

export default CriarFornecedor;