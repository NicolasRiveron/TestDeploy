import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const IAOperaciones = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones)
    const monedas = useSelector(state => state.monedas.monedas);

    const [IA, setIA] = useState([])

    useEffect(() => {

        let sugerencias = [];

        setTimeout(() => {

            monedas.forEach(mon => {

                let ultTrnObj = null;
                let ultTrnI = 0;

                transacciones.forEach((trn, i) => {
                    if (trn.moneda === mon.id && i > ultTrnI) {
                        ultTrnObj = trn
                        ultTrnI = i
                    }
                })

                let obj = null;

                if (ultTrnObj !== null) {
                    if (ultTrnObj.tipo_operacion === 1 && mon.cotizacion > ultTrnObj.valor_actual) {
                        //Si el tipoOperacion de la ultima transaccion fue compra
                        //Y la cotizacion de la moneda es mayor que el valor de cuando se hizo la transaccion/compra
                        //Se sugiere vender

                        // <p>Vender {ultTrnObj.cantidad} de la moneda {mon.nombre}</p>
                        obj = {
                            id: mon.id,
                            cantidad: ultTrnObj.cantidad,
                            nombre: mon.nombre,
                            sugerencia: "vender"
                        }

                        sugerencias.push(obj);
                    } else if (ultTrnObj.tipo_operacion === 2 && mon.cotizacion < ultTrnObj.valor_actual) {
                        //Si el tipoOperacion de la ultima transaccion fue venta
                        //Y la cotizacion de la moneda es menor que el valor de cuando se hizo la transaccion/venta
                        //Se sugiere comprar

                        // <p>comprar {ultTrnObj.cantidad} de la moneda {mon.nombre}</p>

                        obj = {
                            id: mon.id,
                            cantidad: ultTrnObj.cantidad,
                            nombre: mon.nombre,
                            sugerencia: "comprar"
                        }

                        sugerencias.push(obj);
                    }
                }
            })
            setIA(sugerencias);
        }, 3000);
    }, [monedas, transacciones])


    return (
        // < !--CARD CONTENT-- >
        <section id="iaOperaciones" className="col-12 col-lg-6 ps-lg-2 text-center mb-4">
            <div className="card shadow-lg mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">IA para sugerir operaciones</h6>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body">
                    {(IA.length === 0) ? <p>Cargando sugerencias...</p> : IA.map(t => (t.sugerencia === "vender") ? <h5 className="vender mx-auto w-75" key={t.id}>Vender {t.cantidad} unidades de la moneda {t.nombre}</h5> : <h5 className="comprar mx-auto w-75" key={t.id}>Comprar {t.cantidad} unidades de la moneda {t.nombre}</h5>)}
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
        // <!--END CARD CONTENT-- >
    )
}

export default IAOperaciones