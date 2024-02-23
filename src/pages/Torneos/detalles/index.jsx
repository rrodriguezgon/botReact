// Imports REACT
import React, { useEffect, useState, useCallback } from "react";
import {
    useParams,
    Link,
} from "react-router-dom";

// Imports Material UI
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Imports Components Core
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";

// Imports Services
import { getById } from "../../../services/torneos";

import useStyles from "./index.css";


export default function Detalles() {
    const [infoTorneo, setInfoTorneo] = useState();
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();

    const classes = useStyles();

    let { id } = useParams();

    function getTorneo(id) {
        setLoading(true);
        getById(id).then((result) => {
            setLoading(false);
            setInfoTorneo(result.data);
        }).catch(() => {
            setDataAlerta({
                variant: 'error',
                texto: 'Error API'
            });

            setShowAlerta(true);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getTorneo(id);
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
                                <Link to='/torneos'>
                                    <Button variant="contained">Volver</Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Comando"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.nombre}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Circuito"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.circuito}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Tipo"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.tipo}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                name="date"
                                fullWidth
                                className={classes.boxMarginTop}
                                label="Fecha Inicio"
                                format="DD/MM/YYYY"
                                value={dayjs(infoTorneo.fechaInicioDate)}
                                readOnly />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                name="date"
                                fullWidth
                                className={classes.boxMarginTop}
                                label="Fecha Fin"
                                format="DD/MM/YYYY"
                                value={dayjs(infoTorneo.fechaFinDate)}
                                readOnly />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Estado"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.estado}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Localización"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.localizacion}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <a href={infoTorneo.linkTorneo} target="_blank">
                                <TextField
                                    label="Link Torneo"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={infoTorneo.linkTorneo}
                                    margin="dense"
                                    fullWidth
                                />
                            </a>
                        </Grid>
                        {infoTorneo.cuadros.filter(cuadro => cuadro.url).length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="h3" display="block" gutterBottom>
                                    Cuadros
                                </Typography>
                            </Grid>
                        )}
                        <Grid container spacing={2}>
                            {infoTorneo.cuadros.filter(cuadro => cuadro.url).map(cuadro => {
                                return (
                                    <Grid className={classes.boxMarginBotTop} item xs={6} key={cuadro._id}>
                                        <a href={cuadro.url} target="_blank">
                                            <Button variant="contained">{cuadro.fase} - {cuadro.genero}</Button>
                                        </a>

                                    </Grid>
                                )
                            })}
                        </Grid>
                        {infoTorneo.horarios.filter(horario => horario.url).length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="h3" display="block" gutterBottom>
                                    Horarios
                                </Typography>
                            </Grid>
                        )}
                        <Grid container spacing={2}>
                            {infoTorneo.horarios.filter(horario => horario.url).map(horario => {
                                return (
                                    <Grid className={classes.boxMarginBotTop} item xs={6} key={horario._id}>
                                        <a href={horario.url} target="_blank">
                                            <Button variant="contained">{horario.dia}</Button>
                                        </a>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                )}
            </Grid>

        </Container>
    );
}
