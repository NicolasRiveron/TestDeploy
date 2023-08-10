import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { guardarMonedas } from "../../features/monedasSlice";
import { guardarTransacciones } from "../../features/transaccionesSlice";

import AgregarTransaccion from "./AgregarTransaccion";
import GraficoCompras from "./GraficoCompras";
import GraficoVentas from "./GraficoVentas";
import GraficoXMoneda from "./GraficoXMoneda";
import IAOperaciones from "./IAOperaciones"
import ListadoTransacciones from "./ListadoTransacciones"
import MontoInversiones from "./MontoInversiones"


const IUDashboard = () => {

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const nuevaTransaccion = useRef(null)
    const grafica = useRef(null)
    const listado = useRef(null)

    const scrollToNuevaTransaccion = () => nuevaTransaccion.current.scrollIntoView();
    const scrollToGrafica = () => grafica.current.scrollIntoView();
    const scrollToListado = () => listado.current.scrollIntoView();

    useEffect(() => {
        if (localStorage.getItem("apikey") === null) {
            navigate("/");
        }

        fetch("https://crypto.develotion.com/monedas.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apikey")
            }
        })
            .then(r => r.json())
            .then(datos => datos.codigo === 200 ? dispatch(guardarMonedas(datos.monedas)) : console.log("Monedas:" + datos.mensaje));

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${localStorage.getItem("usuario")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apikey")
            }
        })
            .then(r => r.json())
            .then(datos => datos.codigo === 200 ? dispatch(guardarTransacciones(datos.transacciones)) : console.log("Transacciones:" + datos.mensaje));
    }, [])

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div>
            <div ref={nuevaTransaccion} id="dashboard" className="px-5 pb-5 d-flex flex-column">
                <div id="inicio">
                    <AgregarTransaccion />
                    <IAOperaciones />
                    <MontoInversiones />
                </div>
                <div ref={grafica} className="row justify-content-center align-items-center">
                    <GraficoCompras />
                    <GraficoVentas />
                </div>
                <div className="row justify-content-center align-items-center">
                    <GraficoXMoneda />
                </div>
                <div ref={listado} className="row justify-content-center align-items-center">
                    <ListadoTransacciones />
                </div>
            </div>
            <header className="text-center w-100 m-0">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    {/* <!-- Comienza menu hamburguesa --> */}
                    <button className="ms-3 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#abrirMenu"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <!-- Termina menu hamburguesa -->
                    <!-- Comienza contenido de menu --> */}
                    <div className="collapse navbar-collapse justify-content-center align-items-center py-3" id="abrirMenu">
                        <ul className="navbar-nav mb-2 mb-lg-0 text-uppercase">
                            <li className="nav-item px-2 mx-4 link">
                                <a className="nav-link my-auto text-light" aria-current="page" onClick={scrollToNuevaTransaccion}>Nueva transacción</a>
                            </li>
                            <li className="d-none d-lg-block nav-item px-3 mx-4 align-items-center">
                                <img src="../img/bitcoinLogoBlanco.png" width="64px" height="64px" />
                            </li>
                            <li className="nav-item px-3 mx-4 align-items-center link">
                                <a className="nav-link text-light" aria-current="page" onClick={scrollToGrafica}>Graficas</a>
                            </li>
                            <li className="d-none d-lg-block nav-item px-3 mx-4 align-items-center">
                                <img src="../img/bitcoinLogoBlanco.png" width="64px" height="64px" />
                            </li>
                            <li className="nav-item px-2 mx-4 link">
                                <a className="nav-link text-light" aria-current="page" onClick={scrollToListado}>Lista Transacciones</a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- Termina contenido de menu --> */}
                </nav>
            </header>
            <div id="logout" className="px-3 py-2">
                <input type="button" onClick={logout} value="Logout" />
            </div>
        </div>

    )
}

export default IUDashboard