import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoVentas = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones)
    const monedas = useSelector(state => state.monedas.monedas);

    const [grafica, setGrafica] = useState([])

    useEffect(() => {

        let gastosTotales = [];
        let obj = null;

        monedas.forEach(mon => {

            let total = 0;

            transacciones.forEach((trn) => {
                if (trn.moneda === mon.id && trn.tipo_operacion === 2) {
                    total += trn.valor_actual * trn.cantidad
                }
            })

            obj = {
                id: mon.id,
                nombre: mon.nombre,
                total: total
            }


            gastosTotales.push(obj);
        })

        setGrafica(gastosTotales)
    }, [transacciones])

    return (
        // < !--CARD CONTENT-- >
        <section className="text-center col-lg-6 mb-4">
            <div className="card shadow mb-4">
                {/* <!-- HEADER CARD --> */}
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-capitalize">Gráfico de montos vendidos por moneda</h6>
                </div>
                {/* <!-- END HEADER CARD --> */}

                {/* <!-- BODY CARD --> */}
                <div className="card-body">
                    {(grafica.length === 0) ? <p>Cargando grafica...</p> : <Bar
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
                            labels: grafica.map(mon => mon.nombre),
                            datasets: [
                                {
                                    label: 'monto adquirido en ventas',
                                    data: grafica.map(mon => mon.total),
                                    backgroundColor: 'rgba(18, 225, 142, 0.8)'
                                }
                            ]
                        }} />

                    }
                </div>
                {/* <!-- END BODY CARD --> */}
            </div>
        </section>
        // <!--END CARD CONTENT-- >
    )
}

export default GraficoVentas