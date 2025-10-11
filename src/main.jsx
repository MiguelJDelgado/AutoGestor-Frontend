import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import CadastroComponent from './routes/Cadastro.jsx'
import Produtos from './routes/Produtos.jsx'
import Servicos from './routes/Servicos.jsx'
import Os from './routes/OS.jsx'
import CriarOS from './routes/CriarOS.jsx'
import TelaSolicitacoes from './routes/Solicitacoes.jsx'
import TelaColaboradores from './routes/Colaboradores.jsx'
import TelaVeiculos from './routes/Veiculos.jsx'
import TelaClientes from './routes/Clientes.jsx'
import TelaFornecedores from './routes/Fornecedores.jsx'

const GlobalStyle = createGlobalStyle`
  :root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<CadastroComponent />}/>
        <Route path='/produtos' element={<Produtos />}/>
        <Route path='/serviços' element={<Servicos />}/>
        <Route path='/ordem-de-serviço' element={<Os />}/>
        <Route path='/criar-ordem-de-serviço' element={<CriarOS />}/>
        <Route path='/solicitações' element={<TelaSolicitacoes />}/>
        <Route path='/colaboradores' element={<TelaColaboradores />}/>
        <Route path='/veículos' element={<TelaVeiculos />}/>
        <Route path='/clientes' element={<TelaClientes />}/>
        <Route path='/fornecedores' element={<TelaFornecedores />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
