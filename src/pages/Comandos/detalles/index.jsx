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
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Imports Components Core
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";

// Imports Services
import { getById, create, updateById } from "../../../services/comandos";

import useStyles from "./index.css";


export default function Detalles() {
    const [infoComando, setInfoComando] = useState();
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();
    const [modoEditar, setModoEditar] = useState(false);

    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();

    function getComando(id) {
        setLoading(true);
        getById(id)
        .then((result) => {
            setInfoComando(result.data);
        }).catch((error) => {
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

    const handleChangeMod = useCallback(() => {
        setModoEditar(!modoEditar);
    }, [modoEditar]);

    const handleGuardar = useCallback(() => {
        infoComando.lanzado = false;
        (id ? updateById(id, infoComando) : create(infoComando))
            .then(() => navigate("/comandos"))
            .catch((error) => {
                if (error?.response && error.response.status === 403){
                    navigate("/login");
                }

                setDataAlerta({
                    variant: 'error',
                    texto: `Error API: ${error.message}`
                });

                setShowAlerta(true);
            });
    }, [id, infoComando]);

    const handleChange = useCallback((event) => {
        const target = event.target;
        const { value, name, className, checked } = target;

        setInfoComando((prevState) => ({
            ...prevState,
            [name]: (className?.includes('PrivateSwitchBase') ? checked : value)
        }));
    }, []);

    const handleChangeDate = useCallback((date, name) => {
        setInfoComando((prevState) => ({
            ...prevState,
            [name]: dayjs(date).toDate()
        }));
    }, []);

    useEffect(() => {
        if (id) {
            getComando(id);
        } else {
            setModoEditar(true);
            setLoading(false);
        }
    }, [id]);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const tipoOptions = ['lanzador', 'observador'];
    const intervaloOptions = [
        { value: 60000, display: '1 Minuto' },
        { value: 1800000, display: '30 Minutos' }
    ];

    return (
        <Container>
            <Grid item xs={12}>
                {showAlerta &&
                    <Alerta dataAlerta={dataAlerta}
                        closeAlerta={closeAlerta} />}
                {loading ? <Loading /> : (
                    <Grid container className={classes.boxMarginTop}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Link to='/comandos'>
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
                        <Grid container className={classes.boxMarginTop} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Comando"
                                    name="nombre"
                                    InputProps={{
                                        readOnly: !modoEditar,
                                    }}
                                    value={infoComando?.nombre}
                                    margin="dense"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {!modoEditar ? (
                                    <TextField
                                        label="Tipo"
                                        InputProps={{
                                            readOnly: !modoEditar,
                                        }}
                                        value={infoComando?.tipo}
                                        margin="dense"
                                        fullWidth
                                    />) : (
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label-tipo">Tipo</InputLabel>
                                        <Select
                                            name="tipo"
                                            labelId='select-label-tipo'
                                            className={classes.boxMarginTop}
                                            value={infoComando?.tipo}
                                            label="Tipo"
                                            onChange={handleChange}
                                            margin='dense'
                                            fullWidth
                                        >
                                            {tipoOptions.map(tipo => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    fullWidth
                                    className={classes.boxMarginTop}
                                    label="Ultima Fecha Ejecución"
                                    format="DD/MM/YYYY HH:mm"
                                    value={dayjs(infoComando?.ultimaFechaEjecucion)}
                                    readOnly />
                            </Grid>
                            {infoComando?.tipo === 'observador' && (
                                <>
                                    <Grid item xs={6}>
                                        <TimePicker
                                            fullWidth
                                            className={classes.boxMarginTop}
                                            label="Hora Lanzamiento"
                                            value={dayjs(infoComando?.horaEjecucion)}
                                            margin="dense"
                                            readOnly={!modoEditar}
                                            onChange={(date) => handleChangeDate(date, 'horaEjecucion')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="select-label-intervalo">Intervalo</InputLabel>
                                            <Select
                                                name="intervalo"
                                                labelId='select-label-intervalo'
                                                className={classes.boxMarginTop}
                                                value={infoComando?.intervalo}
                                                label="Intervalo"
                                                onChange={handleChange}
                                                margin='dense'
                                                fullWidth
                                                readOnly={!modoEditar}
                                            >
                                                {intervaloOptions.map(intervalo => <MenuItem key={intervalo.value} value={intervalo.value}>{intervalo.display}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormGroup>
                                            <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="activo" checked={infoComando?.activo} disabled={!modoEditar} onChange={handleChange} />} label="Activo" />
                                        </FormGroup>
                                    </Grid>
                                </>
                            )}
                            {infoComando?.tipo === 'lanzador' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="parametros"
                                            label="Parametros"
                                            InputProps={{
                                                readOnly: !modoEditar,
                                            }}
                                            value={infoComando?.parametros}
                                            margin="dense"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormGroup>
                                            <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="lanzado" checked={infoComando?.lanzado} disabled />} label="Lanzado" />
                                        </FormGroup>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Grid>

        </Container>
    );
}
