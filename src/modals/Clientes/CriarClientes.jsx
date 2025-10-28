import { useState } from "react";
import styled from "styled-components";
import xIcon from "../../assets/XIcon.png";
import { createClient } from "../../services/ClienteService";
import { createVehicle } from "../../services/VeiculoService";

// ---------- estilos mantidos como no seu código ----------
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 900px;
  max-width: 95%;
  max-height: 90%;
  overflow-y: auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2b3e50;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #555;
`;

const Section = styled.div`
  background: #fff;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #2b3e50;
  margin-bottom: 10px;
`;

const FormWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 18px;
    height: 18px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  gap: 12px;
  margin-bottom: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

const InputUF = styled.input`
  height: 32px;
  width: 77px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

const TextArea = styled.textarea`
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  padding: 8px 10px;
  font-size: 14px;
  color: #333;
`;

const AddButton = styled.button`
  width: 100%;
  background: #00bf63;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 6px 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #00b248;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background: #7ed957;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

// ---------- componente principal ----------
const ModalCliente = ({ onClose, onSave }) => {
  const [veiculos, setVeiculos] = useState([{}]);
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    cnpj: "",
    stateRegistration: "",
    cep: "",
    address: "",
    number: "",
    city: "",
    state: "",
    email: "",
    cellphone: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleVehicleChange = (index, field, value) => {
    const updated = [...veiculos];
    updated[index] = { ...updated[index], [field]: value };
    setVeiculos(updated);
  };

  const adicionarVeiculo = () => setVeiculos([...veiculos, {}]);
  const removerVeiculo = (index) => setVeiculos(veiculos.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    try {
      // 1️⃣ Cadastra o cliente
      const newClient = await createClient(form);

      // 2️⃣ Cadastra cada veículo e obtém seus IDs
      const vehicleIds = [];
      for (const v of veiculos) {
        if (v.plate) {
          const createdVehicle = await createVehicle({ ...v, clientId: newClient._id });
          vehicleIds.push(createdVehicle._id);
        }
      }

      // 3️⃣ Atualiza cliente com os veículos (se necessário)
      if (vehicleIds.length > 0) {
        await createClient({ ...newClient, vehicleIds });
      }

      alert("Cliente e veículos cadastrados com sucesso!");
      if (onSave) onSave(newClient);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error.message);
      alert("Erro ao cadastrar cliente: " + error.message);
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Adicionar Novo Cliente</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Section>
          <FormGrid columns="3">
            <Field>
              <Label>Nome/Razão Social</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </Field>
            <Field>
              <Label>CPF/CNPJ</Label>
              <Input value={form.cpf || form.cnpj} onChange={(e) => handleChange("cpf", e.target.value)} />
            </Field>
            <Field>
              <Label>Inscrição Estadual</Label>
              <Input value={form.stateRegistration} onChange={(e) => handleChange("stateRegistration", e.target.value)} />
            </Field>
          </FormGrid>

          <FormGrid columns="6">
            <Field>
              <Label>CEP</Label>
              <Input value={form.cep} onChange={(e) => handleChange("cep", e.target.value)} />
            </Field>
            <Field columns="2">
              <Label>Endereço</Label>
              <Input value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
            </Field>
            <Field>
              <Label>Número</Label>
              <Input value={form.number} onChange={(e) => handleChange("number", e.target.value)} />
            </Field>
            <Field>
              <Label>Município</Label>
              <Input value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
            </Field>
            <Field>
              <Label>UF</Label>
              <InputUF value={form.state} onChange={(e) => handleChange("state", e.target.value)} />
            </Field>
          </FormGrid>

          <FormGrid columns="2">
            <Field>
              <Label>Email</Label>
              <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </Field>
            <Field>
              <Label>Telefone</Label>
              <Input value={form.cellphone} onChange={(e) => handleChange("cellphone", e.target.value)} />
            </Field>
          </FormGrid>

          <Field>
            <Label>Anotação</Label>
            <TextArea rows="2" value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} />
          </Field>
        </Section>

        <Section>
          <SubTitle>Adicionar veículos ao cliente</SubTitle>

          {veiculos.map((v, index) => (
            <FormWrapper key={index}>
              <RemoveButton onClick={() => removerVeiculo(index)}>
                <img src={xIcon} alt="Remover veículo" />
              </RemoveButton>

              <FormGrid columns="4">
                <Field>
                  <Label>Marca</Label>
                  <Input value={v.brand || ""} onChange={(e) => handleVehicleChange(index, "brand", e.target.value)} />
                </Field>
                <Field>
                  <Label>Modelo</Label>
                  <Input value={v.model || ""} onChange={(e) => handleVehicleChange(index, "model", e.target.value)} />
                </Field>
                <Field>
                  <Label>Placa</Label>
                  <Input value={v.licensePlate || ""} onChange={(e) => handleVehicleChange(index, "licensePlate", e.target.value)} />
                </Field>
                <Field>
                  <Label>Ano</Label>
                  <Input value={v.year || ""} onChange={(e) => handleVehicleChange(index, "year", e.target.value)} />
                </Field>
              </FormGrid>

              <FormGrid columns="4">
                <Field>
                  <Label>Tipo de combustível</Label>
                  <Input value={v.fuel || ""} onChange={(e) => handleVehicleChange(index, "fuel", e.target.value)} />
                </Field>
                <Field>
                  <Label>Chassi</Label>
                  <Input value={v.chassis || ""} onChange={(e) => handleVehicleChange(index, "chassis", e.target.value)} />
                </Field>
                <Field>
                  <Label>Km</Label>
                  <Input value={v.km || ""} onChange={(e) => handleVehicleChange(index, "km", e.target.value)} />
                </Field>
              </FormGrid>
            </FormWrapper>
          ))}

          <AddButton onClick={adicionarVeiculo}>+</AddButton>
        </Section>

        <Footer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <ConfirmButton onClick={handleSubmit}>Adicionar</ConfirmButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalCliente;
