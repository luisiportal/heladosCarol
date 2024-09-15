import React, { useEffect, useState } from "react";
import { getTodasFrases } from "../../api/frases.api";
import FraseCard from "./FraseCard";

const FrasesPage = () => {
  const [frases, setFrases] = useState([]);

  useEffect(() => {
    const cargarFrase = async () => {
      const response = await getTodasFrases();

      setFrases(response.data);
    };
    cargarFrase();
  }, []);

  return (
    <div className="pt-16">
      {frases.map((frase) => (
        <div key={frase.id}>
          <FraseCard frase={frase} />
        </div>
      ))}
    </div>
  );
};

export default FrasesPage;
