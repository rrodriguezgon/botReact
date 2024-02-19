import React, { useEffect, useState, useCallback, useMemo } from "react";

import Filtro from '../filtros';

import Listado from '../../../components/Listado';
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ButtonDetalles from "../../../components/ButtonDetalles";

import moment from 'moment';
import { Container, Grid } from '@mui/material';

import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

import useStyles from "./index.css";

import { getAll, getAllWithFilters } from '../../../services/torneos';

export default function Torneos() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const classes = useStyles();

    function checkIconType(field) { return (field ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />) }
    function buttonDetails(field) { return <ButtonDetalles enlace={`/torneos/${field}`} /> }

    const columns = [
        {
            name: 'Torneo',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Fecha Inicio',
            selector: row => (row.fechaInicio ? moment(row.fechaInicio).format('MM/DD/YYYY') : ''),
            sortable: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => (row.fechaFin ? moment(row.fechaFin).format('MM/DD/YYYY') : ''),
            sortable: true,
        },
        {
            name: 'estado',
            selector: row => row.estado,
            sortable: true,
        },
        {
        name: 'cuadros',
        selector: row => checkIconType(row.cuadros.length),
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
                    variant: 'danger',
                    texto: 'Error API'
                });

                setShowAlerta(true);
            });
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

    const estadoOptions = useMemo(()=> (list.length ? [...(new Set(list.map(torneo => torneo.estado)))] : []),[list]);

    return (
        <Container>
            <Grid container spacing={2} xs={12}>
                <Grid item className={classes.boxSearch} xs={12}>
                    <Filtro search={handleSearch} estadoOptions={estadoOptions} />
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
