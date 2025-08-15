import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaUserCircle,
  FaBell,
  FaChartLine,
  FaBars,
  FaThLarge,
  FaArrowLeft,
  FaArrowRight
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
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  background-color: #ddd;
  color: #333;
  border-radius: 20px;
  border: none;
  padding: 8px 16px;
  width: 200px;
  font-size: 14px;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ArrowButton = styled.button`
  background-color: #00acc1;
  border: none;
  padding: 10px;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #008ba3;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  flex: 1;
`;

export const Card = styled.div`
  background-color: #0094b9;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #e0f7fa;
  transition: transform 0.2s, box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    background-color: #007b9e;
  }

  h3 {
    color: #a8dadc;
  }

  a {
    color: #76c7c0;
    text-decoration: none;
  }

  a:hover {
    color: #b2f7ef;
  }
`;

const CardHeader = styled.div`
  background-color: #003f5c;
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardContent = styled.ul`
  list-style: none;
  padding: 10px 0 0 15px;
  margin: 0;

  li {
    margin-bottom: 6px;
    font-weight: bold;
  }
`;

const AnosEnem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); // ✅ Hook corretamente dentro do componente

  const provasPorPagina = 4;
  const provas = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

  const provasPaginadas = provas.slice(
    currentPage * provasPorPagina,
    currentPage * provasPorPagina + provasPorPagina
  );

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
        <Title>PROVAS</Title>
        <Subtitle>ENEM</Subtitle>

        <SearchWrapper>
          <SearchInput placeholder="Pesquise o ano da prova" />
        </SearchWrapper>

        <CarouselWrapper>
          <ArrowButton onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}>
            <FaArrowLeft />
          </ArrowButton>

          <CardsContainer>
            {provasPaginadas.map(ano => (
              <Card
                key={ano}
                onClick={() => {
                  if (ano === 2024) navigate('/questoes-prova');
                }}
              >
                <CardHeader>{ano}</CardHeader>
                <CardContent>
                  <li>Prova</li>
                  <li>Gabarito</li>
                </CardContent>
              </Card>
            ))}
          </CardsContainer>

          <ArrowButton
            onClick={() =>
              setCurrentPage(prev =>
                (prev + 1) * provasPorPagina < provas.length ? prev + 1 : prev
              )
            }
          >
            <FaArrowRight />
          </ArrowButton>
        </CarouselWrapper>
      </MainContent>
    </Container>
  );
};

export default AnosEnem;
