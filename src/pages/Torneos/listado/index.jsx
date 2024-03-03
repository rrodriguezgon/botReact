// Imports REACT
import React, { useEffect, useState, useCallback, useMemo } from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

// Imports Material UI
import { Container, Grid } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

// Imports Components Core
import Listado from '../../../components/Listado';
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ButtonDetalles from "../../../components/ButtonDetalles";

// Imports Components Page
import Filtro from '../filtros';

// Imports Services
import { getAll, getAllWithFilters } from '../../../services/torneos';

import useStyles from "./index.css";


export default function Torneos() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();

    function checkIconType(field) { return (field ? <CheckCircle className={classes.checkTrue} /> : <Cancel className={classes.checkFalse} />) }
    function buttonDetails(field) { return <ButtonDetalles enlace={`/torneos/${field}`} /> }

    const columns = [
        {
            name: 'Torneo',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Fecha Inicio',
            selector: row => (row.fechaInicioDate ? moment(row.fechaInicioDate).format('DD/MM/YYYY') : ''),
            sortable: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => (row.fechaFinDate ? moment(row.fechaFinDate).format('DD/MM/YYYY') : ''),
            sortable: true,
        },
        {
            name: 'estado',
            selector: row => row.estado,
            sortable: true,
        },
        {
            name: 'cuadros',
            selector: row => checkIconType(row.cuadros.filter(cuadro => cuadro.url).length > 0),
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetails(row._id),
        },
    ];

    function getTorneos(filters) {
        setLoading(true);
        (Object.keys(filters || {}).length ? getAllWithFilters(filters) : getAll())
            .then((({ data }) => {
                setList(data);

                if (data.length === 0) {
                    setDataAlerta({
                        variant: 'info',
                        texto: 'no hay datos'
                    });

                    setShowAlerta(true);
                }
            }))
            .catch((error) => {
                if (error?.response && error.response.status === 403){
                    navigate("/login");
                }

                setDataAlerta({
                    variant: 'error',
                    texto: `Error API: ${error.message}`
                });

                setShowAlerta(true);
            }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getTorneos();
    }, []);

    const handleSearch = useCallback((filters) => {
        getTorneos(filters);
    }, []);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const estadoOptions = useMemo(() => (list.length ? [...(new Set(list.filter(torneo => torneo.estado).map(torneo => torneo.estado)))] : []), [list]);
    const typesOptions = useMemo(() => (list.length ? [...(new Set(list.filter(torneo => torneo.tipo).map(torneo => torneo.tipo)))] : []), [list]);

    return (
        <Container>
            <Grid container spacing={2} xs={12}>
                <Grid item className={classes.boxSearch} xs={12}>
                    <Filtro search={handleSearch} estadoOptions={estadoOptions} typesOptions={typesOptions} />
                </Grid>
                <Grid item xs={12}>
                    {showAlerta &&
                        <Alerta dataAlerta={dataAlerta}
                            closeAlerta={closeAlerta} />}
                    {loading ? <Loading /> : <Listado data={list} columns={columns} />}
                </Grid>
            </Grid>
        </Container>
    );
}
