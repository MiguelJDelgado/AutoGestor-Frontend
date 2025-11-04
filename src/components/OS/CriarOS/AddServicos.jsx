import { useState } from "react";
import styled from "styled-components";
import ServicoIcon from "./icons/ServicoOS.png";
import xIcon from "../../../assets/XIcon.png";
import plusIcon from "../../../assets/plusIcon.png";
import ColaboradoresModal from "../../../modals/Colaboradores/AdicionarColaboradorOS";

const Section = styled.div`
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  margin-bottom: 24px;
  padding: 16px;
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
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
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


function ServicosSection() {
  const [servicos, setServicos] = useState([{ colaboradores: [] }]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isColabModalOpen, setIsColabModalOpen] = useState(false);

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
              <Select>
                <option>Lista de serviços cadastrados</option>
              </Select>
            </Field>

            <Field>
              <Label>Horas de trabalho</Label>
              <Input disabled placeholder="Puxado da área de serviços" />
            </Field>

            <Field>
              <Label>Quantidade</Label>
              <Input placeholder="Editável" />
            </Field>

            <Field>
              <Label>Valor hora</Label>
              <Input disabled placeholder="Puxado da área de serviços" />
            </Field>

            <Field>
              <Label>Valor unitário</Label>
              <Input disabled placeholder="Puxado da área de serviços" />
            </Field>

            <Field>
              <Label>Tipo de Desconto</Label>
              <Select>
                <option>Desconto %</option>
                <option>Desconto R$</option>
              </Select>
            </Field>

            <Field>
              <Label>Desconto</Label>
              <Input placeholder="Editável" />
            </Field>

            <Field>
              <Label>Subtotal sem desconto</Label>
              <Input disabled placeholder="unitário x quantidade" />
            </Field>

            <Field>
              <Label>Valor total</Label>
              <Input disabled placeholder="cálculo final" />
            </Field>

            <Field>
              <Label>Colaboradores</Label>
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
        <ColaboradoresModal
          onClose={() => setIsColabModalOpen(false)}
          onSave={handleSaveColaboradores}
          colaboradoresIniciais={
            servicos[selectedIndex]?.colaboradores || []
          }
        />
      )}
    </Section>
  );
}

export default ServicosSection;
