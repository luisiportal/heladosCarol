import { useMonedaStore } from "../Stores/MonedaStore";

const SelecMoneda = () => {
  const { moneda, setMoneda } = useMonedaStore();

  return (
    <div>
      <select
      title="Seleccionar Moneda"
        value={moneda}
        onChange={(e) => setMoneda(e.target.value)}
        className="rounded-xl px-4 py-2 font-bold cursor-pointer h-full"
        name="moneda"
      >
        <option value="USD">USD </option>
        <option value="EUR">EUR</option>
        <option value="CUP">CUP</option>
      </select>
    </div>
  );
};

export default SelecMoneda;

