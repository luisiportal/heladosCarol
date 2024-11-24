import { useState } from "react";

const LayoutPrincipal = ({ titulo, children }) => {
  const [metodoPago, SetMetodoPago] = useState("");
  return (
    <div className="pt-2">
      <h1 className="flex justify-center text-slate-700 font-semibold text-2xl">{titulo}</h1>
      {children}
    </div>
  );
};

export default LayoutPrincipal;
