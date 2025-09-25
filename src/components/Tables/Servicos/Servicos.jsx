import { useState } from 'react';
import styled from 'styled-components';
import Table from '../Table';
import Header from '../../Header/Header';

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  z-index: 1000;
  width: 400px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const TelaServicos = () => {
  const [showModal, setShowModal] = useState(false);

  const columns = ["Título", "Descrição", "Horas Trabalho", "Valor Hora", "Valor Total"];
  const data = [
    {
      "Título": "Troca de filtro",
      "Descrição": "FILTRO COMBUSTÍVEL / FORD / JEEP / FIAT",
      "Horas Trabalho": 3,
      "Valor Hora": 60,
      "Valor Total": 3 * 60,
    },
    {
      "Título": "Manutenção motor",
      "Descrição": "FILTRO DO MOTOR FORD / JEEP",
      "Horas Trabalho": 5,
      "Valor Hora": 80,
      "Valor Total": 5 * 80,
    },
  ];

  return (
    <div>
      <Header
        title="Serviços"
        onNew={() => setIsModalOpen(true)}
      >
        + Novo Serviço
      </Header>
      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <h2>Adicionar Novo Serviço</h2>
            {/* Aqui você coloca seu formulário de serviço */}
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </Modal>
        </>
      )}

      <Table 
        columns={columns} 
        data={data} 
        searchOptions={columns}
      />
    </div>
  );
};

export default TelaServicos;

