import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import OS from '../../assets/OS.png';
import Dashboard from '../../assets/dashboard.png';
import Clientes from '../../assets/clientes.png';
import Veiculo from '../../assets/veiculo.png';
import Produtos from '../../assets/produtos.png';
import Servicos from '../../assets/servicos.png';
import Compras from '../../assets/compras.png';
import Fornecedor from '../../assets/fornecedor.png';
import Mecanico from '../../assets/mecanico.png';
import settings from '../../assets/settings.svg';
import sidebar from '../../assets/sidebar.png';

const opcoesMenu = [
  { texto: 'Ordem de Serviço', icone: OS },
  { texto: 'Dashboard', icone: Dashboard },
  { texto: 'Clientes', icone: Clientes },
  { texto: 'Veículos', icone: Veiculo },
  { texto: 'Produtos', icone: Produtos },
  { texto: 'Serviços', icone: Servicos },
  { texto: 'Compras', icone: Compras },
  { texto: 'Fornecedores', icone: Fornecedor },
  { texto: 'Mecânicos', icone: Mecanico },
];

const iconesFooter = [ { texto: settings, img: settings} ];

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 220px;
  background-color: #00273d;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
`;

const SidebarImg = styled.img`
  width: 30%;
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

const LogoImg = styled.img`
  max-width: 60%;
  height: auto;
`;

const Opcoes = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const Opcao = styled.li`
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  color: white;
  transition: background 0.3s;

  &:hover {
    background-color: #00476d;
  }
`;

const IconeOpcao = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const IconesFooter = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: auto;
  padding: 15px;
  &:hover {
    background-color: #00476d;
  }
`;

const IconeFooter = styled.li`
  width: 35px;
`;

const IconesHeader = styled.img`
  width: 100%;
`;

function Header() {
  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImg src={logo} alt="Logo" />
        <SidebarImg src={sidebar} alt="Sidebar"/>
      </LogoContainer>

      <Opcoes>
        {opcoesMenu.map((opcao) => (
          <Link
            key={opcao.texto}
            to={`/${opcao.texto.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ textDecoration: 'none' }}
          >
            <Opcao>
              {opcao.icone && <IconeOpcao src={opcao.icone} alt={opcao.texto} />}
              {opcao.texto}
            </Opcao>
          </Link>
        ))}
      </Opcoes>

      <IconesFooter>
        {iconesFooter.map((icone) => (
        <Link
            key={icone.texto}
            to={`/${icone.texto.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ textDecoration: 'none' }}
        >
            <IconeFooter>
                <IconesHeader src={icone.img} alt={icone.texto} />
            </IconeFooter>
        </Link>
        ))}
      </IconesFooter>
    </SidebarContainer>
  );
}

export default Header;
