import { useSelector } from "react-redux";
import Transaccion from "./Transaccion";

const ListadoTransacciones = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones)

    return (
        // <!-- CARD CONTENT -->
        <section className="text-center col-12 mb-4">
            <div className="card shadow-lg mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">Listado de transacciones</h6>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body">
                    <div className="row justify-content-center align-itmes-center">
                        {(transacciones.length === 0) ? <h3>Cargando transacciones...</h3> : transacciones.map(trn => <Transaccion key={trn.id} {...trn} />)}
                    </div>
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
        // <!-- END CARD CONTENT -->
    )
}

export default ListadoTransacciones