// Imports REACT
import React, { useEffect, useState, useCallback } from "react";
import {
    useParams,
    Link,
    useNavigate,
} from "react-router-dom";

// Imports Material UI
import { 
    Container, 
    Grid, 
    Button, 
    TextField, 
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Imports Components Core
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";

// Imports Services
import { getById, updateById } from "../../../services/torneos";

import useStyles from "./index.css";


export default function Detalles() {
    const [infoTorneo, setInfoTorneo] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();    
    const [modoEditar, setModoEditar] = useState(false);

    const classes = useStyles();

    const { id } = useParams();
    const navigate = useNavigate();

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

    const handleChangeMod = useCallback(() => {
        setModoEditar(!modoEditar);
    }, [modoEditar]);

    const handleGuardar = useCallback(() => {
        console.log(infoTorneo);
        updateById(id, infoTorneo)
            .then(() => navigate("/torneos"))
            .catch(ex => console.log(ex));
    }, [id, infoTorneo]);

    const handleChange = useCallback((event) => {
        const target = event.target;
        const { value, name, className, checked } = target;

        setInfoTorneo((prevState) => ({
            ...prevState,
            [name]: (className?.includes('PrivateSwitchBase') ? checked : value)
        }));
    }, []);

    return (
        <Container>
            <Grid item xs={12}>
                {showAlerta &&
                    <Alerta dataAlerta={dataAlerta}
                        closeAlerta={closeAlerta} />}
                {loading ? <Loading /> : (
                    <Grid className={classes.boxMarginBotTop} container spacing={2}>
                        <Grid container xs={12}>
                            <Grid item xs={4}>
                                <Link to='/torneos'>
                                    <Button variant="contained">Volver</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                {!modoEditar ? (
                                    <Button variant="contained" onClick={handleChangeMod}>Editar</Button>
                                ) : (
                                    <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
                                )}
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
                            <a href={infoTorneo.linkTorneo} rel="noreferrer" target="_blank">
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
                        <Grid item xs={12}>
                            <a href={infoTorneo.linkMarcador} rel="noreferrer" target="_blank">
                                <TextField
                                    label="Link Marcador"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={infoTorneo.linkMarcador}
                                    margin="dense"
                                    fullWidth
                                />
                            </a>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="desactivarMarcador" checked={infoTorneo?.desactivarMarcador} disabled={!modoEditar} onChange={handleChange} />} label="Desactivar Marcador" />
                            </FormGroup>
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
                                        <a href={cuadro.url} rel="noreferrer" target="_blank">
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
                                        <a href={horario.url} rel="noreferrer" target="_blank">
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
