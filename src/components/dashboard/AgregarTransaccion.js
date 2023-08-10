import { useSelector, useDispatch } from "react-redux/es/exports";
import { agregarTransaccion } from "../../features/transaccionesSlice"
import { useRef } from "react";

const AgregarTransaccion = () => {

    const monedas = useSelector(state => state.monedas.monedas);

    const dispatch = useDispatch();

    const tipoOp = useRef(null);
    const mon = useRef(null);
    const cant = useRef(null);

    const obtenerValor = id => {
        let ret = monedas.find(m => m.id === id)
        return ret.cotizacion
    }

    const postTransaccion = () => {

        let usuario = Number(localStorage.getItem("usuario"))
        let tipoOperacion = Number(tipoOp.current.value)
        let moneda = Number(mon.current.value);
        let cantidad = Number(cant.current.value)

        let objTransaccion = {
            "idUsuario": usuario,
            "tipoOperacion": tipoOperacion,
            "moneda": moneda,
            "cantidad": cantidad,
            "valorActual": obtenerValor(moneda)
        }

        cant.current.value = "";

        fetch(`https://crypto.develotion.com/transacciones.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apikey")
            },
            body: JSON.stringify(objTransaccion)
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    let objGuardado = {
                        "id": datos.idTransaccion,
                        "usuarios_id": objTransaccion.idUsuario,
                        "tipo_operacion": objTransaccion.tipoOperacion,
                        "moneda": objTransaccion.moneda,
                        "cantidad": objTransaccion.cantidad,
                        "valor_actual": objTransaccion.valorActual
                    }
                    dispatch(agregarTransaccion(objGuardado))
                } else
                    console.log("Transacciones:" + datos.mensaje)
            });
    }
    return (
        // <!-- CARD CONTENT -->
        <section id="agregarTransaccion" className="col-12 col-lg-6 pe-lg-3 agregarTransaccion text-center mb-4">
            <div className="card shadow-lg mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">Agregar transacción</h6>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body">
                    <form className="">
                        <div className="form-group py-3 px-4 shadow-lg bg-dark text-white">
                            <label className="w-100 p-1">Seleccione operación a realizar: </label>
                            <select ref={tipoOp} className="w-100 text-center bg-dark text-white">
                                <option value="1">Compra</option>
                                <option value="2">Venta</option>
                            </select>
                        </div>

                        <div className="form-group py-3 px-4 shadow-lg bg-dark text-white">
                            <label className="w-100 p-1">Tipo de moneda: </label>
                            <select ref={mon} className="w-100 text-center bg-dark text-white">
                                {(monedas.length === 0) ? <option>Cargando monedas...</option> : monedas.map(moneda => <option key={moneda.id} value={moneda.id}>{moneda.nombre}</option>)}
                            </select>
                        </div>

                        <div className="form-group py-3 px-4 shadow-lg bg-dark text-white">
                            <label className="w-100 p-1">Seleccione cantidad de monedas:</label>
                            <input type="number" ref={cant} className="w-100 text-center bg-dark text-white" />
                        </div>

                        <div className="nuevaTrn form-group p-2 shadow-lg bg-dark text-white">
                            <input type="button" onClick={postTransaccion} className="shadow-lg w-100 btn bg-dark text-white" value="Agregar Transacción" />
                        </div>
                    </form>
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
        // <!-- END CARD CONTENT -->
    )
}

export default AgregarTransaccion