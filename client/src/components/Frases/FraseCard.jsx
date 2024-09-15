import React from "react";
import EditSVG from "../SVG/EditSVG";
import { useNavigate } from "react-router-dom";

const FraseCard = ({ frase }) => {
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/frases/edit/${id}`);
  };

  return (
    <div className="gap-2 flex justify-center items-center font-irish bg-vainilla rounded-xl mx-4 my-2 p-2">
      {frase.texto}
      <button onClick={() => handleEdit(frase.id)}>
        <EditSVG />
      </button>
    </div>
  );
};

export default FraseCard;
