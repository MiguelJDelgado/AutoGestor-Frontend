import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';


const Container = styled.div`
  background-color: #222;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px; // reduzido para não causar overflow horizontal
  overflow-x: hidden;
`;


const Card = styled.div`
  background-color: #00273d;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  width: 800px;
  max-width: 90%;
  gap: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 20px;
    gap: 20px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f0d9b5;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;

  img {
    width: 120px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    img {
      width: 80px;
    }
  }
`;

const Titulo = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  margin-left: 65px;
  font-size: 35px;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #061a1fff;
  color: #fff;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #d3d3d3;
  font-size: 0.9rem;
`;

const Botao = styled.button`
  background-color: #1e4550ff;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #4d7985ff;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');

    try {
      const res = await fetch('http://25.38.62.218:3000/unauth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Erro ao fazer login');
        return;
      }

      localStorage.setItem('token', data.token);

      const decoded = jwtDecode(data.token);
      console.log('Decoded token:', decoded);

      const role = decoded.role;

      if (!role) {
        setErro('Erro: Role não encontrada no token');
        return;
      }

      if (role === 1) {
        navigate('/menuAluno');
      } else if (role === 2) {
        navigate('/menu-professor');
      } else if (role === 3) {
        navigate('/menu-admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão com o servidor ou decodificação do token');
    }
  }

  return (
    <Container>
      <Card>
        <FormSection>
          <Titulo>Faça o seu login</Titulo>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <CheckboxContainer>
            <input type="checkbox" />
            <span>Permanecer conectado</span>
          </CheckboxContainer>
          <Botao onClick={handleLogin}>Confirmar</Botao>
          {erro && <p style={{ color: 'red', marginLeft: '65px' }}>{erro}</p>}
        </FormSection>

        <LogoSection>
          <img src={logo} style={{ width: '90%' }} alt="Logo" />
        </LogoSection>
      </Card>
    </Container>
  );
};

export default Login;
