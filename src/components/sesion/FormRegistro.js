import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Validar from "../Validar"

const FormRegistro = () => {

    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])
    const [cargandoDpto, setCargandoDpto] = useState(true)
    const [cargandoCiud, setCargandoCiud] = useState(true)
    const [activar, setActivar] = useState(true)
    const [error, setError] = useState("")

    let navigate = useNavigate();

    const usuario = useRef(null)
    const password = useRef(null)
    const departamento = useRef(null)
    const ciudad = useRef(null)

    useEffect(() => {
        fetch("https://crypto.develotion.com/departamentos.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    setCargandoDpto(false);
                    setDepartamentos(datos.departamentos);
                }
                else
                    setError(datos.mensaje);
            });

    }, [])

    const cambiarUsuario = () => (password.current.value !== "" && departamento.current.value !== "" && ciudad.current.value !== "") ? setActivar(false) : setActivar(true)
    const cambiarPassword = () => (usuario.current.value !== "" && departamento.current.value !== "" && ciudad.current.value !== "") ? setActivar(false) : setActivar(true)

    const CargarCiudades = () => {
        setCargandoCiud(true)
        let Departamento = departamento.current.value;
        (usuario.current.value !== "" && password.current.value !== "" && ciudad.current.value !== "") ? setActivar(false) : setActivar(true)
        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${Departamento}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    setCargandoCiud(false);
                    setCiudades(datos.ciudades);
                }
                else
                    setError(datos.mensaje);
            });

    }

    const cambioCiudad = () => (usuario.current.value !== "" && password.current.value !== "" && departamento.current.value !== "") ? setActivar(false) : setActivar(true)

    const AgregarRegistro = () => {
        let usu = usuario.current.value;
        let pass = password.current.value;
        let dpto = departamento.current.value;
        let ciud = ciudad.current.value;

        if (Validar(usu) && Validar(pass) && Validar(dpto) && Validar(ciud)) {
            let objRegistro = {
                "usuario": usu.trim(),
                "password": pass.trim(),
                "idDepartamento": dpto.trim(),
                "idCiudad": ciud.trim()
            }

            fetch("https://crypto.develotion.com/usuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objRegistro)
            })
                .then(r => r.json())
                .then(datos => {
                    switch (datos.codigo) {
                        case 200:
                            localStorage.setItem("apikey", datos.apiKey);
                            localStorage.setItem("usuario", datos.id);
                            navigate("/dashboard");
                            break;
                        case 409:
                            setError(datos.mensaje);
                            break;
                    }
                });
        } else {
            setError("No se permiten caracteres especiales")
            usuario.current.value = "";
            password.current.value = "";
        }
    }

    return (
        <form>
            <div className="form-floating">
                <input type="text" ref={usuario} onChange={cambiarUsuario} className="form-control mb-1" placeholder="." />
                <label>Usuario</label>
            </div>
            <div className="form-floating">
                <input type="password" ref={password} onChange={cambiarPassword} className="form-control mb-1" placeholder="." />
                <label>Contrase&ntilde;a</label>
            </div>
            <div>
                {/* Departamentos */}
                <select ref={departamento} onClick={CargarCiudades} className="w-100 text-center py-2 mb-1">
                    {(cargandoDpto) ? <option>Cargando departamentos...</option> : departamentos.map(dpto => <option key={dpto.id} value={dpto.id}>{dpto.nombre}</option>)}
                </select>
            </div>
            <div>
                {/* Ciudades por departamentos */}
                <select ref={ciudad} onClick={cambioCiudad} className="w-100 pl-3 text-center py-2 mb-1">
                    {(cargandoCiud) ? <option>Cargando ciudades...</option> : ciudades.map(ciudad => <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>)}
                </select>
            </div>
            <div>
                <input className="my-3 w-100 btn btn-lg btn-dark" type="button" onClick={AgregarRegistro} value="Registrarse" disabled={activar} />
                <Link to="/"><input type="button" value="Login" className="py-2 px-4 href" /></Link>
                <p>{error}</p>
            </div>
        </form>
    )
}

export default FormRegistro