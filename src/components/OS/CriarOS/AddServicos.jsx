import { useEffect, useState } from "react";
import styled from "styled-components";
import ServicoIcon from "./icons/ServicoOS.png";
import xIcon from "../../../assets/XIcon.png";
import plusIcon from "../../../assets/plusIcon.png";
import MecanicosModal from "../../../modals/Mecanicos/AdicionarMecanicoOS";
import { getAllServices } from "../../../services/ServicoService";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
  overflow-x: auto;
  max-width: 100%;
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
    object-fit: contain;
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

  &:hover {
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover img {
    transform: scale(1.1);
    filter: brightness(1.2);
  }
`;


function ServicosSection({ servicos, setServicos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isColabModalOpen, setIsColabModalOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]); // lista vinda do backend

  // 🔹 Carrega todos os serviços ao montar o componente
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
    setServicos([...servicos, { colaboradores: [] }]);

  const removerServico = (index) =>
    setServicos(servicos.filter((_, i) => i !== index));

  const handleSaveColaboradores = (colabs) => {
    setServicos((prev) =>
      prev.map((srv, i) =>
        i === selectedIndex ? { ...srv, colaboradores: colabs } : srv
      )
    );
    setIsColabModalOpen(false);
  };

  // 🔹 Quando o usuário escolhe um serviço no select
  const handleSelectService = (index, serviceId) => {
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
              quantidade: 1, // valor padrão editável
            }
          : srv
      )
    );
  };

  // 🔹 Atualiza o campo de quantidade manualmente
  const handleChangeQuantidade = (index, value) => {
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
    <Section>
      <SectionHeader>
        <Icon src={ServicoIcon} alt="Serviço" />
        Serviços
      </SectionHeader>

      {servicos.map((servico, index) => (
        <FormWrapper key={index}>
          <RemoveButton onClick={() => removerServico(index)}>
            <img src={xIcon} alt="Remover" />
          </RemoveButton>

          <FormGrid>
            <Field>
              <Label>Título do serviço</Label>
              <Select
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
              <Input
                disabled
                placeholder="Puxado da área de serviços"
                value={servico.workHours || ""}
              />
            </Field>

            <Field>
              <Label>Quantidade</Label>
              <Input
                type="number"
                min="1"
                placeholder="Editável"
                value={servico.quantidade || ""}
                onChange={(e) =>
                  handleChangeQuantidade(index, Number(e.target.value))
                }
              />
            </Field>

            <Field>
              <Label>Valor hora</Label>
              <Input
                disabled
                placeholder="Puxado da área de serviços"
                value={servico.hourValue || ""}
              />
            </Field>

            <Field>
              <Label>Valor unitário</Label>
              <Input
                disabled
                placeholder="Puxado da área de serviços"
                value={
                  servico.workHours && servico.hourValue
                    ? servico.workHours * servico.hourValue
                    : ""
                }
              />
            </Field>

            <Field>
              <Label>Valor total</Label>
              <Input
                disabled
                placeholder="cálculo final"
                value={servico.totalValue || ""}
              />
            </Field>

            <Field>
              <Label>Mecanicos</Label>
              <ChipsContainer>
                {servico.colaboradores.map((colab, i) => (
                  <Chip key={i}>{colab}</Chip>
                ))}
                <AddColabButton
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsColabModalOpen(true);
                  }}
                  title="Adicionar colaborador"
                >
                  <img src={plusIcon} alt="Adicionar colaborador" />
                </AddColabButton>
              </ChipsContainer>
            </Field>
          </FormGrid>
        </FormWrapper>
      ))}

      <AddButton onClick={adicionarServico}>+</AddButton>

      {isColabModalOpen && (
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
