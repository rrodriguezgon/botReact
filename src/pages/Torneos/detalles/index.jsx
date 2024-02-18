import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    useParams,
    Link,
    useNavigate
} from "react-router-dom";

import { getById, } from "../../../services/torneos";

import useStyles from "./index.css";

import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";

import { Container, Grid, Button, TextField } from '@mui/material';

// https://icons.getbootstrap.com/
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

export default function Detalles() {
    const [infoTorneo, setInfoTorneo] = useState();
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();

    const classes = useStyles();
    const navigate = useNavigate();

    let { id } = useParams();

    function getTorneo(id) {
        setLoading(true);
        getById(id).then((result) => {
            setLoading(false);
            setInfoTorneo(result.data);
        }).catch(() => {
            setDataAlerta({
                variant: 'danger',
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
                    <Grid container>
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
                    </Grid>
                )}
            </Grid>

        </Container>
    );
}
