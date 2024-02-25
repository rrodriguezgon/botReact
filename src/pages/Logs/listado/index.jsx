// Imports REACT
import React, { useEffect, useState, useCallback, useMemo } from "react";
import moment from 'moment';

// Imports Material UI
import { Container, Grid, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

// Imports Components Core
import Listado from '../../../components/Listado';
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ModalComponent from "../../../components/Modal";

// Imports Components Page
import Filtro from '../filtros';

// Imports Services
import { getAll, getAllWithFilters } from '../../../services/logs';

import useStyles from "./index.css";


export default function Logs(){
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const [detail, setDetail] = useState({});
    const classes = useStyles();

    function buttonDetails(row) { return <Button size="small" variant="contained" onClick={() => handleOpenModal(row)}>Detalles</Button> }
    const columns = [
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Comando',
            selector: row => row.nameCommand,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => moment(row.date).format('DD/MM/YYYY HH:mm'),
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetails(row),
        },
    ];

    const comandosOptions = useMemo(()=> (list.length ? [...(new Set(list.map(log => log.nameCommand)))] : []),[list]);
    const typesOptions = useMemo(()=> (list.length ? [...(new Set(list.map(log => log.type)))] : []),[list]);

    function getLogs(filters) {
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
        getLogs();
    }, []);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const handleSearch = useCallback((filters) => {
        getLogs(filters);
    }, []);

    const handleOpenModal = useCallback((row) => {
        setShowModal(true);
        setDetail(row);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <Container>
            <Grid container spacing={2} xs={12}>
                <Grid item className={classes.boxSearch} xs={12}>
                    <Filtro search={handleSearch} comandosOptions={comandosOptions} typesOptions={typesOptions} />
                </Grid>
                <Grid item xs={12}>
                    {showAlerta &&
                        <Alerta dataAlerta={dataAlerta}
                            closeAlerta={closeAlerta} />}
                    {loading ? <Loading /> : <Listado data={list} columns={columns} />}
                </Grid>
                <Grid item>
                    <ModalComponent
                        showModal={showModal}
                        titleHeader="Detalles Log"
                        textContent={<Details row={detail} classes={classes} />}
                        closeModal={handleCloseModal} />
                </Grid>
            </Grid>
        </Container>
    );
}

const Details = ({ row, classes }) => {
    return <Container>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label="Comando"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={row.nameCommand}
                    margin="dense"
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Tipo"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={row.type}
                    margin="dense"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <DateTimePicker fullWidth className={classes.boxMarginTop} label="Fecha" format="DD-MM-YYYY hh:mm" value={dayjs(row.date)} margin="dense" readOnly />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Stacktrace"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={row.stacktrace}
                    multiline
                    margin="dense"
                    fullWidth
                />
            </Grid>
        </Grid>
    </Container>;
};
