import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Overlay,
  ModalBox,
  CancelButton,
  ConfirmButton,
} from "../styles/style";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    await axios
      .delete("http://localhost:8800/" + userToDelete)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== userToDelete);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setUserToDelete(null);
    setShowModal(false);
    setOnEdit(null);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th $onlyWeb>Fone</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.nome}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" $onlyWeb>
                {item.fone}
              </Td>
              <Td $alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td $alignCenter width="5%">
                <FaTrash onClick={() => confirmDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {showModal && (
        <Overlay>
          <ModalBox>
            <p>Tem certeza que deseja excluir este usuário?</p>
            <div style={{ marginTop: 20 }}>
              <CancelButton onClick={cancelDelete}>Cancelar</CancelButton>
              <ConfirmButton onClick={handleDelete}>Confirmar</ConfirmButton>
            </div>
          </ModalBox>
        </Overlay>
      )}
    </>
  );
};

export default Grid;
