// Imports REACT
import React, { useEffect, useState, useCallback } from "react";
import moment from 'moment';

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
import { getAll, getAllWithFilters } from '../../../services/comandos';

import useStyles from "./index.css";


export default function ComandosBot() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const classes = useStyles();

    function checkIconType(field) { return (field ? <CheckCircle className={classes.checkTrue} /> : <Cancel className={classes.checkFalse} />) }
    function buttonDetails(field) { return <ButtonDetalles enlace={`/comandosBot/${field}`} /> }

    const columns = [
        {
            name: 'Comando',
            selector: row => row.nombre,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
        },
        {
            name: 'Fecha Ejecución',
            selector: row => (row.ultimaFechaEjecucion ? moment(row.ultimaFechaEjecucion).format('DD/MM/YYYY hh:mm') : ''),
        },
        {
            name: 'Lanzado',
            selector: row => checkIconType(row.lanzado),
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetails(row._id),
        },
    ];

    function getComandos(filters) {
        setLoading(true);
        (Object.keys(filters || {}).length ? getAllWithFilters(filters) : getAll())
            .then((({ data }) => {
                setLoading(false);
                setList(data);

                if (data.length === 0) {
                    setDataAlerta({
                        variant: 'info',
                        texto: 'no hay datos'
                    });

                    setShowAlerta(true);
                }
            }))
            .catch(() => {
                setLoading(false);

                setDataAlerta({
                    variant: 'error',
                    texto: 'Error API'
                });

                setShowAlerta(true);
            });
    }

    useEffect(() => {
        getComandos();
    }, []);

    const handleSearch = useCallback((filters) => {
        getComandos(filters);
    }, []);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    return (
        <Container>
            <Grid container spacing={2} xs={12}>
                <Grid item className={classes.boxSearch} xs={12}>
                    <Filtro search={handleSearch} />
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
