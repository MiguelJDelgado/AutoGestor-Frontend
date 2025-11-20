import { useState, useEffect } from "react";
import styled from "styled-components";
import xIcon from "../../assets/XIcon.png";
import { createClient, getClientById, updateClient } from "../../services/ClienteService";
import { createVehicle, getVehicleById, updateVehicle } from "../../services/VeiculoService";

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

const ModalCliente = ({ mode, data, onClose, onSave }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

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

  const [veiculos, setVeiculos] = useState([{}]);

  useEffect(() => {
    if (!data || isCreate) return;

    async function loadData() {
      try {
        const cliente = await getClientById(data._id);

        setForm(prev => ({
          ...prev,
          name: cliente.name || "",
          cpf: cliente.cpf || "",
          cnpj: cliente.cnpj || "",
          stateRegistration: cliente.stateRegistration || "",
          cep: cliente.cep || "",
          address: cliente.address || "",
          number: cliente.number || "",
          city: cliente.city || "",
          state: cliente.state || "",
          email: cliente.email || "",
          cellphone: cliente.cellphone || "",
          notes: cliente.notes || "",
        }));

        if (cliente.vehicleIds?.length > 0) {
          const vehicleId = cliente.vehicleIds[0];
          const veiculo = await getVehicleById(vehicleId);

          setVeiculos([
            {
              _id: veiculo._id,
              licensePlate: veiculo.licensePlate || "",
              brand: veiculo.brand || "",
              name: veiculo.name || "",
              year: veiculo.year || "",
              fuel: veiculo.fuel || "",
              chassi: veiculo.chassi || "",
              km: veiculo.km || "",
            },
          ]);
        } else {
          setVeiculos([{}]);
        }

      } catch (err) {
        console.error("Erro ao carregar cliente/veiculo:", err);
      }
    }

    loadData();
  }, [data, mode]);

  const handleChange = (field, value) => {
    if (isView) return;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleVehicleChange = (index, field, value) => {
    if (isView) return;
    const updated = [...veiculos];
    updated[index] = { ...updated[index], [field]: value };
    setVeiculos(updated);
  };

  const addVehicle = () => {
    if (isView) return;
    setVeiculos([...veiculos, {}]);
  };

  const removeVehicle = (index) => {
    if (isView) return;
    setVeiculos(veiculos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      let savedVehicles = [];

      for (const v of veiculos) {
        if (!v.licensePlate) continue;

        if (v._id) {
          const updated = await updateVehicle(v._id, v);
          savedVehicles.push(updated._id);
        } else {
          const created = await createVehicle(v);
          savedVehicles.push(created._id);
        }
      }

      const payload = {
        ...form,
        vehicleIds: savedVehicles,
      };

      delete payload._id;

      if (isEdit) {
        await updateClient(data._id, payload);
      }
      if (isCreate) {
        await createClient(payload);
      }

      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      alert("Erro ao salvar cliente.");
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>
            {isCreate && "Adicionar Novo Cliente"}
            {isEdit && "Editar Cliente"}
            {isView && "Visualizando Cliente"}
          </Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Section>
          <FormGrid columns="3">
            <Field>
              <Label>Nome/Razão Social</Label>
              <Input
                disabled={isView}
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Field>

            <Field>
              <Label>CPF/CNPJ</Label>
              <Input
                disabled={isView}
                value={form.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Inscrição Estadual</Label>
              <Input
                disabled={isView}
                value={form.stateRegistration}
                onChange={(e) =>
                  handleChange("stateRegistration", e.target.value)
                }
              />
            </Field>
          </FormGrid>

          <FormGrid columns="6">
            <Field>
              <Label>CEP</Label>
              <Input
                disabled={isView}
                value={form.cep}
                onChange={(e) => handleChange("cep", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Endereço</Label>
              <Input
                disabled={isView}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Número</Label>
              <Input
                disabled={isView}
                value={form.number}
                onChange={(e) => handleChange("number", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Município</Label>
              <Input
                disabled={isView}
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Field>

            <Field>
              <Label>UF</Label>
              <InputUF
                disabled={isView}
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Field>
          </FormGrid>

          <FormGrid columns="2">
            <Field>
              <Label>Email</Label>
              <Input
                disabled={isView}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Telefone</Label>
              <Input
                disabled={isView}
                value={form.cellphone}
                onChange={(e) => handleChange("cellphone", e.target.value)}
              />
            </Field>
          </FormGrid>

          <Field>
            <Label>Anotação</Label>
            <TextArea
              disabled={isView}
              rows="2"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </Field>
        </Section>

        <Section>
          <SubTitle>Veículos do Cliente</SubTitle>

          {veiculos.map((v, index) => (
            <FormWrapper key={index}>
              {!isView && (
                <RemoveButton onClick={() => removeVehicle(index)}>
                  <img src={xIcon} alt="Remover veículo" />
                </RemoveButton>
              )}

              <FormGrid columns="4">
                <Field>
                  <Label>Placa</Label>
                  <Input
                    disabled={isView}
                    value={v.licensePlate || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "licensePlate", e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label>Marca</Label>
                  <Input
                    disabled={isView}
                    value={v.brand || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "brand", e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label>Modelo</Label>
                  <Input
                    disabled={isView}
                    value={v.name || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "name", e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label>Ano</Label>
                  <Input
                    disabled={isView}
                    value={v.year || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "year", e.target.value)
                    }
                  />
                </Field>
              </FormGrid>

              <FormGrid columns="4">
                <Field>
                  <Label>Combustível</Label>
                  <Input
                    disabled={isView}
                    value={v.fuel || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "fuel", e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label>Chassi</Label>
                  <Input
                    disabled={isView}
                    value={v.chassi || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "chassi", e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label>Km</Label>
                  <Input
                    disabled={isView}
                    value={v.km || ""}
                    onChange={(e) =>
                      handleVehicleChange(index, "km", e.target.value)
                    }
                  />
                </Field>
              </FormGrid>
            </FormWrapper>
          ))}

          {!isView && <AddButton onClick={addVehicle}>+</AddButton>}
        </Section>

        <Footer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          {!isView && (
            <ConfirmButton onClick={handleSubmit}>
              {isEdit ? "Salvar alterações" : "Adicionar"}
            </ConfirmButton>
          )}
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalCliente;
