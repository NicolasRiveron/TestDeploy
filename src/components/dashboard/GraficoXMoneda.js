import { useSelector } from "react-redux/es/exports";
import { useRef, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const GraficoXMoneda = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones)
    const monedas = useSelector(state => state.monedas.monedas);
    const moneda = useRef(null);
    const [grafica, setGrafica] = useState([])

    const cargarDatos = () => {
        let mon = Number(moneda.current.value)
        let cotizaciones = transacciones.filter(trn => trn.moneda === mon)
        setGrafica(cotizaciones);
    }

    return (
        // CARD CONTENT
        <section className="text-center col-lg-6 mb-4">
            <div className="card shadow mb-4">
                {/* HEADER CARD */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">Gráfico dada una moneda</h6>
                </div>
                {/* END HEADER CARD */}

                {/* BODY CARD */}
                <div className="card-body">
                    <div className="form-group py-3 px-4 shadow-lg bg-dark text-white">
                        <label className="w-100 p-1">Seleccione una moneda: </label>
                        <select ref={moneda} className="w-100 text-center bg-dark text-white">
                            {(monedas.length === 0) ? <option>Cargando monedas...</option> : monedas.map(moneda => <option key={moneda.id} value={moneda.id}>{moneda.nombre}</option>)}
                        </select>
                    </div>
                    <div className="nuevaTrn form-group p-2 shadow-lg bg-dark text-white mb-5">
                        <input type="button" onClick={cargarDatos} className="shadow-lg w-100 btn bg-dark text-white" value="Mostrar Grafica" />
                    </div>
                    <div>
                        {(grafica.length === 0) ? <p>Seleccione una moneda para ver la grafica</p> : <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: false,
                                    }
                                }
                            }}
                            data={{
                                labels: grafica.map(trn => trn.id),
                                datasets: [
                                    {
                                        fill: true,
                                        label: 'Valor por transaccion',
                                        data: grafica.map(trn => trn.valor_actual),
                                        borderColor: 'rgb(56, 9, 113)',
                                        backgroundColor: 'rgba(111, 18, 225, 0.6)'
                                    }
                                ]
                            }} />
                        }
                    </div>
                </div>
                {/* END BODY CARD */}
            </div>
        </section>
        // END CARD CONTENT
    )
}

export default GraficoXMoneda