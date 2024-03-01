// Imports REACT
import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from './Home';
import Login from './Login';
import Logs from './Logs/listado';
import Torneos from './Torneos/listado';
import TorneosDetalles from './Torneos/detalles';
import Comandos from './Comandos/listado';
import ComandosDetalles from './Comandos/detalles';
import Usuarios from './Usuarios';
import UsuariosDetalles from './Usuarios/Detalles';

export default function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/logs" element={<Logs />} />
                    <Route path="/torneos" element={<Torneos />} />
                    <Route path="/torneos/:id" element={<TorneosDetalles />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/:id" element={<UsuariosDetalles />} />
                    <Route path="/comandos" element={<Comandos />} />
                    <Route path="/comandos/:id" element={<ComandosDetalles />} />
                    <Route path="/comandos/nuevo" element={<ComandosDetalles />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}