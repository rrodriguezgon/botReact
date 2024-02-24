import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from './Home';
import Logs from './Logs/listado';
import Torneos from './Torneos/listado';
import TorneosDetalles from './Torneos/detalles';
import ComandosBot from './ComandosBot/listado';
import ComandosBotDetalles from './ComandosBot/detalles';
import Usuarios from './Usuarios';
import UsuariosDetalles from './Usuarios/Detalles';

export default function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/torneos" element={<Torneos />} />
                <Route path="/torneos/:id" element={<TorneosDetalles />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuarios/:id" element={<UsuariosDetalles />} />
                <Route path="/comandosBot" element={<ComandosBot />} />
                <Route path="/comandosBot/:id" element={<ComandosBotDetalles />} />
                <Route path="/comandosBot/nuevo" element={<ComandosBotDetalles />} />
            </Routes>
        </BrowserRouter>
    )
}