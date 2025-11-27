import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';
import OS from '../../../assets/OS.png';
import Dashboard from '../../../assets/dashboard.png';
import Clientes from '../../../assets/clientes.png';
import Veiculo from '../../../assets/veiculo.png';
import Produtos from '../../../assets/produtos.png';
import Servicos from '../../../assets/servicos.png';
import Solicitacao from '../../../assets/compras.png';
import Fornecedor from '../../../assets/fornecedor.png';
import Mecanico from '../../../assets/mecanico.png';
import sidebar from '../../../assets/sidebar.png';
import profile from '../../../assets/profile.svg';
import settings from '../../../assets/configuracoes.png';
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";

const opcoesMenu = [
  { texto: 'Ordem de Serviço', icone: OS },
  { texto: 'Dashboard', icone: Dashboard },
  { texto: 'Clientes', icone: Clientes },
  { texto: 'Veículos', icone: Veiculo },
  { texto: 'Produtos', icone: Produtos },
  { texto: 'Serviços', icone: Servicos },
  { texto: 'Solicitações', icone: Solicitacao },
  { texto: 'Fornecedores', icone: Fornecedor },
  { texto: 'Mecânicos', icone: Mecanico },
  { texto: 'Configurações', icone: settings }
];

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? "220px" : "80px")};
  background-color: #00273d;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: ${({ isOpen }) => (isOpen ? "row" : "column")};
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "space-between" : "center")};
  padding: 12px 15px;
  gap: ${({ isOpen }) => (isOpen ? "0" : "10px")};
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const UserIcon = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;

const UserInfo = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  margin-left: 10px;
  color: white;

  strong { font-size: 15px; }
  span { font-size: 12px; color: #ccc; }
`;

const LogoutMenu = styled.div`
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%); /* ✅ centraliza perfeitamente */
  background: #ffffff;
  color: #00273d;
  padding: 10px 18px;
  border-radius: 10px;
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  gap: 8px; /* ✅ espaçamento entre ícone e texto */
  font-weight: 500;

  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) =>
    show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-5px)"};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #eef4f8;
  }
`;

const ToggleButton = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const Opcoes = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const ItemLink = styled(NavLink)`
  width: 100%;
  display: block;
  text-decoration: none;

  &.active li {
    background-color: #00476d;
    font-weight: bold;
  }
`;

const Opcao = styled.li`
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding: 12px 15px;
  color: white;
  transition: background 0.3s;
  font-size: 16px;

  &:hover { background-color: #003a59; }
`;

const IconeOpcao = styled.img`
  width: 22px;
  height: 22px;
  margin-right: ${({ isOpen }) => (isOpen ? "10px" : "0")};
  flex-shrink: 0;
`;

const TextoOpcao = styled.span`
  display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
  white-space: nowrap;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const LogoFooter = styled.img`
  max-width: ${({ isOpen }) => (isOpen ? "100px" : "60px")};
  transition: max-width 0.3s;
`;

function Sidebar({ isOpen, onToggle }) {
  const { user, setUser, logout  } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef(null);

  const roleLabels = {
    admin: "Administrador",
    manager: "Gerente",
    employer: "Usuário"
  };

  function handleLogout() {
    logout();
    navigate("/login");
  }


  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SidebarContainer isOpen={isOpen}>
      <Header isOpen={isOpen}>
        <UserSection onClick={() => setShowLogout((prev) => !prev)} ref={logoutRef}>
          <UserIcon src={profile} alt="Usuário" />
          <UserInfo isOpen={isOpen}>
            <strong>{user?.name || "Carregando..."}</strong>
            <span>{roleLabels[user?.role] || ""}</span>
          </UserInfo>
          <LogoutMenu show={showLogout} onClick={handleLogout}>
            ⏻ Sair
          </LogoutMenu>
        </UserSection>
        <ToggleButton src={sidebar} alt="Menu" onClick={onToggle} />
      </Header>
      <Opcoes>
        {opcoesMenu
          .filter((opcao) => {
            if (opcao.texto === "Configurações" && user?.role !== "admin") {
              return false;
            }
            return true;
          })
          .map((opcao) => (
          <ItemLink
            key={opcao.texto}
            to={`/${opcao.texto.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Opcao isOpen={isOpen}>
              <IconeOpcao src={opcao.icone} alt={opcao.texto} isOpen={isOpen} />
              <TextoOpcao isOpen={isOpen}>{opcao.texto}</TextoOpcao>
            </Opcao>
          </ItemLink>
        ))}
      </Opcoes>
      <Footer>
        <LogoFooter src={logo} alt="Auto Gestor" isOpen={isOpen} />
      </Footer>
    </SidebarContainer>
  );
}
export default Sidebar;
