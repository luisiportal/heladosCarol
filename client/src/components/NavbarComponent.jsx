import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useAuth } from "../context/AuthContext";

import ActivarDesactModo from "./ModoOffline/ActivarDesactModo";
import DerretidoFresa from "./apariencia/DerretidoFresa";
import { DerretidoChocolate } from "./apariencia/DerretidoChocolate";
import DerretidoVainilla from "./apariencia/DerretidoVainilla";
import DerretidoVainilla2 from "./apariencia/DerretidoVainilla2";
import DerretidoFresa2 from "./apariencia/DerretidoFresa2";
import DerretidoChocolate2 from "./apariencia/DerretidoChocolate2";
import ComponenteModal from "./Utilidades/ComponenteModal";

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const {
    isAuthenticated,
    logout,
    user,
    perfil,
    isOnline,
    setIsOnline,
    modalActivo,
    setModalActivo,
  } = useAuth();

  const sidebarRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Si el evento no ocurrió dentro de sidebarRef o dentro de openButtonRef
        if (
          !openButtonRef.current ||
          !openButtonRef.current.contains(event.target)
        ) {
          setabrirHamburguesa(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hamburguerClick = () => {
    setabrirHamburguesa(!abrirHamburguesa);
  };
  return (
    <div className="bg-slate-100">
      <ComponenteModal
        setModalActivo={setModalActivo}
        modalActivo={modalActivo}
      />
      {/*barra escritorio*/}
      <header className="fixed w-full bg-heladosCarol_color px-6 z-50 rounded shadow-xl">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <div className="flex -mr-4">
            {/*Logo  */}
            <div>
              <Link className="text-heladosCarol_color" to={"/"}>
                <div className="flex gap-4">
                  <img
                    className="w-12 h-12"
                    src={"../images/logo.png"}
                    alt="Logo Helados Carol"
                  />
                  <h1 className="text-white font-inspiration text-4xl font-normal sombraHeader">
                    Helados Carol
                  </h1>
                </div>
              </Link>
            </div>

            <div className="absolute top-0 left-16">
              <DerretidoVainilla />
            </div>
            <div className="absolute top-0 left-52 md:left-3/4">
              <DerretidoChocolate />
            </div>
            <div>
              <Navbar hidden={"hidden space-x-8"}></Navbar>
            </div>
          </div>

          <div className="flex ">
            <div className="hidden lg:flex">
              {/*imagen de perfil*/}
              <Link to={"trabajador/login"}>
                <button className="text-slate-500 hover:bg-white hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
                    alt="perfil"
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                className="text-slate-500 p-1 rounded-full transition-colors focus:ring-2 rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>{" "}
            </div>

            {/* Boton hamburguesa*/}
            <div ref={openButtonRef}>
              {" "}
              <button
                onClick={hamburguerClick}
                className="mt-1 text-white border-black hover:bg-heladosCarol_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              <div className="absolute -bottom-2 sm: left-10 ">
                <DerretidoVainilla2 />
              </div>
              <div className="absolute -bottom-2 left-32 md:left-80 ">
                <DerretidoFresa2 />
              </div>
              <div className="absolute bottom-04 left-3/4 ">
                <DerretidoChocolate2 />
              </div>
            </div>
          </div>
        </div>

        {/*menu hamburguesa movil y luego menu lateral */}
        <div ref={sidebarRef} className="lg:hidden">
          <div
            className={`fixed lg:hidden ${
              abrirHamburguesa ? `left-0` : `-left-80`
            }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50`}
          >
            <Navbar hidden={""}> </Navbar>

            <div className="flex justify-center gap-2">
              {/*imagen de perfil movil*/}
              <Link to={"trabajador/login"}>
                <button className="text-slate-500 hover:bg-heladosCarol_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
                    alt="perfil"
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                className="text-slate-700 hover:text-heladosCarol_color p-1 rounded-full transition-colors focus:ring-2 rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>{" "}
            </div>
          </div>
        </div>
      </header>
      <ActivarDesactModo setIsOnline={setIsOnline} isOnline={isOnline} />
    </div>
  );
};

export default NavbarComponent;
