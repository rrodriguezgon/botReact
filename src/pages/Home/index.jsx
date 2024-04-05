import React, { useState, useEffect } from "react";
import moment from 'moment';

// Imports Material UI
import { Container, Grid } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

// Imports Components Core
import Listado from '../../components/Listado';
import ButtonDetalles from "../../components/ButtonDetalles";

// Imports Services
import { getAll as getAllTorneos } from '../../services/torneos';
import { getAll as getAllLogs } from '../../services/logs';
import { getAll as getAllComandos } from '../../services/comandos';

import useStyles from "./index.css";

export default function Home() {
    const classes = useStyles();
    const [listTorneos, setListTorneos] = useState([]);
    const [listLogs, setListLogs] = useState([]);
    const [listComandos, setListComandos] = useState([]);

    function checkIconType(field) { return (field ? <CheckCircle className={classes.checkTrue} /> : <Cancel className={classes.checkFalse} />) }
    function buttonDetailsTorneos(field) { return <ButtonDetalles enlace={`/torneos/${field}`} /> }
    function buttonDetailsComandos(field) { return <ButtonDetalles enlace={`/comandos/${field}`} /> }

    const columnsTorneos = [
        {
            name: 'Nombre Torneo',
            selector: row => row.nombre,
        },
        {
            name: 'cuadros',
            selector: row => checkIconType(row.cuadros.filter(cuadro => cuadro.url).length > 0),
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetailsTorneos(row._id),
        },
    ];

    const columnsLogs = [
        {
            name: 'Comandos Error',
            selector: row => row.nameCommand,
        },
        {
            name: 'Fecha',
            selector: row => moment(row.date).format('DD/MM - HH:mm'),
        },
    ];

    const columnsComandos = [
        {
            name: 'Comando',
            selector: row => row.nombre,
        },
        {
            name: 'Fecha Ultima Ejecución',
            selector: row => (row.ultimaFechaEjecucion ? moment(row.ultimaFechaEjecucion).format('DD/MM - HH:mm') : ''),
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetailsComandos(row._id),
        },
    ];

    function getTorneos() {
        getAllTorneos()
            .then((({ data }) => {

                setListTorneos(data.filter(torneo => torneo.estado === 'LIVE'));
            }))
            .catch((error) => {
                console.log(error);
            });
    }

    function getLogs() {
        getAllLogs()
            .then((({ data }) => {
                setListLogs(data.filter(logs => logs.type === 'Error').slice(0, 5));
            }))
            .catch((error) => {
                console.log(error);
            });
    }

    function getComandos() {
        getAllComandos()
            .then((({ data }) => {
                setListComandos(data.filter(logs => logs.activo).slice(0, 5));
            }))
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getTorneos();
        getLogs();
        getComandos();
    }, []);

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid container item xs={6}>
                    <Listado data={listTorneos} columns={columnsTorneos} />
                </Grid>
                <Grid container item xs={6}>
                    <Listado data={listLogs} columns={columnsLogs} />
                </Grid>
                <Grid container item xs={6}>
                    <Listado data={listComandos} columns={columnsComandos} />
                </Grid>
            </Grid>
        </Container>
    );
}
