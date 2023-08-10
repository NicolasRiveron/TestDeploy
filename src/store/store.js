import { configureStore } from "@reduxjs/toolkit"
import monedasReducer from "../features/monedasSlice"
import transaccionesReducer from "../features/transaccionesSlice"

export const store = configureStore({
    reducer: {
        monedas: monedasReducer,
        transacciones: transaccionesReducer
    }
})