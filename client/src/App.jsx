import { Route, Routes } from "react-router-dom";
import { SaboresContextProvider } from "./context/SaboresProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Trabajador from "./components/Trabajadores/TrabajadorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProductoForm from "./components/Sabores/SaboresForm";
import Navbar from "./components/Navbar";
import AgregarTrabajador from "./components/Trabajadores/AgregarTrabajador";

import ListadoTrabajadores from "./pages/ListadoTrabajadores";
import Movimientos from "./pages/MovimientosPage";

import NotFound from "./pages/NotFound";
import Prueba from "./pages/Prueba";
import AgregarMovimiento from "./components/Movimientos/AgregarMovimiento";
import TipoCambioPage from "./pages/TipoCambioPage";
import TipoCambioForm from "./components/TipoCambio/TipoCambioForm";

import { CarritosProvaider } from "./context/CarritosContext";
import VentasRoutes from "./routes/VentasRoutes";

import LogsPage from "./components/LogsSystem/LogsPage";
import HomePage from "./components/HOME/HomePage";
import CuadrePage from "./components/CuadreCaja/CuadrePage";
import Edit from "./components/Movimientos/Edit";
import ResumenVenta from "./components/Ventas/ResumenVenta";
import SaboresPage from "./components/Sabores/SaboresPage";
import SaboresForm from "./components/Sabores/SaboresForm";

import ComprarPage from "./components/Comprar/ComprarPage";
import ListarReviewsBackend from "./components/Reviews/Backend/ListarReviewsBackend";
import { ReviewContextProvider } from "./context/ReviewProvaider";
import RastrearOrden from "./components/RastrearOrden/RastrearOrden";
import CerradoForm from "./components/Modos/CerradoForm";
import DescripcionProducto from "./components/Landing/DescripcionProducto";
import Historia from "./components/Landing/Historia";
import Contacto from "./components/Landing/Contacto";
import FrasesPage from "./components/Frases/FrasesPage";
import FrasesForm from "./components/Frases/FrasesForm";
import EscojerMetodoPago from "./components/MetodosPago/EscojerMetodoPago";

const App = () => {
  return (
    <div className="bg-neutral-100">
      <SaboresContextProvider>
        <AuthProvider>
          <ReviewContextProvider>
            <Navbar />
            <div className="container max-w-md mx-auto">
              <Routes>
                <Route path="/pote" element={<Trabajador />} />
                <Route
                  path="/"
                  element={
                    <CarritosProvaider>
                      <HomePage />
                    </CarritosProvaider>
                  }
                />
                <Route path="prueba" element={<Prueba />} />
                <Route path="/descripcion" element={<DescripcionProducto />} />
                <Route path="/historia" element={<Historia />} />
                <Route path="/contacto" element={<Contacto />} />

                <Route path="/ordenes" element={<RastrearOrden />} />
                <Route
                  path="/comprar"
                  element={
                    <CarritosProvaider>
                      <ComprarPage/>
                    </CarritosProvaider>
                  }
                />
                <Route
                  path="/comprar/:id"
                  element={
                    <CarritosProvaider>
                      <ComprarPage />
                    </CarritosProvaider>
                  }
                />
                <Route element={<ProtectedRoutes />}>
                <Route path="/cambio" element={<TipoCambioPage />} />
                  <Route path="/cerrado" element={<CerradoForm />} />
                  <Route path="/opiniones" element={<ListarReviewsBackend />} />
                  <Route path="/frases" element={<FrasesPage />} />
                  <Route path="/frases/edit/:id" element={<FrasesForm />} />
                  <Route path="/logs/" element={<LogsPage />} />
                  <Route path="/new" element={<SaboresForm />} />
                  <Route
                    path="/trabajador/new"
                    element={<AgregarTrabajador />}
                  />
                  <Route
                    path="/trabajador/profile/edit/:id"
                    element={<AgregarTrabajador />}
                  />

                  <Route
                    path="/trabajador/plantilla"
                    element={<ListadoTrabajadores />}
                  />
                  <Route path="/movimientos" element={<Movimientos />} />
                  <Route
                    path="/movimientos/edit/:id_movimiento"
                    element={<Edit />}
                  />

                  <Route path="/cuadre/" element={<CuadrePage />} />
                  <Route path="/cuadre/:fecha" element={<ResumenVenta />} />

                  <Route
                    path="/sabores/edit/:id_sabor"
                    element={<SaboresForm />}
                  />

                  <Route path="/sabores" element={<SaboresPage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="prueba" element={<Prueba />} />

                  <Route
                    path="/movimientos/entrada"
                    element={
                      <AgregarMovimiento tipo={"Entrada"} key={"entrada"} />
                    }
                  />
                  <Route
                    path="/movimientos/salida"
                    element={
                      <AgregarMovimiento tipo={"Salida"} key={"salida"} />
                    }
                  />
                  <Route
                    path="/movimientos/edit/:id_movimiento"
                    element={<Edit />}
                  />
                  <Route path="cambio" element={<TipoCambioPage />} />
                  <Route path="cambio/new" element={<TipoCambioPage />} />
                  <Route path="cambio/edit/:id" element={<TipoCambioForm />} />

                  <Route path="/transacciones/*" element={<VentasRoutes />} />
                </Route>

                <Route path="/transacciones/*" element={<VentasRoutes />} />
              </Routes>
            </div>
          </ReviewContextProvider>
        </AuthProvider>
      </SaboresContextProvider>
    </div>
  );
};

export default App;
