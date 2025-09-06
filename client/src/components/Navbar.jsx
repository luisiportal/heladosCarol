import { useCarritoStore } from "../Stores/CarritoStore";
import NavbarComponent from "./NavbarComponent";

function Navbar() {
  const { productosCarrito } = useCarritoStore();

  return (
    <div className="z-50">
      <NavbarComponent carrito={productosCarrito}></NavbarComponent>
    </div>
  );
}

export default Navbar;
