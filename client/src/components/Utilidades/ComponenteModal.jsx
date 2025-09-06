import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../Stores/modalStore";

const ComponenteModal = () => {
  const navigate = useNavigate();

  const { modal: modalActivo, setModal } = useModal();

  const closeModal = () => {
    console.log("gg");

    setModal({ mensaje: "", errorColor: false, activo: false, navegarA: "" });
    document.body.style.overflow = "auto";
    navigate(modalActivo.navegarA);
  };

  return (
    <>
      {modalActivo.activo && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <Modal
            mensaje={modalActivo.mensaje}
            errorColor={modalActivo.errorColor}
            imagen={modalActivo.imagen}
          />
        </div>
      )}
    </>
  );
};

export default ComponenteModal;
