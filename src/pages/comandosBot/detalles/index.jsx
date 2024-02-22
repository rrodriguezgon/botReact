// Imports REACT
import React, { useEffect, useState, useCallback } from "react";
import {
    useParams,
    Link
} from "react-router-dom";

// Imports Material UI
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Imports Components Core
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";

// Imports Services
import { getById } from "../../../services/comandos";

import useStyles from "./index.css";


export default function Detalles() {
    const [infoComando, setInfoComando] = useState();
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();

    const classes = useStyles();

    let { id } = useParams();

    function getComando(id) {
        setLoading(true);
        getById(id).then((result) => {
            setLoading(false);
            setInfoComando(result.data);
        }).catch(() => {
            setDataAlerta({
                variant: 'error',
                texto: 'Error API'
            });

            setShowAlerta(true);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getComando(id);
    }, [id]);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    return (
        <Container>
            <Grid item xs={12}>
                {showAlerta &&
                    <Alerta dataAlerta={dataAlerta}
                        closeAlerta={closeAlerta} />}
                {loading ? <Loading /> : (
                    <Grid container spacing={2}>
                        <Grid className={classes.boxMarginBotTop} item xs={12}>
                            <Grid item xs={4}>
                                <Link to='/comandosBot'>
                                    <Button variant="contained">Volver</Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Comando"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoComando.nombre}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>

        </Container>
    );
}
