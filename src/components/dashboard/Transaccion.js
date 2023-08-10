import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

const Transaccion = ({ id, cantidad, moneda, tipo_operacion, valor_actual }) => {

    const monedas = useSelector(state => state.monedas.monedas);

    const [nombreOperacion, setNombreOperacion] = useState("")
    const [nombreMondea, setNombreMoneda] = useState("")

    useEffect(() => {
        (tipo_operacion === 1) ? setNombreOperacion("compra") : setNombreOperacion("venta");
        monedas.forEach(mon => { if (mon.id === moneda) setNombreMoneda(mon.nombre) });
    }, [monedas])


    return (

        <section className="text-center col-lg-4 col-sm-6 mb-4">
            <div className="card shadow-lg mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header backgroundHeader py-3">
                    <h5 className="m-0 font-weight-bold">Transacción - {id}</h5>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body text-white bg-dark">
                    <p className="underLine mx-auto">Operación: <strong>{nombreOperacion}</strong></p>
                    {(nombreMondea === "") ? <p className="underLine mx-auto">moneda: <strong>{moneda}</strong></p> : <p className="underLine mx-auto">moneda: <strong>{nombreMondea}</strong></p>}
                    <p className="underLine mx-auto">cantidad: <strong>{cantidad}</strong></p>
                    <p className="underLine mx-auto">valor: <strong>{valor_actual}</strong></p>
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
    )
}

export default Transaccion