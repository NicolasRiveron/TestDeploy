import { useSelector } from "react-redux";
import { useEffect, useState } from "react"

const MontoInversiones = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones)

    const [total, setTotal] = useState(0)

    useEffect(() => {

        let monto = 0;

        transacciones.forEach(trn => {
            if (trn.tipo_operacion === 1) {
                monto += trn.valor_actual * trn.cantidad
            } else {
                monto -= trn.valor_actual * trn.cantidad;
            }
        });

        setTotal(monto);


    }, [transacciones])


    return (
        // <!-- CARD CONTENT -->
        <section id="montoInversiones" className="col-12 col-lg-6 ps-lg-2 text-center mb-4">
            <div className="card shadow-lg mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">Monto final de inversiones</h6>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body py-5">
                    {(isNaN(total)) ? <p>calculando total...</p> : <h1 className="py-3">${total}</h1>}
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
        // <!-- END CARD CONTENT -->
    )
}

export default MontoInversiones