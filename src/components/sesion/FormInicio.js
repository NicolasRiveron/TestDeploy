import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Validar from "../Validar"

const FormInicio = () => {

    const usuario = useRef(null)
    const password = useRef(null)

    let navigate = useNavigate();

    const [activar, setActivar] = useState(true)
    const [error, setError] = useState("")

    const cambiarUsuario = () => (password.current.value !== "") ? setActivar(false) : setActivar(true)
    const cambiarPassword = () => (usuario.current.value !== "") ? setActivar(false) : setActivar(true)

    const Login = () => {
        let usu = usuario.current.value;
        let pass = password.current.value;

        if (Validar(usu) && Validar(pass)) {
            let objLogin = {
                "usuario": usu.trim(),
                "password": pass.trim()
            }

            fetch("https://crypto.develotion.com/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objLogin)
            })
                .then(r => r.json())
                .then(datos => {
                    switch (datos.codigo) {
                        case 200:
                            localStorage.setItem("apikey", datos.apiKey);
                            localStorage.setItem("usuario", datos.id)
                            navigate("/dashboard");
                            break;
                        case 409:
                            setError(datos.mensaje);
                            break;
                    }
                });
        } else {
            setError("No se permiten caracteres especiales")
            usuario.current.value = ""
            password.current.value = ""
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
                <input className="my-3 w-100 btn btn-lg btn-dark" type="button" onClick={Login} value="Login" disabled={activar} />
                <Link to="/registro"><input type="button" value="Registrarse" className="py-2 px-4 href" /></Link>
                <p id="errorInicio">{error}</p>
            </div>
        </form>
    )
}

export default FormInicio