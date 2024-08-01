import { useAuth } from "../context/AuthContext";
import NavbarComponent from "./NavbarComponent";

function Navbar() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return "";
  return (
    <div className="z-50">
      <NavbarComponent></NavbarComponent>
    </div>
  );
}

export default Navbar;
