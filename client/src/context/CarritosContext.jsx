import { createContext, useContext, useEffect, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { useMetoPago } from "../Stores/Pago.store";

export const CarritosContext = createContext();

export const useCarritos = () => {
  const context = useContext(CarritosContext);
  if (!context) throw new Error("sinm contexto carritos");
  return context;
};

export const CarritosProvaider = ({ children }) => {
  const [total_venta, setTotalVenta] = useState([]);
  const [carrito1, setCarrito1] = useState([]);
  const [carrito2, setCarrito2] = useState([]);
  const [carrito3, setCarrito3] = useState([]);
  const [carrito4, setCarrito4] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cartSelect, setCartSelect] = useState(0);
  const [nuCart, setnuCart] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const { setModalActivo, modalActivo } = useAuth();
  const { setMetoPago } = useMetoPago();
  useEffect(() => {}, [recargar]);

  const cargarCarritosGuardados = () => {
    setCarrito1(readLocalStorage("carrito1"));
    setCarrito2(readLocalStorage("carrito2"));
    setCarrito3(readLocalStorage("carrito3"));
    setCarrito4(readLocalStorage("carrito4"));
  };

  const getNucart = () => {
    const response = readLocalStorage("nuCart");
    if (response) {
      setnuCart(response);
    } else {
      writeLocalStorage("nuCart", [0]);
      setnuCart([0]);
    }
  };

  const guardarCarrito = () => {
    if (carrito.length == 0) {
      return setModalActivo({
        mensaje: "Carrito Vacio",
        activo: true,
        errorColor: true,
      });
    } else {
      // carrito tiene productos

      let i = 1;

      while (i <= 4) {
        if (!nuCart.includes(i)) {
          if (nuCart != [0]) {
            setnuCart([...nuCart, i]);
          } else {
            setnuCart([0]);
          }

          writeLocalStorage("nuCart", [...nuCart, i]);
          writeLocalStorage("carrito" + i, [...carrito]);
          setCarrito([]);

          setModalActivo({
            mensaje: "Carrito Guardado",
            activo: true,
          });
          setRecargar(!recargar);
          break;
        }
        i++;
      }
      if (i > 4)
        return setModalActivo({
          mensaje: "Alcanzado limite de 4 carritos",
          activo: true,
          errorColor: true,
        });
    }
  };
  const cargarCarrito = () => {
    //setCarrito([0]); // vaciar el carrito
    const getCarrito = readLocalStorage("carrito");
    if (getCarrito) {
      setCarrito(getCarrito);
      setm;
    }
  };

  return (
    <CarritosContext.Provider
      value={{
        carrito1,
        carrito2,
        carrito3,
        carrito4,
        recargar,
        carrito,
        setCarrito,
        setRecargar,
        guardarCarrito,
        cargarCarrito,
        nuCart,
        setnuCart,
        cartSelect,
        total_venta,
        setTotalVenta,
      }}
    >
      {children}
    </CarritosContext.Provider>
  );
};
