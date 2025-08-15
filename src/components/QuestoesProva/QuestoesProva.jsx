import { useState } from 'react';
import styled from 'styled-components';
import {
  FaUserCircle,
  FaBell,
  FaChartLine,
  FaBars,
  FaThLarge,
} from 'react-icons/fa';
import { IoMdBook, IoMdCard, IoMdHelpCircle } from 'react-icons/io';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #222;
  color: white;
  overflow: hidden;
`;

const Sidebar = styled.div`
  background-color: #0094b9;
  width: ${props => (props.open ? '250px' : '80px')};
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #007ca0;
  border-radius: 20px;
  padding: 10px;
  width: 100%;

  h3 {
    font-size: 16px;
    margin: 5px 0 0 0;
  }

  span {
    font-size: 12px;
    margin-top: -2px;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.open ? 'flex-start' : 'center')};
  font-size: 20px;
  gap: 10px;
  padding: 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #007b9e;
  }

  span {
    display: ${props => (props.open ? 'inline' : 'none')};
  }
`;

const ToggleButton = styled(MenuButton)`
  margin-top: 10px;
  font-size: 22px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #00c2f5;
  font-size: 28px;
  text-align: center;
`;

const QuestionCard = styled.div`
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  h2 {
    color: #00c2f5;
    font-size: 20px;
  }

  span {
    font-size: 14px;
    color: #ccc;
  }
`;

const QuestionText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Option = styled.li`
  margin: 10px 0;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    cursor: pointer;
  }

  input[type='radio'] {
    accent-color: #00c2f5;
  }
`;

const SubmitButton = styled.button`
  background-color: #0094b9;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-end;

  &:hover {
    background-color: #007b9e;
  }
`;

const TelaQuestoes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <Container>
      <Sidebar open={sidebarOpen}>
        <SidebarTop>
          <UserInfo>
            <FaUserCircle size={28} />
            <h3>João</h3>
            <span>Aluno</span>
          </UserInfo>

          <ToggleButton onClick={toggleSidebar} open={sidebarOpen}>
            <FaBars />
          </ToggleButton>

          <MenuButton open={sidebarOpen}><FaThLarge /><span>Menu</span></MenuButton>
          <MenuButton open={sidebarOpen}><IoMdBook /><span>Matérias</span></MenuButton>
          <MenuButton open={sidebarOpen}><IoMdCard /><span>Assinatura</span></MenuButton>
          <MenuButton open={sidebarOpen}><FaBell /><span>Notificações</span></MenuButton>
          <MenuButton open={sidebarOpen}><FaChartLine /><span>Dashboard</span></MenuButton>
        </SidebarTop>

        <MenuButton open={sidebarOpen}><IoMdHelpCircle /><span>Suporte</span></MenuButton>
      </Sidebar>

      <MainContent>
        <Title>QUESTÕES</Title>

        <QuestionCard>
          <Header>
            <h2>Português</h2>
            <span>Data: 01/12/2024</span>
          </Header>

          <QuestionText>
            1) Censura moralista <br />
            Há tempos que a leitura está em pauta. E, diz-se, em crise. Comenta-se esta crise, por exemplo, apontando a precariedade das práticas de leitura, lamentando a falta de familiaridade dos jovens com livros, reclamando da falta de bibliotecas em tantos municípios, do preço dos livros em livrarias, num nunca acabar de problemas e de carências. Mas, de um tempo para cá, pesquisas acadêmicas vêm dizendo que talvez não seja exatamente assim, que brasileiros leem, sim, só que leem livros que as pesquisas tradicionais não levam em conta. E, também de um tempo para cá, políticas educacionais têm tomado a peito investir em livros e em leitura.\n\nOs falantes, nos textos que produzem, sejam orais ou escritos, posicionam-se frente a assuntos que geram consenso ou despertam polêmica. No texto, a autora
          </QuestionText>

          <OptionsList>
            <Option>
              <label><input type="radio" name="q1" /> a) ressalta a importância de os professores incentivarem os jovens às práticas de leitura.</label>
            </Option>
            <Option>
              <label><input type="radio" name="q1" /> b) critica pesquisas tradicionais que atribuem a falta de leitura à precariedade de bibliotecas.</label>
            </Option>
            <Option>
              <label><input type="radio" name="q1" /> c) rebate a ideia de que as políticas educacionais são eficazes no combate à crise de leitura.</label>
            </Option>
            <Option>
              <label><input type="radio" name="q1" /> d) questiona a existência de uma crise de leitura com base nos dados de pesquisas acadêmicas.</label>
            </Option>
            <Option>
              <label><input type="radio" name="q1" /> e) atribui a crise da leitura à falta de incentivos e ao desinteresse dos jovens por livros de qualidade.</label>
            </Option>
          </OptionsList>

          <SubmitButton>Próxima</SubmitButton>
        </QuestionCard>
      </MainContent>
    </Container>
  );
};

export default TelaQuestoes;