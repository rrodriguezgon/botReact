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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment-timezone';

// Imports Components Core
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ModalComponent from "../../../components/Modal";

// Imports Services
import { getById, updateById, deleteById } from "../../../services/torneos";

import useStyles from "./index.css";


export default function Detalles() {
    const [infoTorneo, setInfoTorneo] = useState();
    const [listZonasHorarias, setListZonasHorarias] = useState();
    const [horaZona, setHoraZona] = useState(moment());
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();
    const [modoEditar, setModoEditar] = useState(false);

    const classes = useStyles();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setListZonasHorarias(moment.tz.names());
        setLoading(true);
        getById(id).then(({ data }) => {
            setInfoTorneo(data);
            if (data.timeZone) {
                setHoraZona(moment().tz(data.timeZone));
            }
        }).catch((error) => {
            if (error?.response && error.response.status === 403) {
                navigate("/login");
            }

            setDataAlerta({
                variant: 'error',
                texto: `Error API: ${error.message}`
            });

            setShowAlerta(true);
        }).finally(() => setLoading(false));
    }, [id, navigate]);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const handleChangeMod = useCallback(() => {
        setModoEditar(!modoEditar);
    }, [modoEditar]);

    const handleGuardar = useCallback(() => {
        updateById(id, infoTorneo)
            .then(() => navigate("/torneos"))
            .catch((error) => {
                if (error?.response && error.response.status === 403) {
                    navigate("/login");
                }

                setDataAlerta({
                    variant: 'error',
                    texto: `Error API: ${error.message}`
                });

                setShowAlerta(true);
            });
    }, [id, infoTorneo, navigate]);

    const handleDelete = useCallback(() => {
        deleteById(id)
            .then(() => navigate("/torneos"))
            .catch((error) => {
                if (error?.response && error.response.status === 403) {
                    navigate("/login");
                }

                setDataAlerta({
                    variant: 'error',
                    texto: `Error API: ${error.message}`
                });

                setShowAlerta(true);
            }).finally(() => setShowModal(false));
    }, [id, navigate]);

    const handleChange = useCallback((event) => {
        const target = event.target;
        const { value, name, className, checked } = target;

        setInfoTorneo((prevState) => ({
            ...prevState,
            [name]: (className?.includes('PrivateSwitchBase') ? checked : value)
        }));

        if (name === 'timeZone') {
            setHoraZona(moment.tz(value));
        }
    }, [infoTorneo, setHoraZona]);

    const handleOpenModal = useCallback((row) => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleChangeDate = useCallback((date, name) => {
        setInfoTorneo((prevState) => ({
            ...prevState,
            [name]: moment(date).toDate()
        }));
    }, []);

    return (
        <Container>
            {showAlerta &&
                <Alerta dataAlerta={dataAlerta}
                    closeAlerta={closeAlerta} />}
            {loading && <Loading />}
            {infoTorneo &&
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
                        <Grid item xs={4}>
                            <Button variant="contained" color="error" onClick={handleOpenModal}>Eliminar</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
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
                    <Grid item xs={3}>
                        <DatePicker
                            name="date"
                            fullWidth
                            className={classes.boxMarginTop}
                            label="Fecha Inicio"
                            format="DD/MM/YYYY"
                            value={moment(infoTorneo.fechaInicioDate)}
                            readOnly />
                    </Grid>
                    <Grid item xs={3}>
                        <DatePicker
                            name="date"
                            fullWidth
                            className={classes.boxMarginTop}
                            label="Fecha Fin"
                            format="DD/MM/YYYY"
                            value={moment(infoTorneo.fechaFinDate)}
                            readOnly />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label-timeZone">Zona Horaria</InputLabel>
                            <Select
                                name="timeZone"
                                labelId='select-label-timeZone'
                                className={classes.boxMarginTop}
                                label="Zona Horaria"
                                onChange={handleChange}
                                margin='dense'
                                value={infoTorneo.timeZone}
                                disabled={!modoEditar}
                                fullWidth
                            >
                                {listZonasHorarias.map(zona => <MenuItem key={zona} value={zona}>{zona}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TimePicker
                            fullWidth
                            className={classes.boxMarginTop}
                            label="Hora Lanzamiento"
                            margin="dense"
                            readOnly
                            value={horaZona}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Estado"
                            InputProps={{
                                readOnly: !modoEditar,
                            }}
                            onChange={handleChange}
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
                    <Grid item xs={12}>
                        <a href={infoTorneo.linkResultados} rel="noreferrer" target="_blank">
                            <TextField
                                label="Link Resultados"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={infoTorneo.linkResultados}
                                margin="dense"
                                fullWidth
                            />
                        </a>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel
                                className={classes.boxMarginTop}
                                control={<Checkbox name="desactivarMarcador" checked={infoTorneo?.desactivarMarcador} disabled={!modoEditar} onChange={handleChange} />}
                                label="Desactivar Marcador" />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                                <TimePicker
                                    fullWidth
                                    className={classes.boxMarginTop}
                                    label="Hora Inicio"
                                    value={moment(infoTorneo?.horaInicio)}
                                    margin="dense"
                                    readOnly={!modoEditar}
                                    onChange={(date) => handleChangeDate(date, 'horaInicio')}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TimePicker
                                    fullWidth
                                    className={classes.boxMarginTop}
                                    label="Hora Fin"
                                    value={moment(infoTorneo?.horaFin)}
                                    margin="dense"
                                    readOnly={!modoEditar}
                                    onChange={(date) => handleChangeDate(date, 'horaFin')}
                                />
                            </Grid>
                    {infoTorneo?.cuadros.filter(cuadro => cuadro.url).length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h3" display="block" gutterBottom>
                                Cuadros
                            </Typography>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        {infoTorneo?.cuadros.filter(cuadro => cuadro.url).map(cuadro => {
                            return (
                                <Grid className={classes.boxMarginBotTop} item xs={6} key={cuadro._id}>
                                    <a href={cuadro.url} rel="noreferrer" target="_blank">
                                        <Button variant="contained">{cuadro.fase} - {cuadro.genero}</Button>
                                    </a>

                                </Grid>
                            )
                        })}
                    </Grid>
                    {infoTorneo?.horarios.filter(horario => horario.url).length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h3" display="block" gutterBottom>
                                Horarios
                            </Typography>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        {infoTorneo?.horarios.filter(horario => horario.url).map(horario => {
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
            }
            <ModalComponent
                showModal={showModal}
                titleHeader="Estas seguro?"
                textContent={<Details nombreTorneo={infoTorneo?.nombre} />}
                closeModal={handleCloseModal}
                buttonAcceptFN={handleDelete} />
        </Container>
    );
}


const Details = ({ nombreTorneo }) => {
    return <Container>
        <Typography>Estas seguro de eliminar el torneo: <strong>{nombreTorneo}</strong></Typography>
    </Container>;
};