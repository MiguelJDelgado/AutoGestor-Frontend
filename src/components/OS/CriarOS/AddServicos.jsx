import { useEffect, useState } from "react";
import styled from "styled-components";
import ServicoIcon from "./icons/ServicoOS.png";
import xIcon from "../../../assets/XIcon.png";
import plusIcon from "../../../assets/plusIcon.png";
import MecanicosModal from "../../../modals/Mecanicos/AdicionarMecanicoOS";
import { getAllServices } from "../../../services/ServicoService";
import { getAllMechanics } from "../../../services/MecanicoService";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  overflow-x: auto;
  max-width: 100%;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  vertical-align: middle;
`;

const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #2b3e50;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 3px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  min-width: 900px;
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

const Select = styled.select`
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f3f6f9;
  font-size: 14px;
  color: #333;
`;

const AddButton = styled.button`
  width: 100%;
  background: #00c853;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 6px 0;
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    background: #9be7af;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #00b248;
  }
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  background: #f3f6f9;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 4px 8px;
  min-height: 36px;
`;

const Chip = styled.span`
  background: #dbeafe;
  color: #1e40af;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  padding: 4px 10px;
`;

const AddColabButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function ServicosSection({ servicos, setServicos, isLocked = false }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isColabModalOpen, setIsColabModalOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);

  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
  getAllMechanics().then(setMechanics);
}, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServiceList(data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      }
    };
    fetchServices();
  }, []);

  const adicionarServico = () =>
    !isLocked && setServicos([...servicos, { colaboradores: [] }]);

  const removerServico = (index) =>
    !isLocked &&
    setServicos(servicos.filter((_, i) => i !== index));

  const handleSaveColaboradores = (colabs) => {
    if (isLocked) return;

    setServicos((prev) =>
      prev.map((srv, i) =>
        i === selectedIndex ? { ...srv, colaboradores: colabs } : srv
      )
    );
    setIsColabModalOpen(false);
  };

  const handleSelectService = (index, serviceId) => {
    if (isLocked) return;

    const selectedService = serviceList.find((s) => s._id === serviceId);
    if (!selectedService) return;

    setServicos((prev) =>
      prev.map((srv, i) =>
        i === index
          ? {
              ...srv,
              serviceId: selectedService._id,
              title: selectedService.title,
              workHours: selectedService.workHours,
              hourValue: selectedService.hourValue,
              totalValue: selectedService.totalValue,
              quantidade: 1,
            }
          : srv
      )
    );
  };

  const handleChangeQuantidade = (index, value) => {
    if (isLocked) return;

    setServicos((prev) =>
      prev.map((srv, i) =>
        i === index
          ? {
              ...srv,
              quantidade: value,
              totalValue:
                srv.hourValue && srv.workHours
                  ? srv.hourValue * srv.workHours * value
                  : srv.totalValue,
            }
          : srv
      )
    );
  };

  return (
    <Section disabled={isLocked}>
      <SectionHeader>
        <Icon src={ServicoIcon} alt="Serviço" />
        Serviços
      </SectionHeader>

      {servicos.map((servico, index) => (
        <FormWrapper key={index}>
          {!isLocked && (
            <RemoveButton onClick={() => removerServico(index)}>
              <img src={xIcon} alt="Remover" />
            </RemoveButton>
          )}

          <FormGrid>
            <Field>
              <Label>Título do serviço</Label>
              <Select
                disabled={isLocked}
                value={servico.serviceId || ""}
                onChange={(e) => handleSelectService(index, e.target.value)}
              >
                <option value="">Selecione um serviço</option>
                {serviceList.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <Label>Horas de trabalho</Label>
              <Input disabled value={servico.workHours || ""} />
            </Field>

            <Field>
              <Label>Quantidade</Label>
              <Input
                type="number"
                min="1"
                disabled={isLocked}
                value={servico.quantidade || ""}
                onChange={(e) =>
                  handleChangeQuantidade(index, Number(e.target.value))
                }
              />
            </Field>

            <Field>
              <Label>Valor hora</Label>
              <Input disabled value={servico.hourValue || ""} />
            </Field>

            <Field>
              <Label>Valor unitário</Label>
              <Input
                disabled
                value={
                  servico.workHours && servico.hourValue
                    ? servico.workHours * servico.hourValue
                    : ""
                }
              />
            </Field>

            <Field>
              <Label>Valor total</Label>
              <Input disabled value={servico.totalValue || ""} />
            </Field>

            <Field>
              <Label>Mecânicos</Label>
              <ChipsContainer>
                {servico.colaboradores.map((colab, i) => {
  const mecId = typeof colab === "object" ? colab._id : colab;
  const mec = mechanics.find(m => m._id === mecId);

  return (
    <Chip key={i}>
      {mec ? mec.name : mecId}
    </Chip>
  );
})}


                <AddColabButton
                  disabled={isLocked}
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsColabModalOpen(true);
                  }}
                >
                  <img src={plusIcon} alt="Adicionar" />
                </AddColabButton>
              </ChipsContainer>
            </Field>
          </FormGrid>
        </FormWrapper>
      ))}

      <AddButton onClick={adicionarServico} disabled={isLocked}>
        +
      </AddButton>

      {!isLocked && isColabModalOpen && (
        <MecanicosModal
          onClose={() => setIsColabModalOpen(false)}
          onSave={handleSaveColaboradores}
          colaboradoresIniciais={servicos[selectedIndex]?.colaboradores || []}
        />
      )}
    </Section>
  );
}

export default ServicosSection;
