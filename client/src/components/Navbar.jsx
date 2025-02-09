import { useAuth } from "../context/AuthContext";
import { useCarritos } from "../context/CarritosContext";
import NavbarComponent from "./NavbarComponent";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const {carrito }= useCarritos()

  return (
    <div className="z-50">
      <NavbarComponent carrito={carrito}></NavbarComponent>
    </div>
  );
}

export default Navbar;
